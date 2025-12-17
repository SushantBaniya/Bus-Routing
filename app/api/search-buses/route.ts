import { NextRequest, NextResponse } from 'next/server';

// Mock bus data
const mockBuses = [
  {
    bus_id: 1,
    type: "Express",
    price: 500,
    capacity: 40,
    departure: "2024-12-18T08:00:00Z",
    arrival: "2024-12-18T14:00:00Z",
    route_name: "Kathmandu - Pokhara",
    available_seats: 35,
    route_id: 1
  },
  {
    bus_id: 2,
    type: "Deluxe",
    price: 800,
    capacity: 30,
    departure: "2024-12-18T09:00:00Z",
    arrival: "2024-12-18T15:00:00Z",
    route_name: "Kathmandu - Pokhara",
    available_seats: 25,
    route_id: 1
  },
  {
    bus_id: 3,
    type: "Standard",
    price: 350,
    capacity: 50,
    departure: "2024-12-18T10:00:00Z",
    arrival: "2024-12-18T16:30:00Z",
    route_name: "Kathmandu - Chitwan",
    available_seats: 40,
    route_id: 2
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date');

    console.log('Search params:', { source, destination, date });

    // Filter buses based on route (simplified matching)
    const filteredBuses = mockBuses.filter(bus => {
      const routeMatch = bus.route_name.toLowerCase().includes(source?.toLowerCase() || '') ||
                        bus.route_name.toLowerCase().includes(destination?.toLowerCase() || '');
      return routeMatch;
    });

    // If no matches, return all buses for demo purposes
    const results = filteredBuses.length > 0 ? filteredBuses : mockBuses;

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Error in search-buses:', error);
    return NextResponse.json(
      { error: 'Failed to search buses' },
      { status: 500 }
    );
  }
}