"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Building, Users, TrendingUp, Award, Search, MessageSquare, Eye } from "lucide-react"
import { HodLayout } from "@/components/layouts/hod-layout"
import { useToast } from "@/hooks/use-toast"

const departmentTeams = [
  {
    id: 1,
    name: "Training-A",
    lead: "Rajesh Kumar",
    leadId: "LEAD001",
    members: 12,
    avgPoints: 3867,
    rank: 1,
    totalSubmissions: 45,
    pendingApprovals: 3,
    monthlyGrowth: 15,
    performance: "Outstanding",
    topPerformers: ["Ashish Suryawanshi", "Priya Sharma", "Deepika Joshi"],
  },
  {
    id: 2,
    name: "Training-B",
    lead: "Sunita Verma",
    leadId: "LEAD002",
    members: 15,
    avgPoints: 3654,
    rank: 2,
    totalSubmissions: 52,
    pendingApprovals: 5,
    monthlyGrowth: 12,
    performance: "Excellent",
    topPerformers: ["Rahul Kumar", "Ravi Mehta", "Neha Singh"],
  },
  {
    id: 3,
    name: "Training-C",
    lead: "Amit Sharma",
    leadId: "LEAD003",
    members: 11,
    avgPoints: 3421,
    rank: 3,
    totalSubmissions: 38,
    pendingApprovals: 2,
    monthlyGrowth: 8,
    performance: "Good",
    topPerformers: ["Sneha Patel", "Kavya Reddy", "Rohit Jain"],
  },
  {
    id: 4,
    name: "Training-D",
    lead: "Pooja Gupta",
    leadId: "LEAD004",
    members: 13,
    avgPoints: 3298,
    rank: 4,
    totalSubmissions: 41,
    pendingApprovals: 4,
    monthlyGrowth: 10,
    performance: "Good",
    topPerformers: ["Arjun Nair", "Sanjay Kumar", "Meera Iyer"],
  },
  {
    id: 5,
    name: "Training-E",
    lead: "Vikash Singh",
    leadId: "LEAD005",
    members: 14,
    avgPoints: 3156,
    rank: 5,
    totalSubmissions: 39,
    pendingApprovals: 6,
    monthlyGrowth: 5,
    performance: "Average",
    topPerformers: ["Vikram Gupta", "Anita Rao", "Kiran Patel"],
  },
]

const departmentStats = {
  totalEmployees: departmentTeams.reduce((sum, team) => sum + team.members, 0),
  totalTeams: departmentTeams.length,
  avgDepartmentScore: Math.round(
    departmentTeams.reduce((sum, team) => sum + team.avgPoints, 0) / departmentTeams.length,
  ),
  totalSubmissions: departmentTeams.reduce((sum, team) => sum + team.totalSubmissions, 0),
  pendingApprovals: departmentTeams.reduce((sum, team) => sum + team.pendingApprovals, 0),
  monthlyTrend: [
    { month: "Jul", avgScore: 3100, submissions: 180 },
    { month: "Aug", avgScore: 3250, submissions: 195 },
    { month: "Sep", avgScore: 3380, submissions: 210 },
    { month: "Oct", avgScore: 3450, submissions: 205 },
    { month: "Nov", avgScore: 3520, submissions: 225 },
    { month: "Dec", avgScore: 3580, submissions: 240 },
  ],
  performanceDistribution: [
    { name: "Outstanding", value: 1, color: "#10B981" },
    { name: "Excellent", value: 1, color: "#3B82F6" },
    { name: "Good", value: 2, color: "#F59E0B" },
    { name: "Average", value: 1, color: "#EF4444" },
  ],
}

export default function HodDepartment() {
  const [searchTerm, setSearchTerm] = useState("")
  const [performanceFilter, setPerformanceFilter] = useState("all")
  const { toast } = useToast()

  const filteredTeams = departmentTeams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (performanceFilter === "all" || team.performance.toLowerCase() === performanceFilter),
  )

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Outstanding":
        return "bg-green-600 text-white"
      case "Excellent":
        return "bg-blue-600 text-white"
      case "Good":
        return "bg-yellow-600 text-white"
      case "Average":
        return "bg-red-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const sendMessage = (team: any) => {
    toast({
      title: "Message Sent",
      description: `Message sent to ${team.lead} (${team.name}) successfully.`,
      className: "bg-gray-800 border-gray-700 text-white",
    })
  }

  return (
    <HodLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 border-0 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    <Building className="w-8 h-8 mr-3" />
                    Department Overview
                  </h1>
                  <p className="text-emerald-100 text-lg">
                    Monitor and manage all teams across the training department
                  </p>
                  <div className="flex items-center space-x-6 mt-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      <span>{departmentStats.totalEmployees} Employees</span>
                    </div>
                    <div className="flex items-center">
                      <Building className="w-5 h-5 mr-2" />
                      <span>{departmentStats.totalTeams} Teams</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      <span>Avg: {departmentStats.avgDepartmentScore}</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="text-8xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  🏢
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            { title: "Total Employees", value: departmentStats.totalEmployees, icon: Users, color: "text-emerald-500" },
            { title: "Active Teams", value: departmentStats.totalTeams, icon: Building, color: "text-blue-500" },
            {
              title: "Avg Score",
              value: departmentStats.avgDepartmentScore,
              icon: TrendingUp,
              color: "text-green-500",
            },
            {
              title: "Total Submissions",
              value: departmentStats.totalSubmissions,
              icon: Award,
              color: "text-purple-500",
            },
            {
              title: "Pending Approvals",
              value: departmentStats.pendingApprovals,
              icon: Users,
              color: "text-yellow-500",
            },
          ].map((stat, index) => (
            <Card
              key={stat.title}
              className="bg-gray-900 border-gray-700 hover:border-emerald-500 transition-all duration-300"
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
          <Tabs defaultValue="teams" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="teams" className="data-[state=active]:bg-emerald-600">
                Team Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-emerald-600">
                Department Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="teams">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Team Management ({filteredTeams.length})</CardTitle>
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search teams..."
                          className="bg-gray-800 border-gray-600 text-white pl-10"
                        />
                      </div>
                    </div>
                    <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-full md:w-48">
                        <SelectValue placeholder="Filter by performance" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="all">All Performance</SelectItem>
                        <SelectItem value="outstanding">Outstanding</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredTeams.map((team, index) => (
                      <motion.div
                        key={team.id}
                        className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">#{team.rank}</span>
                            </div>
                            <div>
                              <h3 className="text-white font-semibold text-lg">{team.name}</h3>
                              <p className="text-gray-400 text-sm">Lead: {team.lead}</p>
                              <Badge className={getPerformanceColor(team.performance)}>{team.performance}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-emerald-400 font-bold text-xl">{team.avgPoints}</p>
                            <p className="text-gray-400 text-sm">Avg Points</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-3 bg-gray-700 rounded-lg">
                            <p className="text-blue-400 font-bold text-lg">{team.members}</p>
                            <p className="text-gray-400 text-xs">Members</p>
                          </div>
                          <div className="text-center p-3 bg-gray-700 rounded-lg">
                            <p className="text-green-400 font-bold text-lg">{team.totalSubmissions}</p>
                            <p className="text-gray-400 text-xs">Submissions</p>
                          </div>
                          <div className="text-center p-3 bg-gray-700 rounded-lg">
                            <p className="text-yellow-400 font-bold text-lg">{team.pendingApprovals}</p>
                            <p className="text-gray-400 text-xs">Pending</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-white font-semibold text-sm mb-2">Top Performers:</h4>
                          <div className="flex flex-wrap gap-1">
                            {team.topPerformers.map((performer, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="border-emerald-500 text-emerald-400 text-xs"
                              >
                                {performer}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 text-sm font-semibold">
                              +{team.monthlyGrowth}% this month
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white bg-transparent"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button
                              onClick={() => sendMessage(team)}
                              variant="outline"
                              size="sm"
                              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
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
                    <CardTitle className="text-white">Department Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={departmentStats.monthlyTrend}>
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
                        <Line type="monotone" dataKey="avgScore" stroke="#10B981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Team Performance Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={departmentStats.performanceDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {departmentStats.performanceDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white">Monthly Submissions Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={departmentStats.monthlyTrend}>
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
                        <Bar dataKey="submissions" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </HodLayout>
  )
}
