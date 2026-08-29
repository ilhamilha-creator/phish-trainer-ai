export interface PhishingScenario {
  id: string;
  type: 'email' | 'sms' | 'link' | 'email_pro' | 'sms_banque' | 'social_network';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  content: string;
  isPhishing: boolean;
  indicators: string[];
  explanation: string;
  category: 'credential_harvesting' | 'malware' | 'social_engineering' | 'business_email_compromise';
}

export interface UserProgress {
  userId: string;
  currentLevel: number;
  xp: number;
  streak: number;
  totalCompleted: number;
  correctAnswers: number;
  wrongAnswers: number;
  skillLevels: {
    credential_harvesting: number;
    malware: number;
    social_engineering: number;
    business_email_compromise: number;
  };
  completedScenarios: string[];
  currentDifficulty: 'beginner' | 'intermediate' | 'advanced';
  lastActivity: Date;
}

export interface ScenarioResult {
  scenarioId: string;
  userAnswer: boolean;
  correct: boolean;
  timeTaken: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'credential_harvesting' | 'malware' | 'social_engineering' | 'business_email_compromise';
}

export interface AIPhishingScenario {
  type: 'email' | 'sms' | 'link' | 'email_pro' | 'sms_banque' | 'social_network';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'credential_harvesting' | 'malware' | 'social_engineering' | 'business_email_compromise';
  userLevel: number;
  userSkillLevels: {
    credential_harvesting: number;
    malware: number;
    social_engineering: number;
    business_email_compromise: number;
  };
}
