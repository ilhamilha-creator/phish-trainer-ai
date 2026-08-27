import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { scenario, userAnswer, isCorrect, selectedSuspiciousParts } = body;

    const prompt = `You are a cybersecurity training AI providing personalized feedback.

Scenario details:
- Type: ${scenario.type}
- Difficulty: ${scenario.difficulty}
- Category: ${scenario.category}
- Title: ${scenario.title}
- Content: ${scenario.content}
- Is Phishing: ${scenario.isPhishing}
- Explanation: ${scenario.explanation}
- Indicators: ${scenario.indicators?.join(', ') || 'none'}

User performance:
- User Answer: ${userAnswer ? 'Phishing' : 'Legitimate'}
- Correct: ${isCorrect}
- Selected Suspicious Parts: ${selectedSuspiciousParts?.join(', ') || 'none'}

Provide personalized feedback:
1. Acknowledge if the answer was correct or incorrect
2. Explain specifically why this scenario was ${scenario.isPhishing ? 'phishing' : 'legitimate'}
3. If the user was incorrect, explain what they missed
4. If the user selected suspicious parts, validate their choices
5. Provide actionable tips for similar scenarios in the future
6. Be encouraging and educational

Output format (JSON only):
{
  "feedback": "Personalized feedback message",
  "score": "0-100 score based on performance",
  "tips": ["3 specific tips for improvement"]
}

Generate ONLY the JSON, no additional text.`;

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
              content: 'You are a cybersecurity training AI that provides personalized feedback. Always respond with valid JSON only, no additional text.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 1000,
          response_format: { type: 'json_object' }
        }),
      }
    );

    if (!response.ok) {
      // Fallback to static feedback if AI fails
      const staticFeedback = {
        feedback: isCorrect 
          ? `Excellent! You correctly identified this as ${scenario.isPhishing ? 'phishing' : 'legitimate'}. ${scenario.explanation}`
          : `Not quite. This was actually ${scenario.isPhishing ? 'phishing' : 'legitimate'}. ${scenario.explanation}`,
        score: isCorrect ? 100 : 0,
        tips: scenario.indicators || []
      };
      return NextResponse.json(staticFeedback);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content generated');
    }

    const feedbackData = JSON.parse(content);
    return NextResponse.json(feedbackData);

  } catch (error) {
    console.error('Error generating feedback:', error);
    // Fallback to basic static feedback
    const body = await request.json();
    const { scenario, isCorrect } = body;
    
    const fallbackFeedback = {
      feedback: isCorrect 
        ? `Great job! You correctly identified this as ${scenario.isPhishing ? 'phishing' : 'legitimate'}. ${scenario.explanation}`
        : `This was actually ${scenario.isPhishing ? 'phishing' : 'legitimate'}. ${scenario.explanation}`,
      score: isCorrect ? 100 : 0,
      tips: scenario.indicators || []
    };
    
    return NextResponse.json(fallbackFeedback);
  }
}
