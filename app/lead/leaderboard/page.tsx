"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Search, TrendingUp, TrendingDown, Crown, Medal, Award } from "lucide-react"
import { LeadLayout } from "@/components/layouts/lead-layout"

const departmentLeaderboard = [
  {
    rank: 1,
    name: "Ashish Suryawanshi",
    team: "Training-A",
    points: 4300,
    change: "+2",
    avatar: "AS",
    badge: "🏆",
    isMyTeam: true,
  },
  {
    rank: 2,
    name: "Priya Sharma",
    team: "Training-A",
    points: 4100,
    change: "0",
    avatar: "PS",
    badge: "🥈",
    isMyTeam: true,
  },
  {
    rank: 3,
    name: "Rahul Kumar",
    team: "Training-B",
    points: 3950,
    change: "+1",
    avatar: "RK",
    badge: "🥉",
    isMyTeam: false,
  },
  {
    rank: 4,
    name: "Sneha Patel",
    team: "Training-C",
    points: 3800,
    change: "-2",
    avatar: "SP",
    badge: "⭐",
    isMyTeam: false,
  },
  {
    rank: 5,
    name: "Amit Singh",
    team: "Training-D",
    points: 3650,
    change: "+1",
    avatar: "AS",
    badge: "⭐",
    isMyTeam: false,
  },
  {
    rank: 6,
    name: "Deepika Joshi",
    team: "Training-A",
    points: 3200,
    change: "+3",
    avatar: "DJ",
    badge: "⭐",
    isMyTeam: true,
  },
  {
    rank: 7,
    name: "Ravi Mehta",
    team: "Training-B",
    points: 3500,
    change: "-1",
    avatar: "RM",
    badge: "⭐",
    isMyTeam: false,
  },
  {
    rank: 8,
    name: "Kavya Reddy",
    team: "Training-C",
    points: 3400,
    change: "+2",
    avatar: "KR",
    badge: "⭐",
    isMyTeam: false,
  },
  {
    rank: 9,
    name: "Arjun Nair",
    team: "Training-D",
    points: 3300,
    change: "0",
    avatar: "AN",
    badge: "⭐",
    isMyTeam: false,
  },
  {
    rank: 10,
    name: "Vikram Gupta",
    team: "Training-E",
    points: 3100,
    change: "-3",
    avatar: "VG",
    badge: "⭐",
    isMyTeam: false,
  },
]

const teamStats = {
  myTeamRank: 1,
  myTeamAvgPoints: 3867,
  myTeamMembers: departmentLeaderboard.filter((member) => member.isMyTeam),
  totalTeams: 5,
  myTeamInTop10: departmentLeaderboard.filter((member) => member.isMyTeam && member.rank <= 10).length,
}

export default function LeadLeaderboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [teamFilter, setTeamFilter] = useState("all")
  const [viewMode, setViewMode] = useState("department") // department, myteam

  const filteredLeaderboard = departmentLeaderboard.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (teamFilter === "all" || member.team === teamFilter) &&
      (viewMode === "department" || (viewMode === "myteam" && member.isMyTeam)),
  )

  return (
    <LeadLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800 border-0 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    <Trophy className="w-8 h-8 mr-3" />
                    Department Leaderboard
                  </h1>
                  <p className="text-yellow-100 text-lg">Track performance across all teams and departments</p>
                  <div className="flex items-center space-x-6 mt-4">
                    <div className="flex items-center">
                      <Crown className="w-5 h-5 mr-2" />
                      <span>My Team Rank: #{teamStats.myTeamRank}</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      <span>Team Avg: {teamStats.myTeamAvgPoints}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      <span>{teamStats.myTeamInTop10}/3 in Top 10</span>
                    </div>
                  </div>
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

        {/* Team Performance Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            { title: "My Team Rank", value: `#${teamStats.myTeamRank}`, icon: Crown, color: "text-yellow-500" },
            { title: "Team Average", value: teamStats.myTeamAvgPoints, icon: TrendingUp, color: "text-green-500" },
            { title: "Team in Top 10", value: `${teamStats.myTeamInTop10}/3`, icon: Medal, color: "text-blue-500" },
            { title: "Total Teams", value: teamStats.totalTeams, icon: Trophy, color: "text-purple-500" },
          ].map((stat, index) => (
            <Card
              key={stat.title}
              className="bg-gray-900 border-gray-700 hover:border-yellow-500 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Filters and View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode("department")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === "department"
                        ? "bg-yellow-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    Department View
                  </button>
                  <button
                    onClick={() => setViewMode("myteam")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      viewMode === "myteam" ? "bg-yellow-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    My Team Only
                  </button>
                </div>
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
                <Select value={teamFilter} onValueChange={setTeamFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-full md:w-48">
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
            </CardContent>
          </Card>
        </motion.div>

        {/* Top 3 Podium */}
        {viewMode === "department" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
                  } border-0 text-white transform hover:scale-105 transition-transform ${
                    member.isMyTeam ? "ring-4 ring-green-400" : ""
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{member.badge}</div>
                    <Avatar className="w-16 h-16 mx-auto mb-4 border-4 border-white/30">
                      <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg mb-2">{member.name}</h3>
                    <p className="text-white/80 mb-2">{member.team}</p>
                    {member.isMyTeam && <Badge className="bg-green-500 text-white mb-2">My Team</Badge>}
                    <p className="text-2xl font-bold">{member.points.toLocaleString()}</p>
                    <p className="text-white/80 text-sm">points</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                {viewMode === "department" ? "Complete Rankings" : "My Team Rankings"}
                <span className="text-gray-400 text-base font-normal ml-2">({filteredLeaderboard.length} members)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLeaderboard.map((member, index) => (
                  <motion.div
                    key={member.name}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all hover:scale-[1.02] ${
                      member.isMyTeam
                        ? "bg-gradient-to-r from-green-800/50 to-green-700/50 border border-green-500/50"
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
                      <Avatar className="w-12 h-12 border-2 border-yellow-500">
                        <AvatarFallback className="bg-yellow-600 text-white font-bold">{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-white font-semibold text-lg">{member.name}</h4>
                        <div className="flex items-center space-x-2">
                          <p className="text-gray-400">{member.team}</p>
                          {member.isMyTeam && <Badge className="bg-green-500 text-white text-xs">My Team</Badge>}
                        </div>
                      </div>
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
    </LeadLayout>
  )
}
