import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for bookings (will reset on server restart)
let bookings: any[] = [];
let bookingIdCounter = 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { busId, routeId, arrival, seats, email, name, pricePerSeat } = body;

    // Validate input
    if (!busId || !seats || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate total price
    const totalPrice = pricePerSeat * seats;

    // Create booking
    const booking = {
      booking_id: bookingIdCounter++,
      bus_id: busId,
      route_id: routeId,
      passenger_name: name,
      passenger_email: email,
      seats_booked: seats,
      total_price: totalPrice,
      booking_date: new Date().toISOString(),
      arrival: arrival
    };

    bookings.push(booking);

    // Simulate updated available seats (mock data)
    const updatedAvailableSeats = 30 - seats; // Mock calculation

    return NextResponse.json(
      {
        message: 'Booking successful',
        booking: booking,
        totalPrice: totalPrice,
        updatedAvailableSeats: updatedAvailableSeats
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

// Get all bookings
export async function GET() {
  return NextResponse.json(bookings, { status: 200 });
}