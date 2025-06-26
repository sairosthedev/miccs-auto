"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Dummy authentication logic
      const credentials = {
        // Admin accounts
        "admin@miccsauto.com": { password: "admin123", role: "admin", redirect: "/admin/dashboard" },
        "john.admin@miccsauto.com": { password: "password123", role: "admin", redirect: "/admin/dashboard" },

        // Sales Agent accounts
        "agent@miccsauto.com": { password: "agent123", role: "sales_agent", redirect: "/agent/dashboard" },
        "sarah.agent@miccsauto.com": { password: "sales456", role: "sales_agent", redirect: "/agent/dashboard" },
        "mike.sales@miccsauto.com": { password: "mike789", role: "sales_agent", redirect: "/agent/dashboard" },

        // Customer accounts
        "customer@miccsauto.com": { password: "customer123", role: "customer", redirect: "/customer/dashboard" },
        "jane.doe@example.com": { password: "jane123", role: "customer", redirect: "/customer/dashboard" },
        "robert.smith@gmail.com": { password: "robert456", role: "customer", redirect: "/customer/dashboard" },
        "emily.johnson@yahoo.com": { password: "emily789", role: "customer", redirect: "/customer/dashboard" },
      }

      const user = credentials[formData.email as keyof typeof credentials]

      if (user && user.password === formData.password) {
        // Store user info in localStorage (for demo purposes)
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            role: user.role,
            isAuthenticated: true,
          }),
        )

        // Redirect based on role
        window.location.href = user.redirect
      } else {
        setError("Invalid email or password. Please check the demo credentials below.")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-yellow-400 transition-colors mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image src="/miccs-auto-logo.png" alt="Miccs Auto Logo" width={120} height={60} className="h-12 w-auto" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">Sign in to your Miccs Auto account</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert className="border-red-600 bg-red-600/10">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center text-sm text-gray-400">
                {"Don't have an account? "}
                <Link href="/auth/register" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-sm text-yellow-400">Demo Login Credentials</CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Use these credentials to test different user roles
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xs text-gray-400 space-y-3">
            <div>
              <div className="text-red-400 font-semibold mb-1">👑 ADMIN ACCOUNTS</div>
              <div className="ml-2 space-y-1">
                <div>
                  <strong>Email:</strong> admin@miccsauto.com
                </div>
                <div>
                  <strong>Password:</strong> admin123
                </div>
                <div className="border-t border-gray-800 pt-1 mt-1">
                  <div>
                    <strong>Email:</strong> john.admin@miccsauto.com
                  </div>
                  <div>
                    <strong>Password:</strong> password123
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-yellow-400 font-semibold mb-1">🤝 SALES AGENT ACCOUNTS</div>
              <div className="ml-2 space-y-1">
                <div>
                  <strong>Email:</strong> agent@miccsauto.com
                </div>
                <div>
                  <strong>Password:</strong> agent123
                </div>
                <div className="border-t border-gray-800 pt-1 mt-1">
                  <div>
                    <strong>Email:</strong> sarah.agent@miccsauto.com
                  </div>
                  <div>
                    <strong>Password:</strong> sales456
                  </div>
                </div>
                <div className="border-t border-gray-800 pt-1 mt-1">
                  <div>
                    <strong>Email:</strong> mike.sales@miccsauto.com
                  </div>
                  <div>
                    <strong>Password:</strong> mike789
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-green-400 font-semibold mb-1">👤 CUSTOMER ACCOUNTS</div>
              <div className="ml-2 space-y-1">
                <div>
                  <strong>Email:</strong> customer@miccsauto.com
                </div>
                <div>
                  <strong>Password:</strong> customer123
                </div>
                <div className="border-t border-gray-800 pt-1 mt-1">
                  <div>
                    <strong>Email:</strong> jane.doe@example.com
                  </div>
                  <div>
                    <strong>Password:</strong> jane123
                  </div>
                </div>
                <div className="border-t border-gray-800 pt-1 mt-1">
                  <div>
                    <strong>Email:</strong> robert.smith@gmail.com
                  </div>
                  <div>
                    <strong>Password:</strong> robert456
                  </div>
                </div>
                <div className="border-t border-gray-800 pt-1 mt-1">
                  <div>
                    <strong>Email:</strong> emily.johnson@yahoo.com
                  </div>
                  <div>
                    <strong>Password:</strong> emily789
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
