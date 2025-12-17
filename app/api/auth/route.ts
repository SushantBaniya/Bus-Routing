import { NextRequest, NextResponse } from 'next/server';

// Mock users
const mockUsers = [
  {
    user_id: 1,
    username: "admin",
    email: "admin@busrouting.com",
    password: "admin123",
    role: "admin"
  },
  {
    user_id: 2,
    username: "user",
    email: "user@busrouting.com",
    password: "user123",
    role: "user"
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Find user
    const user = mockUsers.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: 'Login successful',
        user: userWithoutPassword,
        token: `mock-token-${user.user_id}` // Mock token
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}