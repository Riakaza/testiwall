import os
import sys
sys.path.insert(0, os.path.dirname(__file__))
from base import ask_gemini

SYSTEM = (
    "Tu es un auditeur de code senior specialise en securite et performance.\n"
    "Analyse le code et liste de maniere concise :\n"
    "- Les bugs potentiels\n"
    "- Les failles de securite\n"
    "- Les problemes de performance\n"
    "- Les ameliorations possibles\n"
    "Reponds en francais, format bullet points."
)


def main():
    if len(sys.argv) < 2:
        print("Usage: python agents/reviewer.py <chemin_du_fichier>")
        print('Exemple: python agents/reviewer.py "app/api/testimonials/route.ts"')
        sys.exit(1)

    file_path = sys.argv[1]

    if not os.path.exists(file_path):
        print(f"Le fichier {file_path} n'existe pas.")
        sys.exit(1)

    with open(file_path, "r", encoding="utf-8") as f:
        code = f.read()

    print(f"--- ANALYSE DE {file_path} ---\n")

    result = ask_gemini(f"Analyse ce code :\n\n{code}", SYSTEM)
    if result:
        print(result)


if __name__ == "__main__":
    main()
