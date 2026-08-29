export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

const USERS_KEY = 'phish-trainer-users';
const SESSION_KEY = 'phish-trainer-session';

export class AuthManager {
  private getUsers(): User[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveUsers(users: User[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  register(username: string, email: string): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    
    if (users.find(u => u.username === username)) {
      return { success: false, error: 'Username already exists' };
    }
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      createdAt: new Date()
    };

    users.push(newUser);
    this.saveUsers(users);
    this.setSession(newUser.id);

    return { success: true, user: newUser };
  }

  login(username: string): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    this.setSession(user.id);
    return { success: true, user };
  }

  logout(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSION_KEY);
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) return null;

    const users = this.getUsers();
    return users.find(u => u.id === sessionId) || null;
  }

  private setSession(userId: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SESSION_KEY, userId);
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export const authManager = new AuthManager();
