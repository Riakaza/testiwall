import os
import sys
from dotenv import load_dotenv
from google import genai

# Fix encodage Windows pour les emojis/accents
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("Erreur : GEMINI_API_KEY manquante dans le fichier .env")
    sys.exit(1)

client = genai.Client(api_key=api_key)

MODELS = [
    "gemini-3.1-flash-lite",
    "gemini-3.5-flash",
    "gemini-3-flash",
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
]


def ask_gemini(prompt, system_instruction=""):
    """Appelle Gemini avec fallback automatique entre les modeles disponibles."""
    for model_name in MODELS:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config={"system_instruction": system_instruction} if system_instruction else None,
            )
            print(f"[Modele utilise: {model_name}]")
            return response.text
        except Exception as e:
            error_msg = str(e)
            if "429" in error_msg or "quota" in error_msg.lower() or "rate" in error_msg.lower():
                print(f"[Quota depasse pour {model_name}, essai du suivant...]")
                continue
            elif "404" in error_msg or "not found" in error_msg.lower() or "no longer available" in error_msg.lower():
                print(f"[{model_name} indisponible, essai du suivant...]")
                continue
            else:
                print(f"Erreur API Gemini ({model_name}): {e}")
                return None

    print("Erreur : Tous les modeles ont atteint leur quota. Reessaie plus tard.")
    return None


def clean_code(text):
    """Enleve les blocs markdown si Gemini en met malgre la consigne."""
    if not text:
        return ""
    text = text.strip()
    if text.startswith("```"):
        lines = text.split("\n")
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    return text
