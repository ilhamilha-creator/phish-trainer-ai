import { NextRequest, NextResponse } from 'next/server';
import { getScenarioById } from '@/lib/phishing-data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const scenario = getScenarioById(params.id);
  
  if (!scenario) {
    return NextResponse.json({ error: 'Scenario not found' }, { status: 404 });
  }
  
  return NextResponse.json(scenario);
}
