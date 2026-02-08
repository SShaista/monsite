# Student Portal - Version HTML/CSS/JavaScript

Application web pour étudiants en école d'ingénieurs, développée en HTML, CSS et JavaScript pur (sans framework).

## 📁 Structure des fichiers

```
student-portal-static/
├── index.html      ← Page principale (structure HTML)
├── style.css       ← Styles CSS (design et animations)
├── script.js       ← JavaScript (logique et interactions)
└── README.md       ← Ce fichier
```

## 🚀 Comment utiliser

### Méthode 1 : Ouvrir directement
1. Double-cliquez sur `index.html`
2. L'application s'ouvre dans votre navigateur

### Méthode 2 : Avec un serveur local (recommandé)
Si vous avez Python installé :
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Puis ouvrez `http://localhost:8000` dans votre navigateur.

## ✨ Fonctionnalités

- **📅 Emploi du temps** : Vue hebdomadaire avec sélection par jour
- **📚 Cours** : Liste des ECUE avec filtre par semestre
- **📝 Examens & Tâches** : Examens à venir + To-do list interactive
- **⚙️ Paramètres** : Interface de configuration

## 🎨 Personnalisation

### Modifier les données
Les données sont dans le fichier `script.js` en début de fichier :
- `scheduleData` : Emploi du temps
- `ecueData` : Liste des cours
- `examsData` : Examens
- `tasksData` : Tâches par défaut

### Modifier les couleurs
Dans `style.css`, modifiez les variables CSS en haut du fichier :
```css
:root {
    --primary: #007bff;        /* Bleu principal */
    --primary-dark: #0056b3;   /* Bleu foncé */
    --background: #f8f9fa;     /* Fond */
    --text: #343a40;           /* Texte */
    ...
}
```

## 📱 Responsive

L'application est optimisée pour :
- Mobile (smartphones)
- Tablettes
- Desktop

## 🌐 Navigateurs supportés

- Chrome / Edge
- Firefox
- Safari
- Opera

## 📄 Licence

Projet libre pour usage éducatif.
