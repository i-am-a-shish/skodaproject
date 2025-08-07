"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Users, Search, TrendingUp, Award, Eye, MessageSquare } from "lucide-react"
import { LeadLayout } from "@/components/layouts/lead-layout"
import { useToast } from "@/hooks/use-toast"

const teamMembers = [
  {
    id: 1,
    name: "Ashish Suryawanshi",
    email: "ashish@skoda.com",
    position: "Senior Trainer",
    joinDate: "2023-03-15",
    currentRank: 5,
    points: 4300,
    badges: 4,
    submissions: 12,
    approvedSubmissions: 10,
    pendingSubmissions: 1,
    rejectedSubmissions: 1,
    avatar: "AS",
    performance: "Excellent",
    lastActive: "2025-01-16",
    monthlyProgress: [
      { month: "Jul", points: 2800 },
      { month: "Aug", points: 3200 },
      { month: "Sep", points: 3600 },
      { month: "Oct", points: 3900 },
      { month: "Nov", points: 4100 },
      { month: "Dec", points: 4300 },
    ],
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@skoda.com",
    position: "Trainer",
    joinDate: "2023-06-20",
    currentRank: 2,
    points: 4100,
    badges: 5,
    submissions: 15,
    approvedSubmissions: 13,
    pendingSubmissions: 2,
    rejectedSubmissions: 0,
    avatar: "PS",
    performance: "Outstanding",
    lastActive: "2025-01-16",
    monthlyProgress: [
      { month: "Jul", points: 2900 },
      { month: "Aug", points: 3300 },
      { month: "Sep", points: 3700 },
      { month: "Oct", points: 3900 },
      { month: "Nov", points: 4000 },
      { month: "Dec", points: 4100 },
    ],
  },
  {
    id: 3,
    name: "Deepika Joshi",
    email: "deepika@skoda.com",
    position: "Junior Trainer",
    joinDate: "2023-09-10",
    currentRank: 9,
    points: 3200,
    badges: 3,
    submissions: 8,
    approvedSubmissions: 6,
    pendingSubmissions: 1,
    rejectedSubmissions: 1,
    avatar: "DJ",
    performance: "Good",
    lastActive: "2025-01-15",
    monthlyProgress: [
      { month: "Jul", points: 1800 },
      { month: "Aug", points: 2200 },
      { month: "Sep", points: 2600 },
      { month: "Oct", points: 2800 },
      { month: "Nov", points: 3000 },
      { month: "Dec", points: 3200 },
    ],
  },
  {
    id: 4,
    name: "Rajesh Patel",
    email: "rajesh@skoda.com",
    position: "Trainer",
    joinDate: "2023-01-08",
    currentRank: 7,
    points: 3600,
    badges: 4,
    submissions: 11,
    approvedSubmissions: 9,
    pendingSubmissions: 0,
    rejectedSubmissions: 2,
    avatar: "RP",
    performance: "Good",
    lastActive: "2025-01-16",
    monthlyProgress: [
      { month: "Jul", points: 2400 },
      { month: "Aug", points: 2800 },
      { month: "Sep", points: 3100 },
      { month: "Oct", points: 3300 },
      { month: "Nov", points: 3500 },
      { month: "Dec", points: 3600 },
    ],
  },
]

const teamStats = {
  totalMembers: teamMembers.length,
  avgPoints: Math.round(teamMembers.reduce((sum, member) => sum + member.points, 0) / teamMembers.length),
  totalSubmissions: teamMembers.reduce((sum, member) => sum + member.submissions, 0),
  pendingApprovals: teamMembers.reduce((sum, member) => sum + member.pendingSubmissions, 0),
  teamRank: 1,
  monthlyTeamProgress: [
    { month: "Jul", avgPoints: 2475, totalSubmissions: 8 },
    { month: "Aug", avgPoints: 2875, totalSubmissions: 12 },
    { month: "Sep", avgPoints: 3275, totalSubmissions: 15 },
    { month: "Oct", avgPoints: 3475, totalSubmissions: 13 },
    { month: "Nov", avgPoints: 3650, totalSubmissions: 18 },
    { month: "Dec", avgPoints: 3800, totalSubmissions: 20 },
  ],
}

export default function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [filterPerformance, setFilterPerformance] = useState("all")
  const { toast } = useToast()

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterPerformance === "all" || member.performance.toLowerCase() === filterPerformance),
  )

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Outstanding":
        return "bg-green-600 text-white"
      case "Excellent":
        return "bg-blue-600 text-white"
      case "Good":
        return "bg-yellow-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const sendMessage = (member: any) => {
    toast({
      title: "Message Sent",
      description: `Message sent to ${member.name} successfully.`,
      className: "bg-gray-800 border-gray-700 text-white",
    })
  }

  return (
    <LeadLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 border-0 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    <Users className="w-8 h-8 mr-3" />
                    Team Management
                  </h1>
                  <p className="text-purple-100 text-lg">Manage and monitor your team's performance and progress</p>
                  <div className="flex items-center space-x-6 mt-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      <span>{teamStats.totalMembers} Members</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      <span>Avg: {teamStats.avgPoints} pts</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      <span>Team Rank: #{teamStats.teamRank}</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="text-8xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  👥
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            { title: "Team Members", value: teamStats.totalMembers, icon: Users, color: "text-purple-500" },
            { title: "Avg Points", value: teamStats.avgPoints, icon: TrendingUp, color: "text-green-500" },
            { title: "Total Submissions", value: teamStats.totalSubmissions, icon: Award, color: "text-blue-500" },
            { title: "Pending Approvals", value: teamStats.pendingApprovals, icon: Users, color: "text-yellow-500" },
          ].map((stat, index) => (
            <Card
              key={stat.title}
              className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-all duration-300"
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

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="members" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="members" className="data-[state=active]:bg-purple-600">
                Team Members
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
                Team Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="members">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Team Members ({filteredMembers.length})</CardTitle>
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search team members..."
                          className="bg-gray-800 border-gray-600 text-white pl-10"
                        />
                      </div>
                    </div>
                    <Select value={filterPerformance} onValueChange={setFilterPerformance}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-full md:w-48">
                        <SelectValue placeholder="Filter by performance" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="all">All Performance</SelectItem>
                        <SelectItem value="outstanding">Outstanding</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12 border-2 border-purple-500">
                              <AvatarFallback className="bg-purple-600 text-white font-bold">
                                {member.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                              <p className="text-gray-400 text-sm">{member.position}</p>
                              <Badge className={getPerformanceColor(member.performance)}>{member.performance}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-bold text-xl">#{member.currentRank}</p>
                            <p className="text-gray-400 text-sm">Rank</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-gray-700 rounded-lg">
                            <p className="text-green-400 font-bold text-lg">{member.points.toLocaleString()}</p>
                            <p className="text-gray-400 text-xs">Points</p>
                          </div>
                          <div className="text-center p-3 bg-gray-700 rounded-lg">
                            <p className="text-blue-400 font-bold text-lg">{member.badges}</p>
                            <p className="text-gray-400 text-xs">Badges</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mb-4 text-center text-sm">
                          <div>
                            <p className="text-green-400 font-semibold">{member.approvedSubmissions}</p>
                            <p className="text-gray-500 text-xs">Approved</p>
                          </div>
                          <div>
                            <p className="text-yellow-400 font-semibold">{member.pendingSubmissions}</p>
                            <p className="text-gray-500 text-xs">Pending</p>
                          </div>
                          <div>
                            <p className="text-red-400 font-semibold">{member.rejectedSubmissions}</p>
                            <p className="text-gray-500 text-xs">Rejected</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-gray-400 text-xs">Last active: {member.lastActive}</p>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedMember(member)}
                                  className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="text-white">{member.name} - Detailed View</DialogTitle>
                                </DialogHeader>
                                {selectedMember && (
                                  <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="text-white font-semibold mb-2">Personal Info</h4>
                                        <div className="space-y-2 text-gray-300 text-sm">
                                          <p>Email: {selectedMember.email}</p>
                                          <p>Position: {selectedMember.position}</p>
                                          <p>Join Date: {selectedMember.joinDate}</p>
                                          <p>Performance: {selectedMember.performance}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="text-white font-semibold mb-2">Performance Stats</h4>
                                        <div className="space-y-2 text-gray-300 text-sm">
                                          <p>Current Rank: #{selectedMember.currentRank}</p>
                                          <p>Total Points: {selectedMember.points.toLocaleString()}</p>
                                          <p>Badges Earned: {selectedMember.badges}</p>
                                          <p>Total Submissions: {selectedMember.submissions}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="text-white font-semibold mb-2">Monthly Progress</h4>
                                      <ResponsiveContainer width="100%" height={200}>
                                        <LineChart data={selectedMember.monthlyProgress}>
                                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                          <XAxis dataKey="month" stroke="#9CA3AF" />
                                          <YAxis stroke="#9CA3AF" />
                                          <Tooltip
                                            contentStyle={{
                                              backgroundColor: "#1F2937",
                                              border: "1px solid #374151",
                                              borderRadius: "8px",
                                            }}
                                          />
                                          <Line type="monotone" dataKey="points" stroke="#8B5CF6" strokeWidth={3} />
                                        </LineChart>
                                      </ResponsiveContainer>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button
                              onClick={() => sendMessage(member)}
                              variant="outline"
                              size="sm"
                              className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Team Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={teamStats.monthlyTeamProgress}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                          }}
                        />
                        <Line type="monotone" dataKey="avgPoints" stroke="#8B5CF6" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Monthly Submissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={teamStats.monthlyTeamProgress}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="totalSubmissions" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </LeadLayout>
  )
}
