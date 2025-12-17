// app/api/buses/route.ts
import { NextResponse } from 'next/server';

const mockBuses = [
  {
    bus_id: 1,
    type: "Express",
    capacity: 40,
    available_seats: 35,
    route_name: "Kathmandu - Pokhara",
    status: "active",
    registration_number: "BA-1-PA-1234",
    driver_name: "Ram Sharma"
  },
  {
    bus_id: 2,
    type: "Deluxe",
    capacity: 30,
    available_seats: 25,
    route_name: "Kathmandu - Pokhara",
    status: "active",
    registration_number: "BA-1-PA-5678",
    driver_name: "Shyam Thapa"
  },
  {
    bus_id: 3,
    type: "Standard",
    capacity: 50,
    available_seats: 40,
    route_name: "Kathmandu - Chitwan",
    status: "active",
    registration_number: "BA-2-CHA-9012",
    driver_name: "Hari Gurung"
  },
  {
    bus_id: 4,
    type: "Express",
    capacity: 40,
    available_seats: 38,
    route_name: "Pokhara - Chitwan",
    status: "active",
    registration_number: "BA-3-KHA-3456",
    driver_name: "Krishna Rai"
  },
  {
    bus_id: 5,
    type: "Deluxe",
    capacity: 30,
    available_seats: 0,
    route_name: "Kathmandu - Butwal",
    status: "maintenance",
    registration_number: "BA-1-PA-7890",
    driver_name: "Gopal Magar"
  },
  {
    bus_id: 6,
    type: "Standard",
    capacity: 50,
    available_seats: 45,
    route_name: "Kathmandu - Biratnagar",
    status: "active",
    registration_number: "BA-1-KHA-2345",
    driver_name: "Bikash Limbu"
  },
  {
    bus_id: 7,
    type: "Express",
    capacity: 40,
    available_seats: 32,
    route_name: "Kathmandu - Janakpur",
    status: "active",
    registration_number: "BA-1-JA-6789",
    driver_name: "Ramesh Yadav"
  },
  {
    bus_id: 8,
    type: "Deluxe",
    capacity: 30,
    available_seats: 22,
    route_name: "Pokhara - Butwal",
    status: "active",
    registration_number: "BA-3-KHA-0123",
    driver_name: "Suresh Poudel"
  }
];

export async function GET() {
  try {
    return NextResponse.json(mockBuses, { status: 200 });
  } catch (error) {
    console.error('Error fetching buses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch buses' },
      { status: 500 }
    );
  }
}

// POST - Add new bus
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBus = {
      bus_id: mockBuses.length + 1,
      ...body,
      status: "active",
      available_seats: body.capacity
    };
    
    mockBuses.push(newBus);
    
    return NextResponse.json(
      { message: 'Bus added successfully', bus: newBus },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding bus:', error);
    return NextResponse.json(
      { error: 'Failed to add bus' },
      { status: 500 }
    );
  }
}