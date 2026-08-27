# 🎣 PhishTrainer AI

Un générateur de simulations de phishing adaptatif propulsé par l'IA, façon Duolingo de la cybersécurité. L'IA crée dynamiquement des emails, SMS et liens réalistes pour vous entraîner à détecter les tentatives de phishing.

## 🚀 Fonctionnalités

### 🤖 Génération IA Dynamique
- **Scénarios uniques** : Chaque session génère de nouveaux scénarios de phishing via GPT-4
- **Adaptation en temps réel** : L'IA ajuste la complexité selon votre niveau et vos compétences
- **Contenu réaliste** : Emails, SMS et liens personnalisés et crédibles
- **Fallback intelligent** : Système de secours avec scénarios statiques si l'IA est indisponible

### 🎮 Gamification Complète
- **Système adaptatif** : La difficulté s'ajuste automatiquement selon vos performances
- **XP et niveaux** : Gagnez des points et progressez dans votre apprentissage
- **Streaks** : Maintenez une série d'activités quotidiennes
- **Compétences par catégorie** : Suivez votre progression dans chaque type de phishing

### 📊 Statistiques Avancées
- **Tableau de bord détaillé** : Visualisez votre progression et vos statistiques
- **Compétences par catégorie** : Credential harvesting, malware, social engineering, BEC
- **Leaderboard** : Comparez vos performances avec d'autres utilisateurs
- **Historique** : Suivez votre évolution au fil du temps

### 🔐 Sécurité et Authentification
- **Système d'authentification** : Créez un compte pour sauvegarder votre progression
- **Persistance des données** : Vos progrès sont sauvegardés automatiquement
- **Interface sécurisée** : Design moderne et intuitive

## 🛠️ Technologies

- **Next.js 15** - Framework React avec App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling moderne
- **React Hooks** - Gestion d'état locale
- **LocalStorage** - Persistance des données utilisateur
- **AI Integration Ready** - Support for OpenAI, Groq, Hugging Face, Ollama (optional)

## 📦 Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd phish-trainer-ai

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Note:** The app works immediately with static phishing scenarios. AI-powered dynamic generation is optional and requires additional setup.

## 🎮 Comment ça marche

1. **Créez un compte** : Inscrivez-vous pour sauvegarder votre progression
2. **Analysez le scénario** : Examinez l'email, SMS ou lien présenté
3. **Prenez une décision** : Déterminez si c'est légitime ou du phishing
4. **Apprenez** : Recevez un feedback instantané avec les indicateurs clés
5. **Progresssez** : Le système ajuste la difficulté selon vos performances

## 🤖 AI Generation (Optional)

The app supports dynamic AI-powered scenario generation. To enable:

**Option 1: OpenAI (Paid)**
- Get API key from [platform.openai.com](https://platform.openai.com/api-keys)
- Set `OPENAI_API_KEY` in `.env`

**Option 2: Ollama (Free, Local)**
- Install Ollama from [ollama.com](https://ollama.com/download)
- Run `ollama pull llama3.1`
- Set `OLLAMA_BASE_URL=http://localhost:11434/v1` and `OLLAMA_MODEL=llama3.1` in `.env`

**Option 3: Hugging Face (Free)**
- Get API key from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
- Set `HUGGINGFACE_API_KEY` in `.env`

## 📊 Système de progression

- **XP** : Gagnez des points selon la difficulté et votre rapidité
- **Niveaux** : Montez de niveau en accumulant de l'XP
- **Streak** : Maintenez une série d'activités quotidiennes
- **Compétences** : Suivez votre progression par catégorie de phishing
- **Difficulté adaptative** : Le système ajuste la difficulté selon vos performances

## 🎯 Catégories de phishing

- **Credential Harvesting** : Tentatives de vol d'identifiants
- **Malware** : Distribution de logiciels malveillants
- **Social Engineering** : Manipulation psychologique
- **Business Email Compromise** : Impersonnalisation d'entreprises

## 🏗️ Structure du projet

```
src/
├── app/
│   ├── page.tsx          # Page principale avec navigation
│   ├── layout.tsx        # Layout global
│   └── globals.css       # Styles globaux
├── components/
│   ├── Dashboard.tsx     # Tableau de bord statistiques
│   └── TrainingInterface.tsx  # Interface d'entraînement
└── lib/
    ├── phishing-data.ts  # Base de données des scénarios
    └── user-progress.ts # Gestion de la progression utilisateur
```

## 🔧 Personnalisation

### Ajouter de nouveaux scénarios

Éditez `src/lib/phishing-data.ts` et ajoutez des objets `PhishingScenario` :

```typescript
{
  id: 'unique-id',
  type: 'email' | 'sms' | 'link',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  title: 'Titre du scénario',
  content: 'Contenu du message',
  isPhishing: true,
  indicators: ['Indicateur 1', 'Indicateur 2'],
  explanation: 'Explication détaillée',
  category: 'credential_harvesting' | 'malware' | 'social_engineering' | 'business_email_compromise'
}
```

### Ajuster la difficulté

Modifiez la logique dans `src/lib/user-progress.ts` dans la méthode `updateDifficulty()`.

## 🚀 Déploiement

### Vercel (recommandé)

```bash
npm run build
```

Puis connectez votre repository à Vercel pour un déploiement automatique.

### Autres plateformes

Ce projet peut être déployé sur n'importe quelle plateforme supportant Next.js :
- Netlify
- Railway
- Render
- AWS Amplify

## 📝 License

Ce projet est créé à des fins éducatives pour aider les utilisateurs à reconnaître les tentatives de phishing.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ajouter de nouveaux scénarios de phishing
- Améliorer l'interface utilisateur
- Corriger les bugs
- Suggérer de nouvelles fonctionnalités
