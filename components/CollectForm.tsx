"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/lib/i18n-context";

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
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

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
      stream?.getTracks().forEach((tr) => tr.stop());
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
      stream.getTracks().forEach((tr) => tr.stop());
    };
    recorder.start();
    mediaRecorderRef.current = recorder;
    setRecording(true);
    setTimer(0);
    timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function confirmContent() {
    if (mode === "video") {
      setContent("[VIDEO]");
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
        rating,
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
        <p className="text-lg font-semibold text-gray-900">{t("collect.checkEmail")}</p>
        <p className="text-sm text-gray-500 mt-2">
          {t("collect.checkEmailDesc")} <strong>{email}</strong>
        </p>
        <p className="text-xs text-gray-400 mt-3">
          {t("collect.checkSpam")}
        </p>
      </div>
    );
  }

  // Step 1 — Mode choice + content
  if (step === 1) {
    return (
      <div className="space-y-5">
        {!mode && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 text-center mb-4">{t("collect.howToShare")}</p>
            <button
              onClick={startCamera}
              className="w-full py-5 rounded-xl border-2 border-gray-200 hover:border-accent/40 hover:bg-accent/5 font-semibold text-base transition-all flex items-center justify-center gap-3"
            >
              <span className="text-2xl">🎥</span> {t("collect.recordVideo")}
            </button>
            <button
              onClick={() => setMode("text")}
              className="w-full py-5 rounded-xl border-2 border-gray-200 hover:border-accent/40 hover:bg-accent/5 font-semibold text-base transition-all flex items-center justify-center gap-3"
            >
              <span className="text-2xl">✍️</span> {t("collect.writeText")}
            </button>
          </div>
        )}

        {mode === "text" && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t("collect.rating")} <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-2xl cursor-pointer transition-colors ${
                      star <= (hoverRating || rating) ? "text-amber-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t("collect.testimonial")} <span className="text-red-400">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder={t("collect.testimonialPlaceholder")}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMode(null)}
                className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
              >
                &larr; {t("collect.back")}
              </button>
              <button
                onClick={confirmContent}
                disabled={!content.trim()}
                className="flex-1 py-2.5 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20 text-sm"
              >
                {t("collect.looksGood")}
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
                  {t("collect.stop")}
                </button>
              </div>
            ) : (
              <button
                onClick={startRecording}
                className="w-full py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all shadow-md text-sm flex items-center justify-center gap-2"
              >
                <span className="w-3 h-3 rounded-full bg-white" />
                {t("collect.startRecording")}
              </button>
            )}
            <button
              onClick={() => { stream?.getTracks().forEach((tr) => tr.stop()); setMode(null); }}
              className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              &larr; {t("collect.backToChoice")}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t("collect.rating")} <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-2xl cursor-pointer transition-colors ${
                      star <= (hoverRating || rating) ? "text-amber-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setVideoBlob(null); startCamera(); }}
                className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
              >
                {t("collect.retake")}
              </button>
              <button
                onClick={confirmContent}
                className="flex-1 py-2.5 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-all shadow-md shadow-accent/20 text-sm"
              >
                {t("collect.looksGood")}
              </button>
            </div>
          </div>
        )}

        {/* Camera error modal */}
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
                <h3 className="text-lg font-bold text-gray-900">{t("collect.cameraUnavailable")}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed">
                {t("collect.cameraInstructions")}
              </p>
              <button
                onClick={() => { setShowCameraError(false); setMode("text"); }}
                className="w-full py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-all shadow-md shadow-accent/20 text-sm"
              >
                {t("collect.switchToText")}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Step 2 — Identification
  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
      <p className="text-sm text-gray-500 text-center">{t("collect.almostDone")}</p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("collect.name")} <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("collect.email")} <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm transition-all"
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("collect.role")}
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="CEO at Acme"
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
          {t("collect.consentLabel")}
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || !consent}
        className="w-full py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark disabled:opacity-50 transition-all shadow-md shadow-accent/20 text-sm"
      >
        {loading ? t("collect.loading") : t("collect.submit")}
      </button>

      <button
        type="button"
        onClick={() => setStep(1)}
        className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        &larr; {t("collect.editTestimonial")}
      </button>
    </form>
  );
}
