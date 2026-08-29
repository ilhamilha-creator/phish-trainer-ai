# 🎣 PhishTrainer AI

An AI-powered adaptive phishing simulation generator, the Duolingo of cybersecurity. AI dynamically creates realistic emails, SMS, and links to train you to detect phishing attempts.

## 🚀 Features

### 🤖 Dynamic AI Generation
- **Unique scenarios**: Each session generates new phishing scenarios via AI
- **Real-time adaptation**: AI adjusts complexity based on your level and skills
- **Realistic content**: Personalized and credible emails, SMS, and links
- **Smart fallback**: Static scenario backup system if AI is unavailable

### 🎮 Complete Gamification
- **Adaptive system**: Difficulty automatically adjusts based on your performance
- **XP and levels**: Earn points and progress in your learning
- **Streaks**: Maintain a daily activity streak
- **Category skills**: Track your progress in each phishing type

### 📊 Advanced Statistics
- **Detailed dashboard**: Visualize your progress and statistics
- **Category skills**: Credential harvesting, malware, social engineering, BEC
- **Leaderboard**: Compare your performance with other users
- **History**: Track your evolution over time

### 🔐 Security and Authentication
- **Authentication system**: Create an account to save your progress
- **Data persistence**: Your progress is automatically saved
- **Secure interface**: Modern and intuitive design

## 🛠️ Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Modern styling
- **React Hooks** - Local state management
- **LocalStorage** - User data persistence
- **AI Integration Ready** - Support for Groq, OpenAI, Hugging Face, Ollama (optional)

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

## 🎮 How it works

1. **Create an account**: Sign up to save your progress
2. **Analyze the scenario**: Examine the email, SMS, or link presented
3. **Make a decision**: Determine if it's legitimate or phishing
4. **Learn**: Receive instant feedback with key indicators
5. **Progress**: The system adjusts difficulty based on your performance

## 🤖 AI Generation (Optional)

The app supports dynamic AI-powered scenario generation. To enable:

**Option 1: Groq (Recommended, Free)**
- Get API key from [console.groq.com](https://console.groq.com/)
- Set `GROQ_API_KEY` in `.env`

**Option 2: OpenAI (Paid)**
- Get API key from [platform.openai.com](https://platform.openai.com/api-keys)
- Set `OPENAI_API_KEY` in `.env`

**Option 3: Ollama (Free, Local)**
- Install Ollama from [ollama.com](https://ollama.com/download)
- Run `ollama pull llama3.1`
- Set `OLLAMA_BASE_URL=http://localhost:11434/v1` and `OLLAMA_MODEL=llama3.1` in `.env`

**Option 4: Hugging Face (Free)**
- Get API key from [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
- Set `HUGGINGFACE_API_KEY` in `.env`

## 📊 Progression System

- **XP**: Earn points based on difficulty and speed
- **Levels**: Level up by accumulating XP
- **Streak**: Maintain a daily activity streak
- **Skills**: Track your progress by phishing category
- **Adaptive difficulty**: System adjusts difficulty based on your performance

## 🎯 Phishing Categories

- **Credential Harvesting**: Attempts to steal login credentials
- **Malware**: Distribution of malicious software
- **Social Engineering**: Psychological manipulation
- **Business Email Compromise**: Impersonation of companies

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page with navigation
│   ├── layout.tsx        # Global layout
│   └── globals.css       # Global styles
├── components/
│   ├── Dashboard.tsx     # Statistics dashboard
│   └── TrainingInterface.tsx  # Training interface
└── lib/
    ├── phishing-data.ts  # Scenario database
    └── user-progress.ts # User progress management
```

## 🔧 Customization

### Add new scenarios

Edit `src/lib/phishing-data.ts` and add `PhishingScenario` objects:

```typescript
{
  id: 'unique-id',
  type: 'email' | 'sms' | 'link',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  title: 'Scenario title',
  content: 'Message content',
  isPhishing: true,
  indicators: ['Indicator 1', 'Indicator 2'],
  explanation: 'Detailed explanation',
  category: 'credential_harvesting' | 'malware' | 'social_engineering' | 'business_email_compromise'
}
```

### Adjust difficulty

Modify the logic in `src/lib/user-progress.ts` in the `updateDifficulty()` method.

## 🚀 Deployment

### Vercel (recommended)

```bash
npm run build
```

Then connect your repository to Vercel for automatic deployment.

### Other platforms

This project can be deployed on any platform supporting Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📝 License

This project is created for educational purposes to help users recognize phishing attempts.

## 🤝 Contribution

Contributions are welcome! Feel free to:
- Add new phishing scenarios
- Improve the user interface
- Fix bugs
- Suggest new features
