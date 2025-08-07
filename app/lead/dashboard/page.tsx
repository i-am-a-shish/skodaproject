"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Users,
  Trophy,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Target,
  FileText,
  User,
  Calendar,
} from "lucide-react"
import { LeadLayout } from "@/components/layouts/lead-layout"
import { useToast } from "@/hooks/use-toast"

// Enhanced dummy data with pending tasks from employees
const leadData = {
  name: "Rajesh Kumar",
  leadId: "LEAD001",
  department: "Training Department",
  teamName: "Training-A",
  teamSize: 12,
  totalTeamPoints: 28500,
  pendingApprovals: 5,
  approvedToday: 3,
  rejectedToday: 1,
  teamRank: 2,
  monthlyTarget: 35000,
  teamMembers: [
    { name: "Ashish Suryawanshi", points: 4300, rank: 5, status: "Active" },
    { name: "Priya Sharma", points: 3800, rank: 8, status: "Active" },
    { name: "Deepika Joshi", points: 3200, rank: 12, status: "Active" },
    { name: "Rajesh Patel", points: 2900, rank: 15, status: "Active" },
    { name: "Anita Singh", points: 2700, rank: 18, status: "Active" },
  ],
  pendingTasks: [
    {
      id: 1,
      employeeName: "Ashish Suryawanshi",
      employeeId: "EMP001",
      taskTitle: "Advanced Safety Training",
      taskType: "Pre-defined Task",
      category: "Safety",
      submittedDate: "2025-01-16",
      points: 1000,
      priority: "high",
      description: "Complete comprehensive safety training program with practical assessments",
      file: "safety_cert.pdf",
      fileSize: "2.3 MB",
      urgency: "High Priority",
    },
    {
      id: 2,
      employeeName: "Priya Sharma",
      employeeId: "EMP002",
      taskTitle: "Leadership Skills Development",
      taskType: "Custom Task",
      category: "Leadership",
      submittedDate: "2025-01-15",
      points: null,
      priority: "medium",
      description: "Participated in intensive leadership workshop focusing on team management",
      file: "leadership_workshop.pdf",
      fileSize: "1.8 MB",
      urgency: "Medium Priority",
    },
    {
      id: 3,
      employeeName: "Deepika Joshi",
      employeeId: "EMP003",
      taskTitle: "Digital Transformation Basics",
      taskType: "Pre-defined Task",
      category: "Technology",
      submittedDate: "2025-01-14",
      points: 600,
      priority: "medium",
      description: "Completed foundational course on digital transformation methodologies",
      file: "digital_transformation.pdf",
      fileSize: "3.1 MB",
      urgency: "Medium Priority",
    },
    {
      id: 4,
      employeeName: "Rajesh Patel",
      employeeId: "EMP004",
      taskTitle: "Innovation Workshop Completion",
      taskType: "Custom Task",
      category: "Innovation",
      submittedDate: "2025-01-13",
      points: null,
      priority: "low",
      description: "Attended 2-day innovation workshop and completed practical project",
      file: "innovation_project.pdf",
      fileSize: "4.2 MB",
      urgency: "Low Priority",
    },
    {
      id: 5,
      employeeName: "Anita Singh",
      employeeId: "EMP005",
      taskTitle: "Quality Management Certification",
      taskType: "Pre-defined Task",
      category: "Quality",
      submittedDate: "2025-01-12",
      points: 800,
      priority: "high",
      description: "Successfully completed quality management system certification",
      file: "quality_cert.pdf",
      fileSize: "2.8 MB",
      urgency: "High Priority",
    },
  ],
  recentApprovals: [
    {
      id: 6,
      employeeName: "Ashish Suryawanshi",
      taskTitle: "Technical Excellence Program",
      status: "Approved",
      points: 800,
      processedDate: "2025-01-15",
      hodStatus: "Final Approved",
    },
    {
      id: 7,
      employeeName: "Priya Sharma",
      taskTitle: "Advanced Excel Analytics",
      status: "Approved",
      points: 400,
      processedDate: "2025-01-14",
      hodStatus: "Pending",
    },
  ],
  teamPerformance: [
    { month: "Jul", points: 22000, target: 25000 },
    { month: "Aug", points: 24500, target: 27000 },
    { month: "Sep", points: 26800, target: 28000 },
    { month: "Oct", points: 27200, target: 30000 },
    { month: "Nov", points: 28500, target: 32000 },
    { month: "Dec", points: 30200, target: 35000 },
  ],
  taskDistribution: [
    { name: "Approved", value: 45, color: "#10B981" },
    { name: "Pending", value: 25, color: "#F59E0B" },
    { name: "Rejected", value: 15, color: "#EF4444" },
    { name: "In HOD Review", value: 15, color: "#3B82F6" },
  ],
}

export default function LeadDashboard() {
  const [animatedPoints, setAnimatedPoints] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedPoints((prev) => {
        if (prev < leadData.totalTeamPoints) {
          return prev + 500
        }
        clearInterval(timer)
        return leadData.totalTeamPoints
      })
    }, 20)
    return () => clearInterval(timer)
  }, [])

  const progressPercentage = (leadData.totalTeamPoints / leadData.monthlyTarget) * 100

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-500/5"
      case "medium":
        return "border-l-yellow-500 bg-yellow-500/5"
      case "low":
        return "border-l-green-500 bg-green-500/5"
      default:
        return "border-l-gray-500 bg-gray-500/5"
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "High Priority":
        return <Badge className="bg-red-600 text-white font-bold animate-pulse">🔥 High Priority</Badge>
      case "Medium Priority":
        return <Badge className="bg-yellow-600 text-white font-bold">⚡ Medium Priority</Badge>
      case "Low Priority":
        return <Badge className="bg-green-600 text-white font-bold">📋 Low Priority</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const handleQuickApproval = (taskId: number, taskTitle: string, points: number | null) => {
    if (points) {
      toast({
        title: "✅ Task Approved!",
        description: `"${taskTitle}" has been approved and sent to HOD for final review. Points: ${points}`,
        className: "bg-gray-800 border-green-500 text-white",
      })
    } else {
      toast({
        title: "📝 Custom Task Needs Review",
        description: `"${taskTitle}" requires point assignment. Please review in the Approvals section.`,
        className: "bg-gray-800 border-blue-500 text-white",
      })
    }
  }

  return (
    <LeadLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-3">Welcome, {leadData.name}! 👨‍💼</h1>
                  <p className="text-purple-100 text-xl mb-6">
                    Leading <span className="font-bold">{leadData.teamName}</span> • {leadData.teamSize} Team Members
                  </p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Trophy className="w-5 h-5 mr-2" />
                      <span className="font-bold">Team Rank #{leadData.teamRank}</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Award className="w-5 h-5 mr-2" />
                      <span className="font-bold">{animatedPoints.toLocaleString()} Team Points</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Target className="w-5 h-5 mr-2" />
                      <span className="font-bold">{progressPercentage.toFixed(0)}% to Target</span>
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
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  👑
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
            {
              title: "Pending Approvals",
              value: leadData.pendingApprovals,
              icon: Clock,
              color: "text-yellow-500",
              bg: "bg-yellow-500/10",
              urgent: true,
            },
            {
              title: "Team Members",
              value: leadData.teamSize,
              icon: Users,
              color: "text-blue-500",
              bg: "bg-blue-500/10",
            },
            {
              title: "Approved Today",
              value: leadData.approvedToday,
              icon: CheckCircle,
              color: "text-green-500",
              bg: "bg-green-500/10",
            },
            {
              title: "Team Points",
              value: `${(leadData.totalTeamPoints / 1000).toFixed(0)}K`,
              icon: Trophy,
              color: "text-purple-500",
              bg: "bg-purple-500/10",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                className={`bg-gray-900 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 ${stat.urgent ? "ring-2 ring-yellow-500/50 animate-pulse" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      {stat.urgent && <p className="text-yellow-400 text-xs font-bold mt-1">⚠️ Requires Attention</p>}
                    </div>
                    <div className={`p-3 rounded-full ${stat.bg}`}>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700 p-1 h-auto">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3 relative"
              >
                🚨 Pending Tasks ({leadData.pendingTasks.length})
                {leadData.pendingTasks.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                👥 Team Performance
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                📊 Analytics
              </TabsTrigger>
              <TabsTrigger
                value="approvals"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                ✅ Recent Approvals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center text-2xl">
                    <AlertCircle className="w-6 h-6 mr-3 text-red-500 animate-pulse" />
                    Tasks Awaiting Your Approval - Urgent Action Required!
                  </CardTitle>
                  <p className="text-gray-400 mt-2">
                    Your team members have submitted {leadData.pendingTasks.length} tasks that need your immediate
                    review and approval.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {leadData.pendingTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        className={`p-6 bg-gray-800 rounded-xl border-l-4 ${getPriorityColor(task.priority)} hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                <User className="w-7 h-7 text-white" />
                              </div>
                              <div>
                                <h3 className="text-white font-bold text-xl">{task.taskTitle}</h3>
                                <p className="text-gray-300 font-medium">
                                  {task.employeeName} • {task.employeeId}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  {getUrgencyBadge(task.urgency)}
                                  <Badge variant="outline" className="border-blue-500 text-blue-400 font-bold">
                                    {task.taskType}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div className="bg-gray-700/50 p-3 rounded-lg">
                                <p className="text-gray-400 text-xs font-medium">Category</p>
                                <p className="text-white font-bold">{task.category}</p>
                              </div>
                              <div className="bg-gray-700/50 p-3 rounded-lg">
                                <p className="text-gray-400 text-xs font-medium">Points</p>
                                {task.points ? (
                                  <p className="text-green-400 font-bold text-lg">+{task.points}</p>
                                ) : (
                                  <p className="text-yellow-400 font-bold text-lg">TBD</p>
                                )}
                              </div>
                              <div className="bg-gray-700/50 p-3 rounded-lg">
                                <p className="text-gray-400 text-xs font-medium">Submitted</p>
                                <p className="text-white font-medium">{task.submittedDate}</p>
                              </div>
                              <div className="bg-gray-700/50 p-3 rounded-lg">
                                <p className="text-gray-400 text-xs font-medium">File Size</p>
                                <p className="text-white font-medium">{task.fileSize}</p>
                              </div>
                            </div>

                            <p className="text-gray-300 mb-4 leading-relaxed bg-gray-700/30 p-3 rounded-lg">
                              <strong>Description:</strong> {task.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {task.submittedDate}
                                </span>
                                <span className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full">
                                  <FileText className="w-4 h-4 mr-2" />
                                  {task.file}
                                </span>
                              </div>
                              <div className="flex space-x-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent font-bold"
                                  onClick={() => (window.location.href = "/lead/approvals")}
                                >
                                  <FileText className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>

                                {task.taskType === "Pre-defined Task" ? (
                                  <Button
                                    onClick={() => handleQuickApproval(task.id, task.taskTitle, task.points)}
                                    className="bg-green-600 hover:bg-green-700 font-bold shadow-lg hover:shadow-green-500/20"
                                    size="sm"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Quick Approve ({task.points} pts)
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => (window.location.href = "/lead/approvals")}
                                    className="bg-blue-600 hover:bg-blue-700 font-bold shadow-lg hover:shadow-blue-500/20"
                                    size="sm"
                                  >
                                    <Award className="w-4 h-4 mr-2" />
                                    Set Points & Approve
                                  </Button>
                                )}

                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => (window.location.href = "/lead/approvals")}
                                  className="font-bold shadow-lg hover:shadow-red-500/20"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {leadData.pendingTasks.length === 0 && (
                      <div className="text-center py-12">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-white text-xl font-bold mb-2">All Caught Up! 🎉</h3>
                        <p className="text-gray-400">No pending tasks require your approval at this time.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-500" />
                      Team Members Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leadData.teamMembers.map((member, index) => (
                        <motion.div
                          key={member.name}
                          className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">{member.name}</h4>
                              <p className="text-gray-400 text-sm">Rank #{member.rank}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-bold">{member.points.toLocaleString()} pts</p>
                            <Badge className="bg-green-600 text-white text-xs">{member.status}</Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                      Team Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={leadData.teamPerformance}>
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
                        <Line type="monotone" dataKey="points" stroke="#10B981" strokeWidth={3} name="Team Points" />
                        <Line
                          type="monotone"
                          dataKey="target"
                          stroke="#F59E0B"
                          strokeWidth={2}
                          name="Target"
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Task Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={leadData.taskDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {leadData.taskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Monthly Team Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={leadData.teamPerformance}>
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
                        <Bar dataKey="points" fill="#8B5CF6" name="Achieved Points" />
                        <Bar dataKey="target" fill="#F59E0B" name="Target Points" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="approvals">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Recent Approvals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leadData.recentApprovals.map((approval, index) => (
                      <motion.div
                        key={approval.id}
                        className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 hover:border-green-500/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-semibold">{approval.taskTitle}</h4>
                            <p className="text-gray-400 text-sm">{approval.employeeName}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className="bg-green-600 text-white font-bold">✅ {approval.status}</Badge>
                              <Badge className="bg-blue-600 text-white font-bold">+{approval.points} pts</Badge>
                              {approval.hodStatus === "Final Approved" ? (
                                <Badge className="bg-purple-600 text-white font-bold">🎉 HOD Approved</Badge>
                              ) : (
                                <Badge className="bg-yellow-600 text-white font-bold">⏳ HOD Pending</Badge>
                              )}
                            </div>
                          </div>
                          <span className="text-gray-400 text-sm">{approval.processedDate}</span>
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
    </LeadLayout>
  )
}
