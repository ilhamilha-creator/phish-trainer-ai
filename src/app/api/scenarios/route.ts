import { NextRequest, NextResponse } from 'next/server';
import { phishingScenarios, getRandomScenario, getScenariosByDifficulty } from '@/lib/phishing-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const difficulty = searchParams.get('difficulty');
  const random = searchParams.get('random');

  if (random === 'true') {
    const scenario = getRandomScenario(
      difficulty as 'beginner' | 'intermediate' | 'advanced' | undefined
    );
    return NextResponse.json(scenario);
  }

  if (difficulty) {
    const scenarios = getScenariosByDifficulty(
      difficulty as 'beginner' | 'intermediate' | 'advanced'
    );
    return NextResponse.json(scenarios);
  }

  return NextResponse.json(phishingScenarios);
}
