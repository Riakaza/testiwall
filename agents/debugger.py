import os
import sys
sys.path.insert(0, os.path.dirname(__file__))
from base import ask_gemini, clean_code

SYSTEM = (
    "Tu es un expert en debuggage Next.js/TypeScript/Supabase.\n"
    "Corrige l'erreur fournie. Retourne UNIQUEMENT le code corrige complet du fichier.\n"
    "Pas de markdown, pas d'explication, juste le code brut."
)


def main():
    if len(sys.argv) < 3:
        print("Usage: python agents/debugger.py <chemin_du_fichier> <message_erreur>")
        print('Exemple: python agents/debugger.py "app/page.tsx" "Cannot read property of undefined"')
        sys.exit(1)

    file_path = sys.argv[1]
    error_message = sys.argv[2]

    if not os.path.exists(file_path):
        print(f"Le fichier {file_path} n'existe pas.")
        sys.exit(1)

    with open(file_path, "r", encoding="utf-8") as f:
        code = f.read()

    prompt = f"Fichier : {file_path}\n\nCode actuel :\n{code}\n\nErreur :\n{error_message}\n\nCorrige le code."

    print(f"Analyse et correction de {file_path}...")

    result = ask_gemini(prompt, SYSTEM)
    if not result:
        sys.exit(1)

    fixed_code = clean_code(result)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(fixed_code)

    print(f"Corrige ! Fichier sauvegarde : {file_path}")


if __name__ == "__main__":
    main()
