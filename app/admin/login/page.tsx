'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2 } from "lucide-react"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("=== LOGIN ATTEMPT ===")
    console.log("Username:", username)
    console.log("Password:", password)
    
    setLoading(true)
    setError("")

    // Simple credential check
    if (username === "admin" && password === "admin123") {
      console.log("✅ Credentials valid!")
      
      // Save to localStorage
      try {
        localStorage.setItem('adminToken', 'mock-admin-token-12345')
        localStorage.setItem('adminUser', JSON.stringify({
          username: username,
          role: 'admin',
          loginTime: new Date().toISOString()
        }))
        console.log("✅ Saved to localStorage")
      } catch (err) {
        console.error("❌ localStorage error:", err)
      }
      
      setLoading(false)
      setIsSuccess(true)
      
      console.log("⏳ Waiting 2 seconds before redirect...")
      
      // Redirect after 2 seconds
      setTimeout(() => {
        console.log("🔄 Redirecting to /dashboard")
       router.push('/user/dashboard')
      }, 2000)
      
    } else {
      console.log("❌ Invalid credentials")
      setLoading(false)
      setError("Invalid username or password. Try admin/admin123")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-black animate-gradient-xy"></div>
      <Card className="w-[400px] relative z-10 backdrop-blur-sm bg-black/40 border-purple-900/20 shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }}>
              <CardHeader>
                <CardTitle className="text-white text-2xl font-bold">Admin Login</CardTitle>
                <CardDescription className="text-gray-400">System Access Only</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Admin Username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      required 
                      className="bg-black/50 border-purple-900/50 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Input 
                      type="password" 
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                      className="bg-black/50 border-purple-900/50 text-white placeholder:text-gray-500"
                    />
                  </div>
                  
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm"
                    >
                      {error}
                    </motion.p>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                        Authenticating...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>

                {/* Test Credentials Display */}
                <div className="mt-6 p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                  <p className="text-xs text-zinc-400 mb-2">Test Credentials:</p>
                  <p className="text-xs text-green-500">Username: admin</p>
                  <p className="text-xs text-green-500">Password: admin123</p>
                </div>

                {/* Debug Info */}
                <div className="mt-4 p-2 bg-blue-900/20 rounded text-xs text-blue-300">
                  <p>Check browser console (F12) for debug logs</p>
                </div>
              </CardContent>
            </motion.div>
          ) : (
            <motion.div 
              key="success" 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="p-12 text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="text-green-500 h-16 w-16 mx-auto" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white">Access Granted</h2>
              <p className="text-gray-400 italic text-sm">Redirecting to Dashboard...</p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              </div>
              
              {/* Manual redirect button as backup */}
              <Button
                onClick={() => {
                  console.log("🔘 Manual redirect button clicked")
                  router.push('/dashboard')
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700"
              >
                Go to Dashboard Now
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}