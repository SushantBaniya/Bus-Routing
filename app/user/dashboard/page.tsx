// app/dashboard/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Bus, 
  MapPin, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  LogOut
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

type DashboardStats = {
  totalBuses: number
  activeRoutes: number
  todayBookings: number
  totalRevenue: number
  availableSeats: number
  occupancyRate: number
  recentBookings: Array<{
    booking_id: number
    passenger_name: string
    route_name: string
    seats: number
    total_price: number
    booking_date: string
  }>
}

type Route = {
  route_id: number
  route_name: string
  start_location: string
  end_location: string
  distance: number
  estimated_duration: string
}

type Bus = {
  bus_id: number
  type: string
  capacity: number
  available_seats: number
  route_name: string
  status: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState<any>(null)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [routes, setRoutes] = useState<Route[]>([])
  const [buses, setBuses] = useState<Bus[]>([])
  const [loading, setLoading] = useState(true)

  // Check authentication on mount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken')
    const adminUserData = localStorage.getItem('adminUser')

    if (!adminToken || !adminUserData) {
      // Not authenticated, redirect to login
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)
      setAdminUser(JSON.parse(adminUserData))
      fetchDashboardData()
    }
  }, [router])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Fetch stats
      const statsResponse = await fetch('/api/dashboard/stats')
      const statsData = await statsResponse.json()
      setStats(statsData)

      // Fetch routes
      const routesResponse = await fetch('/api/routes')
      const routesData = await routesResponse.json()
      setRoutes(routesData)

      // Fetch buses
      const busesResponse = await fetch('/api/buses')
      const busesData = await busesResponse.json()
      setBuses(busesData)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
  ]

  const bookingsData = [
    { day: 'Mon', bookings: 45 },
    { day: 'Tue', bookings: 52 },
    { day: 'Wed', bookings: 48 },
    { day: 'Thu', bookings: 61 },
    { day: 'Fri', bookings: 65 },
    { day: 'Sat', bookings: 72 },
    { day: 'Sun', bookings: 55 },
  ]

  const busTypeData = [
    { name: 'Express', value: 10 },
    { name: 'Deluxe', value: 8 },
    { name: 'Standard', value: 7 },
  ]

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b']

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-xl">Checking authentication...</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-zinc-400">
              Welcome back, <span className="text-green-500">{adminUser?.username}</span>
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Bus className="h-8 w-8" />}
            title="Total Buses"
            value={stats?.totalBuses || 0}
            color="bg-blue-500"
          />
          <StatCard
            icon={<MapPin className="h-8 w-8" />}
            title="Active Routes"
            value={stats?.activeRoutes || 0}
            color="bg-green-500"
          />
          <StatCard
            icon={<Users className="h-8 w-8" />}
            title="Today's Bookings"
            value={stats?.todayBookings || 0}
            color="bg-purple-500"
          />
          <StatCard
            icon={<DollarSign className="h-8 w-8" />}
            title="Total Revenue"
            value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`}
            color="bg-orange-500"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    name="Revenue (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bookings Chart */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Weekly Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="bookings" fill="#3b82f6" name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bus Distribution & Occupancy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Bus Type Distribution */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bus className="h-5 w-5 text-green-500" />
                Bus Type Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={busTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {busTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Occupancy Rate */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Occupancy Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[200px]">
                <div className="text-6xl font-bold text-green-500 mb-2">
                  {stats?.occupancyRate || 0}%
                </div>
                <p className="text-zinc-400">Average occupancy</p>
                <div className="w-full bg-zinc-800 rounded-full h-4 mt-4">
                  <div 
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${stats?.occupancyRate || 0}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Seats */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Available Seats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[200px]">
                <div className="text-6xl font-bold text-blue-500 mb-2">
                  {stats?.availableSeats || 0}
                </div>
                <p className="text-zinc-400">Seats available today</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Routes & Buses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Active Routes */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-500" />
                Active Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {routes.map((route) => (
                  <div 
                    key={route.route_id}
                    className="bg-zinc-800 p-4 rounded-lg"
                  >
                    <h3 className="font-semibold text-white">{route.route_name}</h3>
                    <p className="text-sm text-zinc-400">{route.distance} km • {route.estimated_duration}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bus Fleet */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bus className="h-5 w-5 text-blue-500" />
                Bus Fleet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {buses.slice(0, 5).map((bus) => (
                  <div 
                    key={bus.bus_id}
                    className="bg-zinc-800 p-4 rounded-lg"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-white">Bus #{bus.bus_id} - {bus.type}</h3>
                        <p className="text-sm text-zinc-400">{bus.route_name}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        bus.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}>
                        {bus.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-500" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 px-4 text-zinc-400">ID</th>
                    <th className="text-left py-3 px-4 text-zinc-400">Passenger</th>
                    <th className="text-left py-3 px-4 text-zinc-400">Route</th>
                    <th className="text-left py-3 px-4 text-zinc-400">Seats</th>
                    <th className="text-left py-3 px-4 text-zinc-400">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentBookings.map((booking) => (
                    <tr key={booking.booking_id} className="border-b border-zinc-800">
                      <td className="py-3 px-4 text-white">#{booking.booking_id}</td>
                      <td className="py-3 px-4 text-white">{booking.passenger_name}</td>
                      <td className="py-3 px-4 text-zinc-400">{booking.route_name}</td>
                      <td className="py-3 px-4 text-white">{booking.seats}</td>
                      <td className="py-3 px-4 text-green-500">₹{booking.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ 
  icon, 
  title, 
  value, 
  color 
}: { 
  icon: React.ReactNode
  title: string
  value: string | number
  color: string
}) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-400 text-sm mb-1">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
          <div className={`${color} p-3 rounded-lg`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}