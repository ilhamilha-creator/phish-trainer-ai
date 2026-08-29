import { PhishingScenario } from '@/types';

export const phishingScenarios: PhishingScenario[] = [
  {
    id: '1',
    type: 'email',
    difficulty: 'beginner',
    title: 'Urgent Account Verification',
    content: `Subject: URGENT: Your account will be suspended in 24 hours

Dear User,

We detected suspicious activity on your account. To prevent suspension, please verify your identity immediately by clicking the link below:

http://verify-account-secure.com/login

If you do not respond within 24 hours, your account will be permanently suspended.

Best regards,
Security Team`,
    isPhishing: true,
    indicators: [
      'Urgent language creating pressure',
      'Generic greeting "Dear User"',
      'Suspicious URL not matching official domain',
      'Threat of account suspension',
      'No specific account details mentioned'
    ],
    explanation: 'This is a classic phishing attempt using urgency and fear tactics. The URL is suspicious and the message lacks personalization.',
    category: 'credential_harvesting'
  },
  {
    id: '2',
    type: 'email',
    difficulty: 'beginner',
    title: 'Password Reset Request',
    content: `Subject: Password reset request for your account

Hello,

We received a request to reset your password for your account. If you did not make this request, you can safely ignore this email.

To reset your password, please visit: https://example.com/reset-password

This link will expire in 24 hours.

Thanks,
The Security Team`,
    isPhishing: false,
    indicators: [],
    explanation: 'This is a legitimate password reset email. It provides clear information, uses proper domain, and does not create unnecessary urgency.',
    category: 'credential_harvesting'
  },
  {
    id: '3',
    type: 'sms',
    difficulty: 'intermediate',
    title: 'Delivery Notification',
    content: `Your package has been delivered. Click here to confirm receipt: https://delivery-track.net/confirm?id=ABC123`,
    isPhishing: true,
    indicators: [
      'Unsolicited delivery message',
      'Suspicious URL not from known carrier',
      'Generic tracking number format',
      'No carrier identification'
    ],
    explanation: 'This SMS phishing attempts to trick recipients into clicking a malicious link under the guise of a delivery notification.',
    category: 'malware'
  },
  {
    id: '4',
    type: 'email',
    difficulty: 'intermediate',
    title: 'CEO Request',
    content: `Subject: Urgent - Wire Transfer Needed

Hi,

I need you to process an urgent wire transfer of $45,000 to our supplier immediately. I'm in a meeting and can't talk, but this needs to be done within the hour.

Details:
Bank: International Business Bank
Account: 1234567890
Routing: 987654321

Please confirm once done.

Thanks,
CEO`,
    isPhishing: true,
    indicators: [
      'Urgent request for money transfer',
      'Impersonation of CEO',
      'Pressure to act quickly',
      'Lack of proper verification process',
      'Unusual communication channel'
    ],
    explanation: 'This is a business email compromise (BEC) attempt. Attackers impersonate executives to authorize fraudulent transfers.',
    category: 'business_email_compromise'
  },
  {
    id: '5',
    type: 'link',
    difficulty: 'advanced',
    title: 'Login Page',
    content: `https://www.g00gle.com/account/login`,
    isPhishing: true,
    indicators: [
      'Typosquatting: "g00gle" instead of "google"',
      'Uses zeros instead of letter O',
      'Attempts to mimic legitimate domain'
    ],
    explanation: 'This URL uses typosquatting to appear legitimate. Always verify the exact spelling of domain names.',
    category: 'credential_harvesting'
  },
  {
    id: '6',
    type: 'email',
    difficulty: 'advanced',
    title: 'Document Sharing',
    content: `Subject: Shared document: Q4 Financial Report

Hello,

I've shared an important document with you. Please review it before our meeting tomorrow.

View document: https://docs-cloud-view.com/file/financial-report-q4

Best regards,
Sarah Johnson
Financial Analyst`,
    isPhishing: true,
    indicators: [
      'Professional-looking context',
      'Suspicious document sharing domain',
      'Specific but potentially fabricated details',
      'Uses common business scenario'
    ],
    explanation: 'This sophisticated phishing uses a realistic business scenario with a malicious document sharing link.',
    category: 'malware'
  },
  {
    id: '7',
    type: 'email',
    difficulty: 'intermediate',
    title: 'IT Support Update',
    content: `Subject: Required: Software Update Installation

Dear Employee,

Our IT department requires all employees to install a critical security update. Please download and install the attached file immediately.

This update addresses several security vulnerabilities.

IT Support Team`,
    isPhishing: true,
    indicators: [
      'Unsolicited software attachment',
      'Pressure to install immediately',
      'Generic greeting',
      'Vague security justification'
    ],
    explanation: 'Malware often distributed as fake security updates. Never install software from unsolicited emails.',
    category: 'malware'
  },
  {
    id: '8',
    type: 'email',
    difficulty: 'beginner',
    title: 'Lottery Winner',
    content: `Subject: CONGRATULATIONS! You've won $1,000,000!

Dear Lucky Winner,

You have been selected as the winner of our international lottery! To claim your prize, please send us your personal information and pay a small processing fee of $500.

Contact us at: winner@international-lottery.com

Congratulations again!`,
    isPhishing: true,
    indicators: [
      'Too good to be true offer',
      'Request for personal information',
      'Request for upfront payment',
      'Generic email domain',
      'No legitimate lottery operates this way'
    ],
    explanation: 'Classic lottery scam. Legitimate lotteries never ask for payment to claim prizes and do not contact winners via email.',
    category: 'social_engineering'
  }
];

export function getScenarioById(id: string): PhishingScenario | undefined {
  return phishingScenarios.find(s => s.id === id);
}

export function getScenariosByDifficulty(difficulty: PhishingScenario['difficulty']): PhishingScenario[] {
  return phishingScenarios.filter(s => s.difficulty === difficulty);
}

export function getRandomScenario(difficulty?: PhishingScenario['difficulty']): PhishingScenario {
  let scenarios = phishingScenarios;
  if (difficulty) {
    scenarios = getScenariosByDifficulty(difficulty);
  }
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}
