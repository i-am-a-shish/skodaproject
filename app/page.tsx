"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleRoleLogin = (role: string) => {
    setLoading(true)
    setTimeout(() => {
      router.push(`/login/${role}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(34,197,94,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(34,197,94,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(34,197,94,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="relative w-32 h-32 mx-auto mb-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">Š</span>
                </div>
              </motion.div>
              <motion.h1
                className="text-4xl font-bold text-green-400 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                ŠKODA
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Leaderboard System
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/80 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <p className="text-green-400 text-lg">Initializing...</p>
          </div>
        </motion.div>
      )}

      {!showWelcome && (
        <motion.div
          className="relative z-10 min-h-screen flex items-center justify-center p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-4xl w-full">
            <motion.div
              className="text-center mb-12"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center shadow-2xl">
                  <span className="text-3xl font-bold text-black">Š</span>
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                ŠKODA <span className="text-green-400">Leaderboard</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Track performance, celebrate achievements, and drive excellence in our training programs
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {[
                {
                  role: "employee",
                  title: "Employee Portal",
                  description: "Track your progress, submit certifications, and view your ranking",
                  icon: "👨‍💼",
                  gradient: "from-green-500 to-green-600",
                },
                {
                  role: "lead",
                  title: "Team Lead Portal",
                  description: "Manage your team, approve submissions, and monitor performance",
                  icon: "👨‍💻",
                  gradient: "from-green-600 to-green-700",
                },
                {
                  role: "hod",
                  title: "HOD Portal",
                  description: "Department overview, system configuration, and strategic insights",
                  icon: "👨‍💼",
                  gradient: "from-green-700 to-green-800",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.role}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                >
                  <Card className="bg-gray-900/50 border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 backdrop-blur-sm group cursor-pointer">
                    <div className="p-8 text-center">
                      <motion.div
                        className="text-6xl mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">{item.description}</p>
                      <Button
                        onClick={() => handleRoleLogin(item.role)}
                        className={`w-full bg-gradient-to-r ${item.gradient} hover:shadow-lg hover:shadow-green-500/30 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105`}
                        disabled={loading}
                      >
                        Login as {item.title.split(" ")[0]}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <p className="text-gray-500 text-sm">
                © 2025 ŠKODA Auto. All rights reserved. | Internal Training System
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
