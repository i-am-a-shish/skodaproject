"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Award, Search, Download, TrendingUp, TrendingDown, Minus, Crown, Medal, Trophy } from "lucide-react"
import { HodLayout } from "@/components/layouts/hod-layout"
import { useToast } from "@/hooks/use-toast"

// Enhanced leaderboard data
const leaderboardData = {
  globalLeaderboard: [
    {
      rank: 1,
      name: "Ashish Suryawanshi",
      team: "Training-A",
      points: 4300,
      change: "+2",
      avatar: "AS",
      monthlyGrowth: 15.2,
      badges: ["Top Performer", "Innovation Leader"],
      lastActivity: "2025-01-16",
    },
    {
      rank: 2,
      name: "Priya Sharma",
      team: "Training-A",
      points: 4100,
      change: "0",
      avatar: "PS",
      monthlyGrowth: 8.5,
      badges: ["Consistent Performer"],
      lastActivity: "2025-01-15",
    },
    {
      rank: 3,
      name: "Rahul Kumar",
      team: "Training-B",
      points: 3950,
      change: "+1",
      avatar: "RK",
      monthlyGrowth: 12.8,
      badges: ["Rising Star"],
      lastActivity: "2025-01-16",
    },
    {
      rank: 4,
      name: "Sneha Patel",
      team: "Training-C",
      points: 3800,
      change: "-2",
      avatar: "SP",
      monthlyGrowth: -2.1,
      badges: ["Team Player"],
      lastActivity: "2025-01-14",
    },
    {
      rank: 5,
      name: "Amit Singh",
      team: "Training-A",
      points: 3650,
      change: "+1",
      avatar: "AS",
      monthlyGrowth: 6.7,
      badges: ["Dedicated Learner"],
      lastActivity: "2025-01-15",
    },
    {
      rank: 6,
      name: "Deepika Joshi",
      team: "Training-D",
      points: 3500,
      change: "+3",
      avatar: "DJ",
      monthlyGrowth: 18.9,
      badges: ["Fast Climber"],
      lastActivity: "2025-01-16",
    },
    {
      rank: 7,
      name: "Vikash Singh",
      team: "Training-E",
      points: 3400,
      change: "-1",
      avatar: "VS",
      monthlyGrowth: -1.5,
      badges: ["Experienced"],
      lastActivity: "2025-01-13",
    },
    {
      rank: 8,
      name: "Sunita Verma",
      team: "Training-B",
      points: 3300,
      change: "+2",
      avatar: "SV",
      monthlyGrowth: 9.2,
      badges: ["Quality Focus"],
      lastActivity: "2025-01-15",
    },
  ],
  teamLeaderboard: [
    {
      rank: 1,
      team: "Training-A",
      avgScore: 4200,
      members: 12,
      change: "+1",
      totalPoints: 50400,
      topPerformer: "Ashish Suryawanshi",
      growth: 12.5,
    },
    {
      rank: 2,
      team: "Training-B",
      avgScore: 3950,
      members: 15,
      change: "0",
      totalPoints: 59250,
      topPerformer: "Rahul Kumar",
      growth: 8.2,
    },
    {
      rank: 3,
      team: "Training-C",
      avgScore: 3800,
      members: 11,
      change: "-1",
      totalPoints: 41800,
      topPerformer: "Sneha Patel",
      growth: 5.1,
    },
    {
      rank: 4,
      team: "Training-D",
      avgScore: 3650,
      members: 13,
      change: "+2",
      totalPoints: 47450,
      topPerformer: "Deepika Joshi",
      growth: 15.8,
    },
    {
      rank: 5,
      team: "Training-E",
      avgScore: 3500,
      members: 14,
      change: "-1",
      totalPoints: 49000,
      topPerformer: "Vikash Singh",
      growth: 2.3,
    },
  ],
  departmentStats: {
    totalEmployees: 65,
    avgDepartmentScore: 3780,
    topTeam: "Training-A",
    monthlyGrowth: 9.8,
    totalPoints: 245900,
  },
}

export default function HodLeaderboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const [viewMode, setViewMode] = useState("detailed")
  const { toast } = useToast()

  const filteredGlobalLeaderboard = leaderboardData.globalLeaderboard.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTeam === "all" || member.team === selectedTeam),
  )

  const handleExportPDF = () => {
    toast({
      title: "📊 Export Started",
      description: "Your leaderboard report is being generated and will be downloaded shortly.",
      className: "bg-gray-800 border-green-500 text-white",
    })
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Trophy className="w-6 h-6 text-orange-500" />
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">{rank}</div>
    }
  }

  const getChangeIcon = (change: string) => {
    if (change.startsWith("+")) {
      return <TrendingUp className="w-4 h-4 text-green-500" />
    } else if (change.startsWith("-")) {
      return <TrendingDown className="w-4 h-4 text-red-500" />
    } else {
      return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 10) return "text-green-400"
    if (growth > 0) return "text-green-300"
    if (growth < 0) return "text-red-400"
    return "text-gray-400"
  }

  return (
    <HodLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-yellow-600 via-yellow-700 to-orange-600 border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-transparent" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-3 flex items-center">
                    <Award className="w-10 h-10 mr-4" />
                    Department Leaderboard
                  </h1>
                  <p className="text-yellow-100 text-xl mb-6">
                    Track performance, celebrate achievements, and drive excellence across all teams
                  </p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Trophy className="w-5 h-5 mr-2" />
                      <span className="font-bold">{leaderboardData.departmentStats.totalEmployees} Employees</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      <span className="font-bold">Avg: {leaderboardData.departmentStats.avgDepartmentScore}</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Crown className="w-5 h-5 mr-2" />
                      <span className="font-bold">Top: {leaderboardData.departmentStats.topTeam}</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="text-9xl opacity-30"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  🏆
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <div className="flex-1">
                    <Label htmlFor="search" className="text-gray-300 font-medium">
                      Search Employee
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name..."
                        className="bg-gray-800 border-gray-600 text-white pl-10 font-medium"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="team-filter" className="text-gray-300 font-medium">
                      Filter by Team
                    </Label>
                    <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white font-medium">
                        <SelectValue placeholder="Select team" />
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
                  <div className="flex-1">
                    <Label htmlFor="period-filter" className="text-gray-300 font-medium">
                      Time Period
                    </Label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white font-medium">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="current">Current Month</SelectItem>
                        <SelectItem value="last3">Last 3 Months</SelectItem>
                        <SelectItem value="last6">Last 6 Months</SelectItem>
                        <SelectItem value="yearly">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Select value={viewMode} onValueChange={setViewMode}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-32 font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleExportPDF} className="bg-yellow-600 hover:bg-yellow-700 font-bold">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Leaderboard Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="individual" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700 p-1 h-auto">
              <TabsTrigger
                value="individual"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                👤 Individual Leaderboard
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                👥 Team Leaderboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <Award className="w-6 h-6 mr-3 text-yellow-500" />
                    Individual Performance Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredGlobalLeaderboard.map((member, index) => (
                      <motion.div
                        key={member.name}
                        className={`p-6 rounded-xl transition-all duration-300 border ${
                          member.rank <= 3
                            ? "bg-gradient-to-r from-gray-800 to-gray-700 border-yellow-500/50 shadow-lg shadow-yellow-500/10"
                            : "bg-gray-800 border-gray-700 hover:border-yellow-500/30"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01, y: -2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            {/* Rank */}
                            <div className="flex items-center space-x-3">
                              {getRankIcon(member.rank)}
                              <div className="text-center">
                                <div className="text-2xl font-bold text-white">#{member.rank}</div>
                                <div className="flex items-center space-x-1">
                                  {getChangeIcon(member.change)}
                                  <span
                                    className={`text-sm font-medium ${
                                      member.change.startsWith("+")
                                        ? "text-green-400"
                                        : member.change.startsWith("-")
                                          ? "text-red-400"
                                          : "text-gray-400"
                                    }`}
                                  >
                                    {member.change === "0" ? "—" : member.change}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Avatar & Info */}
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg ${
                                  member.rank === 1
                                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
                                    : member.rank === 2
                                      ? "bg-gradient-to-r from-gray-400 to-gray-500 text-black"
                                      : member.rank === 3
                                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-black"
                                        : "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
                                }`}
                              >
                                {member.avatar}
                              </div>
                              <div>
                                <h3 className="text-white font-bold text-xl">{member.name}</h3>
                                <p className="text-gray-400 font-medium">{member.team}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-gray-500 text-sm">Last activity:</span>
                                  <span className="text-gray-400 text-sm">{member.lastActivity}</span>
                                </div>
                              </div>
                            </div>

                            {/* Badges */}
                            {viewMode === "detailed" && (
                              <div className="flex flex-wrap gap-2">
                                {member.badges.map((badge, badgeIndex) => (
                                  <Badge
                                    key={badgeIndex}
                                    className={`${
                                      badge === "Top Performer"
                                        ? "bg-yellow-600"
                                        : badge === "Innovation Leader"
                                          ? "bg-purple-600"
                                          : badge === "Rising Star"
                                            ? "bg-blue-600"
                                            : badge === "Fast Climber"
                                              ? "bg-green-600"
                                              : "bg-gray-600"
                                    } text-white font-bold`}
                                  >
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Points & Growth */}
                          <div className="text-right">
                            <div className="text-3xl font-bold text-yellow-400 mb-1">
                              {member.points.toLocaleString()}
                            </div>
                            <div className="text-gray-400 text-sm mb-2">points</div>
                            {viewMode === "detailed" && (
                              <div className="flex items-center justify-end space-x-2">
                                <TrendingUp className={`w-4 h-4 ${getGrowthColor(member.monthlyGrowth)}`} />
                                <span className={`text-sm font-bold ${getGrowthColor(member.monthlyGrowth)}`}>
                                  {member.monthlyGrowth > 0 ? "+" : ""}
                                  {member.monthlyGrowth.toFixed(1)}%
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
                    Team Performance Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboardData.teamLeaderboard.map((team, index) => (
                      <motion.div
                        key={team.team}
                        className={`p-6 rounded-xl transition-all duration-300 border ${
                          team.rank <= 3
                            ? "bg-gradient-to-r from-gray-800 to-gray-700 border-yellow-500/50 shadow-lg shadow-yellow-500/10"
                            : "bg-gray-800 border-gray-700 hover:border-yellow-500/30"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01, y: -2 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            {/* Rank */}
                            <div className="flex items-center space-x-3">
                              {getRankIcon(team.rank)}
                              <div className="text-center">
                                <div className="text-2xl font-bold text-white">#{team.rank}</div>
                                <div className="flex items-center space-x-1">
                                  {getChangeIcon(team.change)}
                                  <span
                                    className={`text-sm font-medium ${
                                      team.change.startsWith("+")
                                        ? "text-green-400"
                                        : team.change.startsWith("-")
                                          ? "text-red-400"
                                          : "text-gray-400"
                                    }`}
                                  >
                                    {team.change === "0" ? "—" : team.change}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Team Info */}
                            <div>
                              <h3 className="text-white font-bold text-xl">{team.team}</h3>
                              <div className="flex items-center space-x-4 text-gray-400">
                                <span>{team.members} members</span>
                                <span>•</span>
                                <span>Top: {team.topPerformer}</span>
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <TrendingUp className={`w-4 h-4 ${getGrowthColor(team.growth)}`} />
                                <span className={`text-sm font-bold ${getGrowthColor(team.growth)}`}>
                                  {team.growth > 0 ? "+" : ""}
                                  {team.growth.toFixed(1)}% growth
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Team Stats */}
                          <div className="text-right">
                            <div className="text-3xl font-bold text-yellow-400 mb-1">
                              {team.avgScore.toLocaleString()}
                            </div>
                            <div className="text-gray-400 text-sm mb-2">avg score</div>
                            <div className="text-gray-500 text-sm">Total: {team.totalPoints.toLocaleString()} pts</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </HodLayout>
  )
}
