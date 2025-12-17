'use client'

import { useState, useEffect } from "react" // Added useEffect
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Lock, Mail, User, CheckCircle2 } from "lucide-react"

export default function UserLoginPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 1. Simulate the "Logging in" process
    setTimeout(() => {
      setLoading(false)
      setIsSuccess(true) // 2. Show the success UI
      
      // 3. Wait 2 seconds so the user can see the success message, then redirect
      setTimeout(() => {
        router.push('/') // Redirects to Home Page
      }, 2000)
    }, 1500)
  }

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-black">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-purple-900 to-black animate-gradient-xy"></div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Card className="w-[400px] backdrop-blur-sm bg-black/40 border-purple-900/20 shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              /* --- LOGIN FORM VIEW --- */
              <motion.div
                key="login-form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold tracking-tight text-white">Welcome back</CardTitle>
                  <CardDescription className="text-gray-400">Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm font-medium text-gray-300">Username</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                        <Input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="pl-10 bg-black/50 border-purple-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10 bg-black/50 border-purple-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-10 bg-black/50 border-purple-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500 transition-all duration-300"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105 focus:outline-none"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                      Don&apos;t have an account?{" "}
                      <Link href="/user/register" className="text-green-500 hover:text-green-400 transition-colors duration-300 hover:underline">
                        Register here
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </motion.div>
            ) : (
              /* --- SUCCESS MESSAGE VIEW --- */
              <motion.div
                key="success-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-12 flex flex-col items-center text-center space-y-4"
              >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                    <CheckCircle2 className="text-green-500 h-20 w-20" />
                </motion.div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Login Successful!</h2>
                    <p className="text-gray-400">Welcome back, <span className="text-green-500 font-semibold">{username}</span>.</p>
                    <p className="text-xs text-gray-500 italic mt-4">Redirecting you to home...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  )
}