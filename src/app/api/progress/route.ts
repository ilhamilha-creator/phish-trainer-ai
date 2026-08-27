import { NextRequest, NextResponse } from 'next/server';
import { progressManager, ScenarioResult } from '@/lib/user-progress';

export async function GET(request: NextRequest) {
  const stats = progressManager.getStats();
  return NextResponse.json(stats);
}

export async function POST(request: NextRequest) {
  try {
    const body: ScenarioResult = await request.json();
    const progress = progressManager.submitAnswer(body);
    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  progressManager.resetProgress();
  return NextResponse.json({ success: true });
}
