import os
import sys
sys.path.insert(0, os.path.dirname(__file__))
from base import ask_gemini, clean_code

SYSTEM = (
    "Tu es un developpeur Fullstack Next.js 14+ (App Router), Tailwind CSS et Supabase expert.\n"
    "Tu ecris un code TypeScript propre, moderne et securise.\n"
    "Ne donne AUCUNE explication, AUCUN markdown (pas de ```tsx ... ```), juste le code brut directement utilisable."
)


def main():
    if len(sys.argv) < 3:
        print("Usage: python agents/coder.py <chemin_du_fichier> <instruction>")
        print('Exemple: python agents/coder.py "components/Card.tsx" "Cree un composant carte"')
        sys.exit(1)

    file_path = sys.argv[1]
    instruction = sys.argv[2]

    existing_code = ""
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            existing_code = f.read()
        print(f"Modification de : {file_path}...")
    else:
        print(f"Creation de : {file_path}...")

    prompt = f"Fichier cible : {file_path}\n"
    if existing_code:
        prompt += f"Code actuel :\n---\n{existing_code}\n---\n"
    prompt += f"Instruction : {instruction}\n"

    result = ask_gemini(prompt, SYSTEM)
    if not result:
        sys.exit(1)

    code = clean_code(result)
    os.makedirs(os.path.dirname(file_path) or ".", exist_ok=True)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(code)

    print(f"Succes ! Fichier sauvegarde : {file_path}")


if __name__ == "__main__":
    main()
