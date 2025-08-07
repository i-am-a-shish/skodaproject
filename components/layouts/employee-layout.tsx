"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Home, Trophy, User, Bell, LogOut, Menu, X, FileText, Award } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const navigation = [
  { name: "Dashboard", href: "/employee/dashboard", icon: Home },
  { name: "Leaderboard", href: "/employee/leaderboard", icon: Trophy },
  { name: "Submissions", href: "/employee/submissions", icon: FileText },
  { name: "Badges", href: "/employee/badges", icon: Award },
  { name: "Profile", href: "/employee/profile", icon: User },
  { name: "Notifications", href: "/employee/notifications", icon: Bell },
]

export function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      className: "bg-gray-800 border-gray-700 text-white",
    })
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold">Š</span>
              </div>
              <span className="text-white font-bold text-lg">ŠKODA</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive ? "bg-green-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                  {item.name === "Notifications" && <Badge className="ml-auto bg-red-500 text-white text-xs">3</Badge>}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="border-t border-gray-700 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-green-600 text-white">AS</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-white text-sm font-medium">Ashish S.</p>
                      <p className="text-gray-400 text-xs">Employee</p>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-800 border-gray-700 w-56">
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-gray-700">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
          <div className="flex h-16 items-center justify-between px-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-4">
              <Badge className="bg-green-600 text-white">Rank #5</Badge>
              <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                4,300 pts
              </Badge>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
