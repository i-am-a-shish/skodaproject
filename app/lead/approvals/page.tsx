"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  Calendar,
  Send,
  ArrowRight,
  User,
  Award,
  Target,
  AlertCircle,
} from "lucide-react"
import { LeadLayout } from "@/components/layouts/lead-layout"
import { useToast } from "@/hooks/use-toast"

// Complete task data from employees
const pendingTasks = [
  {
    id: 1,
    employeeName: "Ashish Suryawanshi",
    employeeId: "EMP001",
    type: "Pre-defined Task",
    title: "Advanced Safety Training",
    description:
      "Complete comprehensive safety training program with practical assessments and theoretical examinations. This includes hands-on training with safety equipment, emergency procedures, and workplace hazard identification.",
    submittedDate: "2025-01-16",
    points: 1000,
    file: "safety_cert.pdf",
    fileSize: "2.3 MB",
    priority: "high",
    category: "Safety",
    duration: "40 hours",
    provider: "ŠKODA Safety Institute",
    taskType: "predefined",
    requirements: ["Attend all sessions", "Pass practical test", "Submit certificate"],
    completionDate: "2025-01-15",
    urgency: "High Priority",
  },
  {
    id: 2,
    employeeName: "Priya Sharma",
    employeeId: "EMP002",
    type: "Custom Task",
    title: "Leadership Skills Development Workshop",
    description:
      "Participated in intensive 3-day leadership workshop focusing on team management, communication skills, conflict resolution, and strategic thinking. Completed group projects and received peer evaluations.",
    submittedDate: "2025-01-15",
    points: null,
    file: "leadership_workshop.pdf",
    fileSize: "1.8 MB",
    priority: "medium",
    category: "Leadership",
    duration: "24 hours",
    provider: "Leadership Academy",
    taskType: "custom",
    requirements: ["Workshop completion", "Project presentation", "Peer feedback"],
    completionDate: "2025-01-14",
    urgency: "Medium Priority",
  },
  {
    id: 3,
    employeeName: "Deepika Joshi",
    employeeId: "EMP003",
    type: "Pre-defined Task",
    title: "Digital Transformation Basics",
    description:
      "Completed foundational course on digital transformation methodologies and implementation strategies. Covered topics including digital strategy, change management, and technology adoption.",
    submittedDate: "2025-01-14",
    points: 600,
    file: "digital_transformation.pdf",
    fileSize: "3.1 MB",
    priority: "medium",
    category: "Technology",
    duration: "16 hours",
    provider: "Tech Learning Hub",
    taskType: "predefined",
    requirements: ["Online course completion", "Final assessment", "Case study"],
    completionDate: "2025-01-13",
    urgency: "Medium Priority",
  },
  {
    id: 4,
    employeeName: "Rajesh Patel",
    employeeId: "EMP004",
    type: "Custom Task",
    title: "Innovation Workshop & Project Implementation",
    description:
      "Attended 2-day innovation workshop and successfully implemented an innovative solution for process improvement in the training department. Developed a new training methodology that reduces training time by 20%.",
    submittedDate: "2025-01-13",
    points: null,
    file: "innovation_project.pdf",
    fileSize: "4.2 MB",
    priority: "low",
    category: "Innovation",
    duration: "32 hours",
    provider: "Innovation Lab",
    taskType: "custom",
    requirements: ["Workshop attendance", "Project implementation", "Results documentation"],
    completionDate: "2025-01-12",
    urgency: "Low Priority",
  },
  {
    id: 5,
    employeeName: "Anita Singh",
    employeeId: "EMP005",
    type: "Pre-defined Task",
    title: "Quality Management System Certification",
    description:
      "Successfully completed comprehensive quality management system certification including ISO 9001 standards, quality auditing, and continuous improvement methodologies.",
    submittedDate: "2025-01-12",
    points: 800,
    file: "quality_cert.pdf",
    fileSize: "2.8 MB",
    priority: "high",
    category: "Quality",
    duration: "30 hours",
    provider: "Quality Institute",
    taskType: "predefined",
    requirements: ["Theory completion", "Practical assessment", "Certification exam"],
    completionDate: "2025-01-11",
    urgency: "High Priority",
  },
  {
    id: 6,
    employeeName: "Vikram Gupta",
    employeeId: "EMP006",
    type: "Custom Task",
    title: "Advanced Excel & Data Analytics Training",
    description:
      "Completed advanced Excel training with focus on data analytics, pivot tables, macros, and dashboard creation. Applied skills to create comprehensive training performance dashboard for the department.",
    submittedDate: "2025-01-11",
    points: null,
    file: "excel_analytics.pdf",
    fileSize: "3.5 MB",
    priority: "medium",
    category: "Technical Skills",
    duration: "20 hours",
    provider: "Data Skills Academy",
    taskType: "custom",
    requirements: ["Course completion", "Dashboard creation", "Practical application"],
    completionDate: "2025-01-10",
    urgency: "Medium Priority",
  },
]

const acceptedByLead = [
  {
    id: 7,
    employeeName: "Rajesh Patel",
    employeeId: "EMP004",
    type: "Pre-defined Task",
    title: "Quality Management System Advanced",
    submittedDate: "2025-01-10",
    processedDate: "2025-01-12",
    status: "Accepted by Lead",
    points: 800,
    comments:
      "Excellent completion of QMS certification. Well documented and comprehensive understanding demonstrated.",
    processedBy: "Team Lead",
    sentToHOD: true,
    hodStatus: "Pending",
    category: "Quality",
    urgency: "High Priority",
  },
  {
    id: 8,
    employeeName: "Priya Sharma",
    employeeId: "EMP002",
    type: "Custom Task",
    title: "Advanced Excel Analytics Implementation",
    submittedDate: "2025-01-05",
    processedDate: "2025-01-07",
    status: "Accepted by Lead",
    points: 450,
    comments:
      "Good completion of analytics training. Practical skills demonstrated effectively with real-world application.",
    processedBy: "Team Lead",
    sentToHOD: true,
    hodStatus: "Final Approved",
    category: "Technical Skills",
    urgency: "Medium Priority",
  },
  {
    id: 9,
    employeeName: "Deepika Joshi",
    employeeId: "EMP003",
    type: "Pre-defined Task",
    title: "Communication Skills Enhancement",
    submittedDate: "2025-01-03",
    processedDate: "2025-01-05",
    status: "Accepted by Lead",
    points: 600,
    comments:
      "Outstanding improvement in communication skills. Practical application in team meetings shows significant progress.",
    processedBy: "Team Lead",
    sentToHOD: true,
    hodStatus: "Final Approved",
    category: "Soft Skills",
    urgency: "Medium Priority",
  },
]

const rejectedTasks = [
  {
    id: 10,
    employeeName: "Ashish Suryawanshi",
    employeeId: "EMP001",
    type: "Custom Task",
    title: "Innovation Methodology Workshop",
    submittedDate: "2025-01-08",
    processedDate: "2025-01-09",
    status: "Rejected",
    points: 0,
    comments:
      "Certificate appears to be incomplete. Missing practical assessment results and project implementation documentation. Please resubmit with complete documentation including the innovation project you implemented.",
    processedBy: "Team Lead",
    sentToHOD: false,
    hodStatus: null,
    category: "Innovation",
    urgency: "Medium Priority",
  },
  {
    id: 11,
    employeeName: "Vikram Gupta",
    employeeId: "EMP006",
    type: "Custom Task",
    title: "Basic Computer Skills",
    submittedDate: "2025-01-06",
    processedDate: "2025-01-07",
    status: "Rejected",
    points: 0,
    comments:
      "This task does not meet the minimum complexity requirements for point allocation. Please consider more advanced training programs that align with your role and department objectives.",
    processedBy: "Team Lead",
    sentToHOD: false,
    hodStatus: null,
    category: "Basic Skills",
    urgency: "Low Priority",
  },
]

export default function LeadApprovals() {
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [rejectionComment, setRejectionComment] = useState("")
  const [customPoints, setCustomPoints] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const { toast } = useToast()

  const handleTaskApproval = (taskId: number, action: "approve" | "reject", points?: number) => {
    const task = pendingTasks.find((t) => t.id === taskId)
    if (action === "approve") {
      toast({
        title: "✅ Task Approved Successfully!",
        description: `"${task?.title}" has been approved and sent to HOD for final review. ${points ? `Points Assigned: ${points}` : `Points: ${task?.points}`}. Employee has been notified.`,
        className: "bg-gray-800 border-green-500 text-white",
      })
    } else {
      toast({
        title: "❌ Task Rejected",
        description: `"${task?.title}" has been rejected with detailed feedback. Employee has been notified and can resubmit with improvements.`,
        className: "bg-gray-800 border-red-500 text-white",
      })
    }
    setSelectedTask(null)
    setRejectionComment("")
    setCustomPoints("")
  }

  const filteredPending = pendingTasks.filter(
    (task) =>
      task.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (typeFilter === "all" || task.taskType === typeFilter) &&
      (priorityFilter === "all" || task.priority === priorityFilter),
  )

  const filteredAccepted = acceptedByLead.filter(
    (task) =>
      task.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || task.status.toLowerCase().includes(statusFilter)) &&
      (typeFilter === "all" || task.type.toLowerCase().includes(typeFilter)),
  )

  const filteredRejected = rejectedTasks.filter(
    (task) =>
      task.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (typeFilter === "all" || task.type.toLowerCase().includes(typeFilter)),
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 shadow-red-500/20 bg-red-500/5"
      case "medium":
        return "border-l-yellow-500 shadow-yellow-500/20 bg-yellow-500/5"
      case "low":
        return "border-l-green-500 shadow-green-500/20 bg-green-500/5"
      default:
        return "border-l-gray-500 shadow-gray-500/20 bg-gray-500/5"
    }
  }

  const getTaskTypeColor = (type: string) => {
    return type === "Pre-defined Task" ? "border-green-500 text-green-400" : "border-blue-500 text-blue-400"
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Final Approved":
        return <Badge className="bg-green-600 text-white font-bold">✅ Final Approved</Badge>
      case "Accepted by Lead":
        return <Badge className="bg-blue-600 text-white font-bold">📤 Sent to HOD</Badge>
      case "Rejected":
        return <Badge className="bg-red-600 text-white font-bold">❌ Rejected</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getHODStatusBadge = (status: string | null) => {
    switch (status) {
      case "Final Approved":
        return <Badge className="bg-green-600 text-white font-bold">🎉 HOD Approved</Badge>
      case "Pending":
        return <Badge className="bg-yellow-600 text-white font-bold animate-pulse">⏳ HOD Review</Badge>
      case "Rejected":
        return <Badge className="bg-red-600 text-white font-bold">🚫 HOD Rejected</Badge>
      default:
        return null
    }
  }

  return (
    <LeadLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-3 flex items-center">
                    <CheckCircle className="w-10 h-10 mr-4" />
                    Task Review & Approval Center
                  </h1>
                  <p className="text-orange-100 text-xl mb-6">
                    Comprehensive task management and approval workflow for your team
                  </p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-bold">{pendingTasks.length} Pending Review</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-bold">{acceptedByLead.length} Accepted</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <XCircle className="w-5 h-5 mr-2" />
                      <span className="font-bold">{rejectedTasks.length} Rejected</span>
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
                  ✅
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
            {
              title: "Pending Review",
              value: pendingTasks.length,
              icon: Clock,
              color: "text-yellow-500",
              bg: "bg-yellow-500/10",
              urgent: true,
            },
            { title: "Approved Today", value: 4, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" },
            { title: "Rejected Today", value: 2, icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
            { title: "Sent to HOD", value: 3, icon: Send, color: "text-blue-500", bg: "bg-blue-500/10" },
            {
              title: "High Priority",
              value: pendingTasks.filter((t) => t.priority === "high").length,
              icon: AlertCircle,
              color: "text-red-500",
              bg: "bg-red-500/10",
              urgent: true,
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
                className={`bg-gray-900 border-gray-700 hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 ${stat.urgent ? "ring-2 ring-red-500/50" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      {stat.urgent && stat.value > 0 && (
                        <p className="text-red-400 text-xs font-bold mt-1 animate-pulse">⚠️ Needs Attention</p>
                      )}
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-orange-500" />
                Filter & Search Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-gray-300 font-semibold">Search Tasks</Label>
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by employee name or task title..."
                    className="bg-gray-800 border-gray-600 text-white font-medium"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 font-semibold">Task Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white font-medium">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="predefined">Pre-defined Tasks</SelectItem>
                      <SelectItem value="custom">Custom Tasks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 font-semibold">Priority</Label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white font-medium">
                      <SelectValue placeholder="All Priorities" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 font-semibold">HOD Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white font-medium">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">HOD Pending</SelectItem>
                      <SelectItem value="approved">HOD Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700 p-1 h-auto">
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3 relative"
              >
                🚨 Pending Review ({filteredPending.length})
                {filteredPending.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="accepted"
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                ✅ Accepted by Lead ({filteredAccepted.length})
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                ❌ Rejected Tasks ({filteredRejected.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center text-2xl">
                    <AlertCircle className="w-6 h-6 mr-3 text-red-500 animate-pulse" />
                    Tasks Awaiting Your Immediate Review & Approval
                  </CardTitle>
                  <p className="text-gray-400 mt-2">
                    {filteredPending.length} tasks from your team members require your review and decision. High
                    priority tasks are marked with 🔥 and need urgent attention.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {filteredPending.map((task, index) => (
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
                              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                                <User className="w-7 h-7 text-white" />
                              </div>
                              <div>
                                <h3 className="text-white font-bold text-xl">{task.title}</h3>
                                <p className="text-gray-300 font-medium">
                                  {task.employeeName} • {task.employeeId}
                                </p>
                                <div className="flex items-center space-x-2 mt-2">
                                  {getUrgencyBadge(task.urgency)}
                                  <Badge variant="outline" className={getTaskTypeColor(task.type)}>
                                    {task.taskType === "predefined" ? "Pre-defined" : "Custom"}
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
                                <p className="text-gray-400 text-xs font-medium">Duration</p>
                                <p className="text-white font-medium">{task.duration}</p>
                              </div>
                              <div className="bg-gray-700/50 p-3 rounded-lg">
                                <p className="text-gray-400 text-xs font-medium">Provider</p>
                                <p className="text-white font-medium text-sm">{task.provider}</p>
                              </div>
                            </div>

                            <div className="bg-gray-700/30 p-4 rounded-lg mb-4">
                              <p className="text-gray-300 leading-relaxed">
                                <strong className="text-white">Description:</strong> {task.description}
                              </p>
                              {task.requirements && (
                                <div className="mt-3">
                                  <p className="text-white font-semibold mb-2">Requirements Completed:</p>
                                  <ul className="space-y-1">
                                    {task.requirements.map((req, idx) => (
                                      <li key={idx} className="text-gray-300 text-sm flex items-center">
                                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Submitted: {task.submittedDate}
                                </span>
                                <span className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full">
                                  <FileText className="w-4 h-4 mr-2" />
                                  {task.file} ({task.fileSize})
                                </span>
                                <span className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Completed: {task.completionDate}
                                </span>
                              </div>
                              <div className="flex space-x-3">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-gray-600 text-gray-300 hover:bg-gray-600 bg-transparent font-bold"
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      View Full Details
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="bg-gray-900 border-gray-700 max-w-3xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle className="text-white text-xl">{task.title}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-6">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-800 p-4 rounded-lg">
                                          <h4 className="text-white font-semibold mb-3">Employee Information</h4>
                                          <div className="space-y-2 text-gray-300 text-sm">
                                            <p>
                                              <strong>Name:</strong> {task.employeeName}
                                            </p>
                                            <p>
                                              <strong>Employee ID:</strong> {task.employeeId}
                                            </p>
                                            <p>
                                              <strong>Submitted Date:</strong> {task.submittedDate}
                                            </p>
                                            <p>
                                              <strong>Completion Date:</strong> {task.completionDate}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="bg-gray-800 p-4 rounded-lg">
                                          <h4 className="text-white font-semibold mb-3">Task Information</h4>
                                          <div className="space-y-2 text-gray-300 text-sm">
                                            <p>
                                              <strong>Type:</strong> {task.type}
                                            </p>
                                            <p>
                                              <strong>Category:</strong> {task.category}
                                            </p>
                                            <p>
                                              <strong>Duration:</strong> {task.duration}
                                            </p>
                                            <p>
                                              <strong>Provider:</strong> {task.provider}
                                            </p>
                                            <p>
                                              <strong>Points:</strong> {task.points || "To be determined"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="bg-gray-800 p-4 rounded-lg">
                                        <h4 className="text-white font-semibold mb-3">Detailed Description</h4>
                                        <p className="text-gray-300 text-sm leading-relaxed">{task.description}</p>
                                      </div>

                                      {task.requirements && (
                                        <div className="bg-gray-800 p-4 rounded-lg">
                                          <h4 className="text-white font-semibold mb-3">Requirements Completed</h4>
                                          <ul className="space-y-2">
                                            {task.requirements.map((req, idx) => (
                                              <li key={idx} className="text-gray-300 text-sm flex items-center">
                                                <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                                {req}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}

                                      <div className="bg-gray-800 p-4 rounded-lg">
                                        <h4 className="text-white font-semibold mb-3">Supporting Documentation</h4>
                                        <div className="flex items-center space-x-3">
                                          <FileText className="w-8 h-8 text-blue-400" />
                                          <div>
                                            <p className="text-white font-medium">{task.file}</p>
                                            <p className="text-gray-400 text-sm">File Size: {task.fileSize}</p>
                                          </div>
                                        </div>
                                      </div>

                                      <div className={`p-4 rounded-lg border-l-4 ${getPriorityColor(task.priority)}`}>
                                        <div className="flex items-center space-x-2 mb-2">
                                          {getUrgencyBadge(task.urgency)}
                                          <Badge variant="outline" className={getTaskTypeColor(task.type)}>
                                            {task.taskType === "predefined" ? "Pre-defined Task" : "Custom Task"}
                                          </Badge>
                                        </div>
                                        <p className="text-gray-300 text-sm">
                                          {task.taskType === "predefined"
                                            ? "This is a pre-defined task with fixed point value. Review the completion and approve if satisfactory."
                                            : "This is a custom task. Please review the content and assign appropriate points based on complexity and learning outcomes."}
                                        </p>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                {task.taskType === "custom" ? (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        className="bg-green-600 hover:bg-green-700 font-bold shadow-lg hover:shadow-green-500/20"
                                        size="sm"
                                      >
                                        <Award className="w-4 h-4 mr-2" />
                                        Set Points & Approve
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                                      <DialogHeader>
                                        <DialogTitle className="text-white">
                                          Approve Custom Task & Assign Points
                                        </DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-6">
                                        <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-lg">
                                          <h4 className="text-blue-300 font-semibold mb-2">Task Summary</h4>
                                          <p className="text-blue-200 text-sm mb-2">
                                            <strong>Employee:</strong> {task.employeeName}
                                          </p>
                                          <p className="text-blue-200 text-sm mb-2">
                                            <strong>Task:</strong> {task.title}
                                          </p>
                                          <p className="text-blue-200 text-sm">
                                            <strong>Category:</strong> {task.category}
                                          </p>
                                        </div>

                                        <div className="space-y-4">
                                          <div>
                                            <Label htmlFor="custom-points" className="text-gray-300 font-semibold">
                                              Point Value Assignment
                                            </Label>
                                            <Input
                                              id="custom-points"
                                              type="number"
                                              value={customPoints}
                                              onChange={(e) => setCustomPoints(e.target.value)}
                                              placeholder="Enter point value (e.g., 500)"
                                              className="bg-gray-800 border-gray-600 text-white"
                                              min="0"
                                              max="2000"
                                            />
                                            <div className="mt-2 text-sm text-gray-400">
                                              <p>
                                                <strong>Recommended Point Ranges:</strong>
                                              </p>
                                              <ul className="mt-1 space-y-1">
                                                <li>• Basic Skills (200-400 points)</li>
                                                <li>• Intermediate Training (400-800 points)</li>
                                                <li>• Advanced Certification (800-1500 points)</li>
                                                <li>• Complex Projects (1000-2000 points)</li>
                                              </ul>
                                            </div>
                                          </div>

                                          <div>
                                            <Label htmlFor="approval-comments" className="text-gray-300 font-semibold">
                                              Approval Comments (Optional)
                                            </Label>
                                            <Textarea
                                              id="approval-comments"
                                              placeholder="Add comments about the task completion, quality, or learning outcomes..."
                                              className="bg-gray-800 border-gray-600 text-white min-h-[80px]"
                                            />
                                          </div>
                                        </div>

                                        <div className="bg-green-900/30 border border-green-700 p-4 rounded-lg">
                                          <p className="text-green-300 text-sm">
                                            <strong>Next Step:</strong> Once approved, this task will be sent to HOD for
                                            final review and point confirmation. The employee will be notified of your
                                            decision.
                                          </p>
                                        </div>

                                        <div className="flex justify-end space-x-3">
                                          <Button
                                            variant="outline"
                                            onClick={() => {
                                              setCustomPoints("")
                                              setSelectedTask(null)
                                            }}
                                            className="font-bold"
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            onClick={() =>
                                              handleTaskApproval(task.id, "approve", Number.parseInt(customPoints))
                                            }
                                            disabled={!customPoints || Number.parseInt(customPoints) <= 0}
                                            className="bg-green-600 hover:bg-green-700 font-bold"
                                          >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Approve with {customPoints} Points
                                          </Button>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                ) : (
                                  <Button
                                    onClick={() => handleTaskApproval(task.id, "approve", task.points)}
                                    className="bg-green-600 hover:bg-green-700 font-bold shadow-lg hover:shadow-green-500/20"
                                    size="sm"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve & Send to HOD ({task.points} pts)
                                  </Button>
                                )}

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => setSelectedTask(task)}
                                      className="font-bold shadow-lg hover:shadow-red-500/20"
                                    >
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Reject Task
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle className="text-white">Reject Task Submission</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-6">
                                      <div className="bg-red-900/30 border border-red-700 p-4 rounded-lg">
                                        <h4 className="text-red-300 font-semibold mb-2">Task to be Rejected</h4>
                                        <p className="text-red-200 text-sm mb-2">
                                          <strong>Employee:</strong> {task.employeeName}
                                        </p>
                                        <p className="text-red-200 text-sm mb-2">
                                          <strong>Task:</strong> {task.title}
                                        </p>
                                        <p className="text-red-200 text-sm">
                                          <strong>Submitted:</strong> {task.submittedDate}
                                        </p>
                                      </div>

                                      <div>
                                        <Label htmlFor="rejection-reason" className="text-gray-300 font-semibold">
                                          Detailed Rejection Reason *
                                        </Label>
                                        <Textarea
                                          id="rejection-reason"
                                          value={rejectionComment}
                                          onChange={(e) => setRejectionComment(e.target.value)}
                                          placeholder="Please provide specific reasons for rejection and guidance for improvement. Be constructive and helpful..."
                                          className="bg-gray-800 border-gray-600 text-white min-h-[120px]"
                                          required
                                        />
                                        <p className="text-gray-400 text-sm mt-2">
                                          Your feedback will help the employee understand what needs to be improved for
                                          resubmission.
                                        </p>
                                      </div>

                                      <div className="bg-yellow-900/30 border border-yellow-700 p-4 rounded-lg">
                                        <p className="text-yellow-300 text-sm">
                                          <strong>Note:</strong> The employee will be notified of the rejection with
                                          your comments and can resubmit the task with improvements. Consider providing
                                          specific actionable feedback.
                                        </p>
                                      </div>

                                      <div className="flex justify-end space-x-3">
                                        <Button
                                          variant="outline"
                                          onClick={() => {
                                            setSelectedTask(null)
                                            setRejectionComment("")
                                          }}
                                          className="font-bold"
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          variant="destructive"
                                          onClick={() => handleTaskApproval(task.id, "reject")}
                                          disabled={!rejectionComment.trim()}
                                          className="font-bold"
                                        >
                                          <XCircle className="w-4 h-4 mr-2" />
                                          Reject with Feedback
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {filteredPending.length === 0 && (
                      <div className="text-center py-16">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                        <h3 className="text-white text-2xl font-bold mb-3">All Tasks Reviewed! 🎉</h3>
                        <p className="text-gray-400 text-lg">
                          {pendingTasks.length === 0
                            ? "No pending tasks require your approval at this time."
                            : "No tasks match your current filter criteria. Try adjusting the filters above."}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accepted">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">✅ Tasks Accepted by Lead - Sent to HOD</CardTitle>
                  <p className="text-gray-400 mt-2">
                    Tasks you have approved and forwarded to HOD for final review and point confirmation.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredAccepted.map((task, index) => (
                      <motion.div
                        key={task.id}
                        className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-green-500/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-white font-bold text-lg">{task.title}</h3>
                                <p className="text-gray-400 font-medium">
                                  {task.employeeName} • {task.employeeId}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 mb-3">
                              <Badge variant="outline" className={getTaskTypeColor(task.type)}>
                                {task.type}
                              </Badge>
                              {getStatusBadge(task.status)}
                              {task.sentToHOD && getHODStatusBadge(task.hodStatus)}
                              <Badge className="bg-green-600 text-white font-bold">+{task.points} pts</Badge>
                              {getUrgencyBadge(task.urgency)}
                            </div>

                            <div className="text-gray-400 text-sm space-y-1 mb-3 bg-gray-700/30 p-3 rounded-lg">
                              <p>
                                <strong>Submitted:</strong> {task.submittedDate}
                              </p>
                              <p>
                                <strong>Approved by Lead:</strong> {task.processedDate}
                              </p>
                              <p>
                                <strong>Current Stage:</strong>{" "}
                                {task.hodStatus === "Final Approved"
                                  ? "✅ Completed - Points Awarded to Employee"
                                  : "⏳ Awaiting HOD Final Approval"}
                              </p>
                              {task.hodStatus === "Final Approved" && (
                                <div className="flex items-center text-green-400 font-bold">
                                  <ArrowRight className="w-4 h-4 mr-2" />
                                  Employee Notified & Points Successfully Awarded
                                </div>
                              )}
                            </div>

                            {task.comments && (
                              <div className="bg-green-900/30 border border-green-700 p-3 rounded-lg">
                                <p className="text-green-300 text-sm">
                                  <strong>Your Approval Comments:</strong> {task.comments}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {filteredAccepted.length === 0 && (
                      <div className="text-center py-12">
                        <Send className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-white text-xl font-bold mb-2">No Accepted Tasks</h3>
                        <p className="text-gray-400">
                          {acceptedByLead.length === 0
                            ? "You haven't approved any tasks yet."
                            : "No accepted tasks match your current filter criteria."}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rejected">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">❌ Rejected Tasks</CardTitle>
                  <p className="text-gray-400 mt-2">
                    Tasks that were rejected with feedback. Employees can review the feedback and resubmit with
                    improvements.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredRejected.map((task, index) => (
                      <motion.div
                        key={task.id}
                        className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-red-500/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                                <XCircle className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-white font-bold text-lg">{task.title}</h3>
                                <p className="text-gray-400 font-medium">
                                  {task.employeeName} • {task.employeeId}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 mb-3">
                              <Badge variant="outline" className={getTaskTypeColor(task.type)}>
                                {task.type}
                              </Badge>
                              {getStatusBadge(task.status)}
                              {getUrgencyBadge(task.urgency)}
                            </div>

                            <div className="text-gray-400 text-sm space-y-1 mb-3 bg-gray-700/30 p-3 rounded-lg">
                              <p>
                                <strong>Submitted:</strong> {task.submittedDate}
                              </p>
                              <p>
                                <strong>Rejected:</strong> {task.processedDate}
                              </p>
                              <p>
                                <strong>Rejected by:</strong> {task.processedBy}
                              </p>
                              <div className="flex items-center text-red-400 font-bold">
                                <ArrowRight className="w-4 h-4 mr-2" />
                                Employee Notified - Can Resubmit with Improvements
                              </div>
                            </div>

                            {task.comments && (
                              <div className="bg-red-900/30 border border-red-700 p-3 rounded-lg">
                                <p className="text-red-300 text-sm">
                                  <strong>Rejection Feedback:</strong> {task.comments}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {filteredRejected.length === 0 && (
                      <div className="text-center py-12">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-white text-xl font-bold mb-2">No Rejected Tasks</h3>
                        <p className="text-gray-400">
                          {rejectedTasks.length === 0
                            ? "You haven't rejected any tasks. Great job maintaining quality standards!"
                            : "No rejected tasks match your current filter criteria."}
                        </p>
                      </div>
                    )}
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
