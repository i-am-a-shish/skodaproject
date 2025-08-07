"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trophy, Search, TrendingUp, TrendingDown } from "lucide-react"
import { EmployeeLayout } from "@/components/layouts/employee-layout"

const globalLeaderboard = [
  { rank: 1, name: "Ashish Suryawanshi", team: "Training-A", points: 4300, change: "+2", avatar: "AS", badge: "🏆" },
  { rank: 2, name: "Priya Sharma", team: "Training-A", points: 4100, change: "0", avatar: "PS", badge: "🥈" },
  { rank: 3, name: "Rahul Kumar", team: "Training-B", points: 3950, change: "+1", avatar: "RK", badge: "🥉" },
  { rank: 4, name: "Sneha Patel", team: "Training-C", points: 3800, change: "-2", avatar: "SP", badge: "⭐" },
  { rank: 5, name: "Amit Singh", team: "Training-A", points: 3650, change: "+1", avatar: "AS", badge: "⭐" },
  { rank: 6, name: "Ravi Mehta", team: "Training-B", points: 3500, change: "+3", avatar: "RM", badge: "⭐" },
  { rank: 7, name: "Kavya Reddy", team: "Training-C", points: 3400, change: "-1", avatar: "KR", badge: "⭐" },
  { rank: 8, name: "Arjun Nair", team: "Training-D", points: 3300, change: "+2", avatar: "AN", badge: "⭐" },
  { rank: 9, name: "Deepika Joshi", team: "Training-A", points: 3200, change: "0", avatar: "DJ", badge: "⭐" },
  { rank: 10, name: "Vikram Gupta", team: "Training-E", points: 3100, change: "-3", avatar: "VG", badge: "⭐" },
]

export default function EmployeeLeaderboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("all")

  const filteredLeaderboard = globalLeaderboard.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTeam === "all" || member.team === selectedTeam),
  )

  return (
    <EmployeeLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 border-0 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    <Trophy className="w-8 h-8 mr-3" />
                    Global Leaderboard
                  </h1>
                  <p className="text-green-100 text-lg">See how you rank against all employees across departments</p>
                </div>
                <motion.div
                  className="text-8xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  🏆
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name..."
                      className="bg-gray-800 border-gray-600 text-white pl-10"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Filter by team" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="all">All Teams</SelectItem>
                      <SelectItem value="Training-A">Training-A</SelectItem>
                      <SelectItem value="Training-B">Training-B</SelectItem>
                      <SelectItem value="Training-C">Training-C</SelectItem>
                      <SelectItem value="Training-D">Training-D</SelectItem>
                      <SelectItem value="Training-E">Training-E</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {filteredLeaderboard.slice(0, 3).map((member, index) => (
              <Card
                key={member.name}
                className={`bg-gradient-to-br ${
                  index === 0
                    ? "from-yellow-500 to-yellow-600"
                    : index === 1
                      ? "from-gray-400 to-gray-500"
                      : "from-orange-500 to-orange-600"
                } border-0 text-white transform hover:scale-105 transition-transform`}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{member.badge}</div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{member.avatar}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{member.name}</h3>
                  <p className="text-white/80 mb-2">{member.team}</p>
                  <p className="text-2xl font-bold">{member.points.toLocaleString()}</p>
                  <p className="text-white/80 text-sm">points</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Complete Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLeaderboard.map((member, index) => (
                  <motion.div
                    key={member.name}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all hover:scale-[1.02] ${
                      member.name === "Ashish Suryawanshi"
                        ? "bg-gradient-to-r from-green-800 to-green-700 border border-green-500"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          member.rank === 1
                            ? "bg-yellow-500 text-black"
                            : member.rank === 2
                              ? "bg-gray-400 text-black"
                              : member.rank === 3
                                ? "bg-orange-500 text-black"
                                : "bg-gray-600 text-white"
                        }`}
                      >
                        {member.rank}
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{member.avatar}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">{member.name}</h4>
                        <p className="text-gray-400">{member.team}</p>
                      </div>
                      {member.name === "Ashish Suryawanshi" && <Badge className="bg-green-500 text-white">You</Badge>}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-green-400 font-bold text-xl">{member.points.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">points</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {member.change !== "0" && (
                          <div
                            className={`flex items-center ${
                              member.change.startsWith("+") ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {member.change.startsWith("+") ? (
                              <TrendingUp className="w-4 h-4 mr-1" />
                            ) : (
                              <TrendingDown className="w-4 h-4 mr-1" />
                            )}
                          </div>
                        )}
                        <Badge
                          variant={
                            member.change.startsWith("+")
                              ? "default"
                              : member.change === "0"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            member.change.startsWith("+")
                              ? "bg-green-600"
                              : member.change === "0"
                                ? "bg-gray-600"
                                : "bg-red-600"
                          }
                        >
                          {member.change === "0" ? "—" : member.change}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </EmployeeLayout>
  )
}
