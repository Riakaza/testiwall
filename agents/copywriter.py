import os
import sys
sys.path.insert(0, os.path.dirname(__file__))
from base import ask_gemini

SYSTEM = (
    "Tu es un Copywriter SaaS specialise en conversion.\n"
    "Tu rediges en francais, de maniere percutante et directe.\n"
    "Style indie hacker, moderne, pas corporate.\n"
    "Adapte le format au contexte (landing page = court et punchy, email = personnalise)."
)


def main():
    if len(sys.argv) < 3:
        print("Usage: python agents/copywriter.py <fichier_destination> <brief>")
        print('Exemple: python agents/copywriter.py "copy/hero.txt" "Ecris le titre H1 pour TestiWall"')
        sys.exit(1)

    dest_file = sys.argv[1]
    topic = sys.argv[2]

    print("Redaction en cours...")

    result = ask_gemini(topic, SYSTEM)
    if not result:
        sys.exit(1)

    os.makedirs(os.path.dirname(dest_file) or ".", exist_ok=True)

    with open(dest_file, "w", encoding="utf-8") as f:
        f.write(result)

    print(f"Succes ! Texte sauvegarde dans : {dest_file}")


if __name__ == "__main__":
    main()
