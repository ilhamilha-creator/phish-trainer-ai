import { NextRequest, NextResponse } from 'next/server';
import { generatePhishingPrompt, generateLegitimatePrompt, AIPhishingScenario } from '@/lib/ai/ai-prompts';

export async function POST(request: NextRequest) {
  try {
    const body: AIPhishingScenario & { isPhishing: boolean } = await request.json();
    
    const { type, difficulty, category, userLevel, userSkillLevels, isPhishing } = body;

    const prompt = isPhishing 
      ? generatePhishingPrompt({ type, difficulty, category, userLevel, userSkillLevels })
      : generateLegitimatePrompt({ type, difficulty, category, userLevel, userSkillLevels });

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'groq/compound',
          messages: [
            {
              role: 'system',
              content: 'You are a cybersecurity training AI that generates realistic phishing simulations for educational purposes. Always respond with valid JSON only, no additional text.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 1500,
          response_format: { type: 'json_object' }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content generated');
    }

    const generatedScenario = JSON.parse(content);

    // Add metadata
    const scenario = {
      id: Date.now().toString(),
      type,
      difficulty,
      category,
      ...generatedScenario,
      generated: true,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(scenario);
  } catch (error) {
    console.error('Error generating scenario:', error);
    return NextResponse.json(
      { error: 'Failed to generate scenario', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
