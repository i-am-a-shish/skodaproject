"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, User, Shield, Crown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Proper credential system with different access levels
const credentials = {
  employee: [
    { email: "ashish@skoda.com", password: "emp123", name: "Ashish Suryawanshi", team: "Training-A" },
    { email: "priya@skoda.com", password: "emp123", name: "Priya Sharma", team: "Training-A" },
    { email: "deepika@skoda.com", password: "emp123", name: "Deepika Joshi", team: "Training-A" },
  ],
  lead: [
    { email: "rajesh.kumar@skoda.com", password: "lead123", name: "Rajesh Kumar", team: "Training-A" },
    { email: "sunita.verma@skoda.com", password: "lead123", name: "Sunita Verma", team: "Training-B" },
    { email: "amit.sharma@skoda.com", password: "lead123", name: "Amit Sharma", team: "Training-C" },
  ],
  hod: [
    { email: "pradeep.singh@skoda.com", password: "hod123", name: "Pradeep Singh", department: "Training Department" },
  ],
}

interface CredentialFormProps {
  role: "employee" | "lead" | "hod"
}

export function CredentialForm({ role }: CredentialFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedCredential, setSelectedCredential] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  const roleConfig = {
    employee: {
      title: "Employee Portal",
      icon: User,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-600",
      description: "Access your dashboard, submit activities, and track progress",
    },
    lead: {
      title: "Team Lead Portal",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-600",
      description: "Manage your team, approve submissions, and monitor performance",
    },
    hod: {
      title: "HOD Portal",
      icon: Crown,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-600",
      description: "Department overview, analytics, and strategic management",
    },
  }

  const config = roleConfig[role]
  const availableCredentials = credentials[role]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const validCredential = availableCredentials.find((cred) => cred.email === email && cred.password === password)

      if (validCredential) {
        // Store authentication data
        localStorage.setItem("token", `jwt-token-${role}-${Date.now()}`)
        localStorage.setItem("userRole", role)
        localStorage.setItem("userEmail", email)
        localStorage.setItem("userName", validCredential.name)

        if (role === "employee" || role === "lead") {
          localStorage.setItem("userTeam", validCredential.team)
        }
        if (role === "hod") {
          localStorage.setItem("userDepartment", validCredential.department)
        }

        toast({
          title: "Login Successful! 🎉",
          description: `Welcome to ${config.title}, ${validCredential.name}!`,
          className: "bg-gray-800 border-gray-700 text-white",
        })

        router.push(`/${role}/dashboard`)
      } else {
        toast({
          title: "Login Failed ❌",
          description: "Invalid email or password. Please check your credentials.",
          variant: "destructive",
          className: "bg-gray-800 border-gray-700 text-white",
        })
      }
      setLoading(false)
    }, 1500)
  }

  const fillCredentials = (credential: any) => {
    setEmail(credential.email)
    setPassword(credential.password)
    setSelectedCredential(credential)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />

      <motion.div
        className="w-full max-w-4xl relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center pb-4">
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <config.icon
                  className={`w-16 h-16 mx-auto text-transparent bg-gradient-to-r ${config.color} bg-clip-text`}
                />
              </motion.div>
              <CardTitle className="text-2xl font-bold text-white">{config.title}</CardTitle>
              <p className="text-gray-400">{config.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white focus:border-green-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white focus:border-green-500 pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className={`w-full ${config.bgColor} hover:opacity-90 text-white font-semibold py-3 transition-all duration-300`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Available Credentials */}
          <Card className="bg-gray-900/80 border-gray-700 backdrop-blur-sm shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-500" />
                Available Credentials
              </CardTitle>
              <p className="text-gray-400 text-sm">Click on any credential to auto-fill the login form</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableCredentials.map((credential, index) => (
                  <motion.div
                    key={credential.email}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedCredential?.email === credential.email
                        ? `border-green-500 bg-green-500/10`
                        : "border-gray-600 bg-gray-800 hover:border-gray-500"
                    }`}
                    onClick={() => fillCredentials(credential)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{credential.name}</h3>
                        <p className="text-gray-400 text-sm">{credential.email}</p>
                        <p className="text-green-400 text-xs">
                          {role === "hod" ? credential.department : credential.team}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${config.bgColor} text-white`}>{role.toUpperCase()}</Badge>
                        <p className="text-gray-500 text-xs mt-1">Click to use</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
                <h4 className="text-white font-semibold mb-2">Quick Access Info:</h4>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>• All passwords are role-based for demo purposes</p>
                  <p>
                    • Employee: <code className="text-green-400">emp123</code>
                  </p>
                  <p>
                    • Team Lead: <code className="text-blue-400">lead123</code>
                  </p>
                  <p>
                    • HOD: <code className="text-purple-400">hod123</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            ← Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
