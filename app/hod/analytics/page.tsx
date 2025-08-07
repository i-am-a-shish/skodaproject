"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, Users, Award, Target, Download, Calendar, BarChart3 } from "lucide-react"
import { HodLayout } from "@/components/layouts/hod-layout"
import { useToast } from "@/hooks/use-toast"

// Enhanced dummy data for analytics
const analyticsData = {
  departmentOverview: {
    totalEmployees: 156,
    totalTeams: 12,
    avgScore: 3750,
    growthRate: 15.2,
    completionRate: 87.5,
    satisfactionScore: 4.3,
  },
  performanceTrends: [
    { month: "Jan", score: 3200, submissions: 145, completion: 82 },
    { month: "Feb", score: 3350, submissions: 168, completion: 85 },
    { month: "Mar", score: 3500, submissions: 192, completion: 88 },
    { month: "Apr", score: 3650, submissions: 185, completion: 86 },
    { month: "May", score: 3750, submissions: 210, completion: 89 },
    { month: "Jun", score: 3850, submissions: 225, completion: 91 },
    { month: "Jul", score: 3950, submissions: 240, completion: 93 },
    { month: "Aug", score: 4100, submissions: 255, completion: 95 },
  ],
  teamComparison: [
    { team: "Training-A", score: 4200, members: 12, efficiency: 95, satisfaction: 4.8 },
    { team: "Training-B", score: 3950, members: 15, efficiency: 88, satisfaction: 4.5 },
    { team: "Training-C", score: 3800, members: 11, efficiency: 92, satisfaction: 4.6 },
    { team: "Training-D", score: 3650, members: 13, efficiency: 85, satisfaction: 4.2 },
    { team: "Training-E", score: 3500, members: 14, efficiency: 80, satisfaction: 4.0 },
    { team: "Training-F", score: 3400, members: 16, efficiency: 78, satisfaction: 3.9 },
  ],
  activityBreakdown: [
    { name: "Certifications", value: 45, count: 180, color: "#10B981" },
    { name: "Workshops", value: 30, count: 120, color: "#3B82F6" },
    { name: "Training Programs", value: 25, count: 100, color: "#8B5CF6" },
  ],
  skillsRadar: [
    { skill: "Technical", A: 120, B: 110, C: 86, fullMark: 150 },
    { skill: "Leadership", A: 98, B: 130, C: 99, fullMark: 150 },
    { skill: "Communication", A: 86, B: 130, C: 130, fullMark: 150 },
    { skill: "Problem Solving", A: 99, B: 100, C: 85, fullMark: 150 },
    { skill: "Innovation", A: 85, B: 90, C: 65, fullMark: 150 },
    { skill: "Collaboration", A: 65, B: 85, C: 85, fullMark: 150 },
  ],
  quarterlyGoals: [
    { quarter: "Q1", target: 3500, achieved: 3650, percentage: 104.3 },
    { quarter: "Q2", target: 3700, achieved: 3850, percentage: 104.1 },
    { quarter: "Q3", target: 3900, achieved: 4100, percentage: 105.1 },
    { quarter: "Q4", target: 4200, achieved: 4350, percentage: 103.6 },
  ],
  topPerformers: [
    { name: "Ashish Suryawanshi", team: "Training-A", score: 4300, growth: 15.2 },
    { name: "Priya Sharma", team: "Training-A", score: 4100, growth: 12.8 },
    { name: "Rahul Kumar", team: "Training-B", score: 3950, growth: 18.5 },
    { name: "Sneha Patel", team: "Training-C", score: 3800, growth: 14.2 },
    { name: "Amit Singh", team: "Training-A", score: 3650, growth: 16.7 },
  ],
}

export default function HodAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedTeam, setSelectedTeam] = useState("all")
  const { toast } = useToast()

  const handleExport = (type: string) => {
    toast({
      title: "📊 Export Started",
      description: `Your ${type} report is being generated and will be downloaded shortly.`,
      className: "bg-gray-800 border-green-500 text-white",
    })
  }

  return (
    <HodLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-3 flex items-center">
                    <BarChart3 className="w-10 h-10 mr-4" />
                    Department Analytics
                  </h1>
                  <p className="text-purple-100 text-xl mb-6">
                    Comprehensive insights and performance metrics for strategic decision making
                  </p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      <span className="font-bold">+{analyticsData.departmentOverview.growthRate}% Growth</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Target className="w-5 h-5 mr-2" />
                      <span className="font-bold">{analyticsData.departmentOverview.completionRate}% Completion</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Award className="w-5 h-5 mr-2" />
                      <span className="font-bold">
                        {analyticsData.departmentOverview.satisfactionScore}/5 Satisfaction
                      </span>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="text-9xl opacity-30"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  📊
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-40 font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="3months">Last 3 Months</SelectItem>
                        <SelectItem value="6months">Last 6 Months</SelectItem>
                        <SelectItem value="1year">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-purple-400" />
                    <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-48 font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="all">All Teams</SelectItem>
                        <SelectItem value="training-a">Training-A</SelectItem>
                        <SelectItem value="training-b">Training-B</SelectItem>
                        <SelectItem value="training-c">Training-C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleExport("Analytics")}
                    className="bg-purple-600 hover:bg-purple-700 font-bold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            {
              title: "Total Employees",
              value: analyticsData.departmentOverview.totalEmployees,
              change: "+8.2%",
              icon: Users,
              color: "text-blue-500",
              bg: "bg-blue-500/10",
            },
            {
              title: "Avg Department Score",
              value: analyticsData.departmentOverview.avgScore,
              change: `+${analyticsData.departmentOverview.growthRate}%`,
              icon: TrendingUp,
              color: "text-green-500",
              bg: "bg-green-500/10",
            },
            {
              title: "Completion Rate",
              value: `${analyticsData.departmentOverview.completionRate}%`,
              change: "+5.3%",
              icon: Target,
              color: "text-yellow-500",
              bg: "bg-yellow-500/10",
            },
            {
              title: "Satisfaction Score",
              value: `${analyticsData.departmentOverview.satisfactionScore}/5`,
              change: "+0.2",
              icon: Award,
              color: "text-purple-500",
              bg: "bg-purple-500/10",
            },
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${metric.bg}`}>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <span className="text-green-400 text-sm font-bold">{metric.change}</span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{metric.title}</p>
                    <p className="text-3xl font-bold text-white">{metric.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Analytics Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700 p-1 h-auto">
              <TabsTrigger
                value="performance"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                📈 Performance Trends
              </TabsTrigger>
              <TabsTrigger
                value="teams"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                👥 Team Analysis
              </TabsTrigger>
              <TabsTrigger
                value="activities"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                🎯 Activity Breakdown
              </TabsTrigger>
              <TabsTrigger
                value="goals"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                🏆 Goals & Targets
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Performance Trend Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={analyticsData.performanceTrends}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
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
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="#8B5CF6"
                          fillOpacity={1}
                          fill="url(#colorScore)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Submission & Completion Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={analyticsData.performanceTrends}>
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
                        <Line
                          type="monotone"
                          dataKey="submissions"
                          stroke="#10B981"
                          strokeWidth={3}
                          name="Submissions"
                        />
                        <Line
                          type="monotone"
                          dataKey="completion"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          name="Completion %"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="teams">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Team Performance Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={analyticsData.teamComparison}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="team" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="score" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Skills Assessment Radar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <RadarChart data={analyticsData.skillsRadar}>
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis dataKey="skill" tick={{ fill: "#9CA3AF" }} />
                        <PolarRadiusAxis tick={{ fill: "#9CA3AF" }} />
                        <Radar name="Team A" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                        <Radar name="Team B" dataKey="B" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                        <Radar name="Team C" dataKey="C" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activities">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Activity Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={analyticsData.activityBreakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {analyticsData.activityBreakdown.map((entry, index) => (
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

                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Top Performers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.topPerformers.map((performer, index) => (
                        <motion.div
                          key={performer.name}
                          className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                                index === 0
                                  ? "bg-yellow-500 text-black"
                                  : index === 1
                                    ? "bg-gray-400 text-black"
                                    : index === 2
                                      ? "bg-orange-500 text-black"
                                      : "bg-gray-600 text-white"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">{performer.name}</h4>
                              <p className="text-gray-400 text-sm">{performer.team}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-purple-400 font-bold">{performer.score.toLocaleString()}</p>
                            <p className="text-green-400 text-sm">+{performer.growth}%</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="goals">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Quarterly Goals Achievement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={analyticsData.quarterlyGoals}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="quarter" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="target" fill="#6B7280" name="Target" />
                        <Bar dataKey="achieved" fill="#10B981" name="Achieved" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Goal Achievement Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {analyticsData.quarterlyGoals.map((goal, index) => (
                        <motion.div
                          key={goal.quarter}
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-white font-semibold">{goal.quarter} 2024</span>
                            <span
                              className={`font-bold ${goal.percentage >= 100 ? "text-green-400" : "text-yellow-400"}`}
                            >
                              {goal.percentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <motion.div
                              className={`h-3 rounded-full ${goal.percentage >= 100 ? "bg-green-500" : "bg-yellow-500"}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(goal.percentage, 100)}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>Target: {goal.target.toLocaleString()}</span>
                            <span>Achieved: {goal.achieved.toLocaleString()}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
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
