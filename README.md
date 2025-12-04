# budget-tracker
[ANAS](https://moodle.ip-paris.fr/user/view.php?id=7476&course=15437) (**A**ssistant **N**umérique d’**A**dministration des **S**ous)


# Connexion Huggingface pour utiliser l'endpoint de classification de texte

1. Créer un token d'accès sur [Huggingface](https://huggingface.co/settings/tokens) avec les permissions "Read".
2. Se rendre sur la page de Gemma3 4B pour demander l'accès au modèle : https://huggingface.co/google/gemma-3-4b-it
3. Ajouter le token d'accès Huggingface dans les variables d'environnement de votre système sous le nom `HF_TOKEN`.

Exemple en powershell:

```powershell
$env:HF_TOKEN="votre_token_ici"
```

Exemple en bash:

```bash
export HF_TOKEN="votre_token_ici"
```