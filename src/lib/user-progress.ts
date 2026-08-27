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

const INITIAL_PROGRESS: UserProgress = {
  userId: 'default',
  currentLevel: 1,
  xp: 0,
  streak: 0,
  totalCompleted: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  skillLevels: {
    credential_harvesting: 0,
    malware: 0,
    social_engineering: 0,
    business_email_compromise: 0
  },
  completedScenarios: [],
  currentDifficulty: 'beginner',
  lastActivity: new Date()
};

export class ProgressManager {
  private storageKey = 'phish-trainer-progress';

  getProgress(): UserProgress {
    if (typeof window === 'undefined') return INITIAL_PROGRESS;
    
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
    return INITIAL_PROGRESS;
  }

  saveProgress(progress: UserProgress): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.storageKey, JSON.stringify(progress));
  }

  submitAnswer(result: ScenarioResult): UserProgress {
    const progress = this.getProgress();
    
    progress.totalCompleted++;
    progress.lastActivity = new Date();
    
    if (result.correct) {
      progress.correctAnswers++;
      const xpGain = this.calculateXP(result.difficulty, result.timeTaken);
      progress.xp += xpGain;
      
      // Update skill level for the category
      progress.skillLevels[result.category] = Math.min(
        100,
        progress.skillLevels[result.category] + 10
      );
      
      // Check for level up
      const newLevel = this.calculateLevel(progress.xp);
      if (newLevel > progress.currentLevel) {
        progress.currentLevel = newLevel;
      }
      
      // Update difficulty based on performance
      this.updateDifficulty(progress);
    } else {
      progress.wrongAnswers++;
      progress.streak = 0;
      
      // Decrease skill level slightly
      progress.skillLevels[result.category] = Math.max(
        0,
        progress.skillLevels[result.category] - 5
      );
    }
    
    // Update streak if correct and recent activity
    if (result.correct) {
      const lastActivity = new Date(progress.lastActivity);
      const now = new Date();
      const hoursSinceLastActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastActivity < 24) {
        progress.streak++;
      } else {
        progress.streak = 1;
      }
    }
    
    progress.completedScenarios.push(result.scenarioId);
    this.saveProgress(progress);
    
    return progress;
  }

  private calculateXP(difficulty: string, timeTaken: number): number {
    let baseXP = 10;
    
    switch (difficulty) {
      case 'beginner':
        baseXP = 10;
        break;
      case 'intermediate':
        baseXP = 20;
        break;
      case 'advanced':
        baseXP = 30;
        break;
    }
    
    // Time bonus (faster = more XP)
    if (timeTaken < 10) {
      baseXP *= 1.5;
    } else if (timeTaken < 20) {
      baseXP *= 1.2;
    }
    
    return Math.round(baseXP);
  }

  private calculateLevel(xp: number): number {
    // Level formula: level = floor(sqrt(xp / 100)) + 1
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  }

  private updateDifficulty(progress: UserProgress): void {
    const accuracy = progress.correctAnswers / progress.totalCompleted;
    const avgSkillLevel = Object.values(progress.skillLevels).reduce((a, b) => a + b, 0) / 4;
    
    if (accuracy > 0.85 && avgSkillLevel > 70 && progress.currentLevel >= 5) {
      progress.currentDifficulty = 'advanced';
    } else if (accuracy > 0.7 && avgSkillLevel > 40 && progress.currentLevel >= 3) {
      progress.currentDifficulty = 'intermediate';
    } else {
      progress.currentDifficulty = 'beginner';
    }
  }

  resetProgress(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.storageKey);
  }

  getStats() {
    const progress = this.getProgress();
    const accuracy = progress.totalCompleted > 0 
      ? (progress.correctAnswers / progress.totalCompleted * 100).toFixed(1)
      : '0';
    
    return {
      level: progress.currentLevel,
      xp: progress.xp,
      streak: progress.streak,
      accuracy: `${accuracy}%`,
      totalCompleted: progress.totalCompleted,
      skillLevels: progress.skillLevels,
      currentDifficulty: progress.currentDifficulty
    };
  }
}

export const progressManager = new ProgressManager();
