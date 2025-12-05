# budget-tracker
[ANAS](https://moodle.ip-paris.fr/user/view.php?id=7476&course=15437) (**A**ssistant **N**umérique d’**A**dministration des **S**ous)

## Lancement de l'application

1. Cloner le dépôt GitHub :

```bash
git clone https://github.com/goueyeya/budget-tracker.git
```

2. Se déplacer dans le répertoire du projet :

```bash
cd budget-tracker
```

3. Installer les dépendances requises :

```bash
pip install -r requirements.txt
```
4. Lancer l'application :

```bash
uvicorn main:app 
# ou
fastapi dev main.py
```

## Connexion Huggingface pour utiliser l'endpoint de classification de texte

1. Créer un token d'accès sur [Huggingface](https://huggingface.co/settings/tokens) avec les permissions "Read".
2. Se rendre sur la page de Gemma3 4B pour demander l'accès au modèle : https://huggingface.co/google/gemma-3-4b-it
3. Ajouter le token d'accès Huggingface dans les variables d'environnement de votre système sous le nom `HF_TOKEN`.

Créer un fichier `.env` à la racine du projet avec le contenu suivant
```env
HF_TOKEN=your_huggingface_token_here
```