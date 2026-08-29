import { AIPhishingScenario } from '@/types';

export type { AIPhishingScenario };

export function generatePhishingPrompt(params: AIPhishingScenario): string {
  const { type, difficulty, category, userLevel, userSkillLevels } = params;
  
  const difficultyDescriptions = {
    beginner: 'obvious and easy to spot for beginners',
    intermediate: 'somewhat sophisticated but still detectable with careful analysis',
    advanced: 'highly sophisticated and realistic, requiring expert analysis'
  };

  const categoryDescriptions = {
    credential_harvesting: 'attempts to steal login credentials or personal information',
    malware: 'attempts to distribute malicious software or viruses',
    social_engineering: 'uses psychological manipulation to trick victims',
    business_email_compromise: 'impersonates company executives or business partners'
  };

  const typeDescriptions = {
    email: 'email message',
    sms: 'text message',
    link: 'suspicious URL',
    email_pro: 'professional email from a company',
    sms_banque: 'SMS from a bank',
    social_network: 'message from a social media platform'
  };

  const skillFocus = Object.entries(userSkillLevels)
    .filter(([_, level]) => level < 50)
    .map(([category, _]) => category)
    .join(', ');

  const prompt = `You are a cybersecurity training AI that creates realistic phishing simulations for educational purposes.

Generate a ${typeDescriptions[type] || type} phishing scenario that is ${difficultyDescriptions[difficulty]}.
The scenario should be focused on ${categoryDescriptions[category]}.

User context:
- Current level: ${userLevel}
- Areas needing improvement: ${skillFocus || 'balanced skills'}

Requirements:
1. Create a realistic ${typeDescriptions[type] || type} that ${categoryDescriptions[category]}
2. Make it ${difficultyDescriptions[difficulty]}
3. Include specific, realistic details (names, companies, URLs, etc.)
4. The scenario should be educational - not actually malicious
5. Make it challenging but solvable
${type === 'email_pro' ? '6. Use professional business language and corporate email format' : ''}
${type === 'sms_banque' ? '6. Mimic bank SMS style with security warnings and account references' : ''}
${type === 'social_network' ? '6. Use social media platform language and typical notification format' : ''}

Output format (JSON only):
{
  "title": "Brief descriptive title",
  "content": "The actual ${typeDescriptions[type] || type} content",
  "isPhishing": true,
  "indicators": ["List of 3-5 specific warning signs"],
  "explanation": "Detailed explanation of why this is phishing and what to look for"
}

Generate ONLY the JSON, no additional text.`;

  return prompt;
}

export function generateLegitimatePrompt(params: AIPhishingScenario): string {
  const { type, difficulty, category, userLevel } = params;
  
  const difficultyDescriptions = {
    beginner: 'simple and straightforward',
    intermediate: 'somewhat detailed but clearly legitimate',
    advanced: 'professional and detailed, potentially confusing but legitimate'
  };

  const categoryDescriptions = {
    credential_harvesting: 'password resets, account verifications, or security notifications',
    malware: 'software updates, security patches, or system notifications',
    social_engineering: 'legitimate business communications or customer service messages',
    business_email_compromise: 'genuine business requests or internal communications'
  };

  const prompt = `You are a cybersecurity training AI that creates legitimate communications for educational comparison.

Generate a legitimate ${type} that is ${difficultyDescriptions[difficulty]}.
The scenario should be related to ${categoryDescriptions[category]}.

User context:
- Current level: ${userLevel}

Requirements:
1. Create a realistic legitimate ${type} related to ${categoryDescriptions[category]}
2. Make it ${difficultyDescriptions[difficulty]}
3. Include proper security practices (verified domains, clear context, no urgency)
4. The scenario should be clearly legitimate upon careful inspection
5. Make it realistic enough that a careful user would recognize it as safe

Output format (JSON only):
{
  "title": "Brief descriptive title",
  "content": "The actual ${type} content",
  "isPhishing": false,
  "indicators": [],
  "explanation": "Explanation of why this is legitimate and what makes it safe"
}

Generate ONLY the JSON, no additional text.`;

  return prompt;
}
