import { NextRequest, NextResponse } from 'next/server';
import { getScenarioById } from '@/lib/data/phishing-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const scenario = getScenarioById(id);
  
  if (!scenario) {
    return NextResponse.json({ error: 'Scenario not found' }, { status: 404 });
  }
  
  return NextResponse.json(scenario);
}
