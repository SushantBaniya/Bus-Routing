import { NextRequest, NextResponse } from 'next/server';

// Mock stops data
const mockStops = [
  { stop_id: 1, stop_name: "Kathmandu" },
  { stop_id: 2, stop_name: "Pokhara" },
  { stop_id: 3, stop_name: "Chitwan" },
  { stop_id: 4, stop_name: "Butwal" },
  { stop_id: 5, stop_name: "Biratnagar" },
  { stop_id: 6, stop_name: "Janakpur" },
  { stop_id: 7, stop_name: "Dharan" },
  { stop_id: 8, stop_name: "Hetauda" },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const term = searchParams.get('term') || '';

    // Filter stops based on search term
    const filteredStops = mockStops.filter(stop =>
      stop.stop_name.toLowerCase().includes(term.toLowerCase())
    );

    return NextResponse.json(filteredStops, { status: 200 });
  } catch (error) {
    console.error('Error in stops:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stops' },
      { status: 500 }
    );
  }
}