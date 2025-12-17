import { NextResponse } from 'next/server';

const mockRoutes = [
  {
    route_id: 1,
    route_name: "Kathmandu - Pokhara",
    start_location: "Kathmandu",
    end_location: "Pokhara",
    distance: 200,
    estimated_duration: "6 hours"
  },
  {
    route_id: 2,
    route_name: "Kathmandu - Chitwan",
    start_location: "Kathmandu",
    end_location: "Chitwan",
    distance: 146,
    estimated_duration: "5 hours"
  },
  {
    route_id: 3,
    route_name: "Pokhara - Chitwan",
    start_location: "Pokhara",
    end_location: "Chitwan",
    distance: 120,
    estimated_duration: "4 hours"
  },
  {
    route_id: 4,
    route_name: "Kathmandu - Butwal",
    start_location: "Kathmandu",
    end_location: "Butwal",
    distance: 275,
    estimated_duration: "7 hours"
  },
  {
    route_id: 5,
    route_name: "Kathmandu - Biratnagar",
    start_location: "Kathmandu",
    end_location: "Biratnagar",
    distance: 540,
    estimated_duration: "12 hours"
  }
];

export async function GET() {
  return NextResponse.json(mockRoutes, { status: 200 });
}