"use client";

import { useState, useRef, useEffect } from "react";

export function CollectForm({
  spaceId,
  thankYouMsg,
}: {
  spaceId: string;
  thankYouMsg: string;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [mode, setMode] = useState<"text" | "video" | null>(null);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Video states
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [timer, setTimer] = useState(0);
  const [showCameraError, setShowCameraError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stream]);

  async function startCamera() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      setMode("video");
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = mediaStream;
      }, 100);
    } catch {
      setShowCameraError(true);
    }
  }

  function startRecording() {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setVideoBlob(blob);
      stream.getTracks().forEach((t) => t.stop());
    };
    recorder.start();
    mediaRecorderRef.current = recorder;
    setRecording(true);
    setTimer(0);
    timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function confirmContent() {
    if (mode === "video") {
      setContent("[VIDEO] Témoignage vidéo enregistré");
    }
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/testimonials/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        space_id: spaceId,
        author_name: name.trim(),
        author_email: email.trim(),
        author_title: title.trim() || null,
        content: content.trim(),
        rating: 5,
        website,
        consent,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      setLoading(false);
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8 animate-scale-in">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-900">Vérifie ta boîte mail !</p>
        <p className="text-sm text-gray-500 mt-2">
          Un email de confirmation a été envoyé à <strong>{email}</strong>.<br />
          Clique sur le lien pour valider ton témoignage.
        </p>
        <p className="text-xs text-gray-400 mt-3">
          Tu ne le vois pas ? Vérifie ton dossier spam ou indésirables.
        </p>
      </div>
    );
  }

  // ÉTAPE 1 — Choix du mode + contenu
  if (step === 1) {
    return (
      <div className="space-y-5">
        {!mode && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 text-center mb-4">Comment veux-tu partager ton expérience ?</p>
            <button
              onClick={startCamera}
              className="w-full py-5 rounded-xl border-2 border-gray-200 hover:border-accent/40 hover:bg-accent/5 font-semibold text-base transition-all flex items-center justify-center gap-3"
            >
              <span className="text-2xl">🎥</span> Enregistrer une vidéo
            </button>
            <button
              onClick={() => setMode("text")}
              className="w-full py-5 rounded-xl border-2 border-gray-200 hover:border-accent/40 hover:bg-accent/5 font-semibold text-base transition-all flex items-center justify-center gap-3"
            >
              <span className="text-2xl">✍️</span> Écrire un texte
            </button>
          </div>
        )}

        {mode === "text" && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Ton témoignage <span className="text-red-400">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="Raconte ton expérience..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMode(null)}
                className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
              >
                ← Retour
              </button>
              <button
                onClick={confirmContent}
                disabled={!content.trim()}
                className="flex-1 py-2.5 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20 text-sm"
              >
                C&apos;est bon !
              </button>
            </div>
          </div>
        )}

        {mode === "video" && !videoBlob && (
          <div className="space-y-4 animate-fade-in">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full rounded-xl bg-gray-900 aspect-video object-cover"
            />
            {recording ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-red-500 font-mono text-lg">{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}</span>
                </div>
                <button
                  onClick={stopRecording}
                  className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  Arrêter
                </button>
              </div>
            ) : (
              <button
                onClick={startRecording}
                className="w-full py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all shadow-md text-sm flex items-center justify-center gap-2"
              >
                <span className="w-3 h-3 rounded-full bg-white" />
                Démarrer l&apos;enregistrement
              </button>
            )}
            <button
              onClick={() => { stream?.getTracks().forEach((t) => t.stop()); setMode(null); }}
              className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Revenir au choix
            </button>
          </div>
        )}

        {mode === "video" && videoBlob && (
          <div className="space-y-4 animate-fade-in">
            <video
              src={URL.createObjectURL(videoBlob)}
              controls
              className="w-full rounded-xl"
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setVideoBlob(null); startCamera(); }}
                className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
              >
                Recommencer
              </button>
              <button
                onClick={confirmContent}
                className="flex-1 py-2.5 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-all shadow-md shadow-accent/20 text-sm"
              >
                C&apos;est bon !
              </button>
            </div>
          </div>
        )}

        {/* Modale erreur caméra */}
        {showCameraError && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowCameraError(false)} />
            <div className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full animate-scale-in">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Caméra indisponible</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed">
                Clique sur le cadenas 🔒 dans ta barre d&apos;adresse → Autorisations du site → Active la caméra, puis recharge la page.
              </p>
              <button
                onClick={() => { setShowCameraError(false); setMode("text"); }}
                className="w-full py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-all shadow-md shadow-accent/20 text-sm"
              >
                Passer au format texte
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ÉTAPE 2 — Identification
  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
      <p className="text-sm text-gray-500 text-center">Super ! Plus qu&apos;à remplir tes infos :</p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Ton nom <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all"
          placeholder="Jean Dupont"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all"
          placeholder="jean@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Poste / Entreprise
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="CEO chez Acme"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all"
        />
      </div>

      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 accent-accent"
        />
        <label htmlFor="consent" className="text-xs text-gray-500">
          J&apos;autorise l&apos;utilisation publique de ce témoignage à des fins marketing.
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || !consent}
        className="w-full py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20 text-sm"
      >
        {loading ? "Traitement en cours..." : "Envoyer mon témoignage"}
      </button>

      <button
        type="button"
        onClick={() => setStep(1)}
        className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        ← Modifier mon témoignage
      </button>
    </form>
  );
}
