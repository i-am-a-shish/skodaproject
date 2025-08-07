"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  Building,
  Users,
  Award,
  Settings,
  Download,
  Search,
  Plus,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  FileText,
  Calendar,
} from "lucide-react"
import { HodLayout } from "@/components/layouts/hod-layout"
import { useToast } from "@/hooks/use-toast"

// Dummy data
const departmentData = {
  totalEmployees: 156,
  totalTeams: 12,
  avgDepartmentScore: 3750,
  topTeam: "Training-A",
  monthlyOverview: [
    { month: "Jul", avgScore: 3200, submissions: 145 },
    { month: "Aug", avgScore: 3350, submissions: 168 },
    { month: "Sep", avgScore: 3500, submissions: 192 },
    { month: "Oct", avgScore: 3650, submissions: 185 },
    { month: "Nov", avgScore: 3750, submissions: 210 },
    { month: "Dec", avgScore: 3850, submissions: 225 },
  ],
  teamPerformance: [
    { team: "Training-A", score: 4200, members: 12 },
    { team: "Training-B", score: 3950, members: 15 },
    { team: "Training-C", score: 3800, members: 11 },
    { team: "Training-D", score: 3650, members: 13 },
    { team: "Training-E", score: 3500, members: 14 },
  ],
  activityDistribution: [
    { name: "Certifications", value: 45, color: "#10B981" },
    { name: "Workshops", value: 30, color: "#3B82F6" },
    { name: "Training", value: 25, color: "#8B5CF6" },
  ],
  globalLeaderboard: [
    { rank: 1, name: "Ashish Suryawanshi", team: "Training-A", points: 4300 },
    { rank: 2, name: "Priya Sharma", team: "Training-A", points: 4100 },
    { rank: 3, name: "Rahul Kumar", team: "Training-B", points: 3950 },
    { rank: 4, name: "Sneha Patel", team: "Training-C", points: 3800 },
    { rank: 5, name: "Amit Singh", team: "Training-A", points: 3650 },
  ],
  pointsConfig: [
    { id: 1, activity: "Basic Certification", points: 500 },
    { id: 2, activity: "Advanced Certification", points: 1000 },
    { id: 3, activity: "Workshop Attendance", points: 300 },
    { id: 4, activity: "Training Completion", points: 800 },
    { id: 5, activity: "Leadership Program", points: 1200 },
  ],
}

const hodReviewTasks = [
  {
    id: 1,
    employeeName: "Ashish Suryawanshi",
    employeeId: "EMP001",
    teamLead: "Rajesh Kumar",
    type: "Pre-defined Task",
    title: "Advanced Safety Training",
    description:
      "Complete comprehensive safety training program with practical assessments and theoretical examinations.",
    submittedDate: "2025-01-15",
    leadApprovedDate: "2025-01-16",
    points: 1000,
    file: "safety_cert.pdf",
    fileSize: "2.3 MB",
    category: "Safety",
    leadComments: "Excellent completion of safety training program. All requirements met.",
    priority: "high",
  },
  {
    id: 2,
    employeeName: "Priya Sharma",
    employeeId: "EMP002",
    teamLead: "Sunita Verma",
    type: "Custom Task",
    title: "Leadership Skills Development",
    description: "Participated in intensive leadership workshop focusing on team management and communication skills.",
    submittedDate: "2025-01-14",
    leadApprovedDate: "2025-01-15",
    points: 650,
    file: "leadership_workshop.pdf",
    fileSize: "1.8 MB",
    category: "Leadership",
    leadComments: "Good participation in leadership workshop. Custom task well executed with clear learning outcomes.",
    priority: "medium",
  },
]

const completedTasks = [
  {
    id: 3,
    employeeName: "Rajesh Patel",
    employeeId: "EMP004",
    teamLead: "Vikash Singh",
    type: "Pre-defined Task",
    title: "Quality Management System",
    submittedDate: "2025-01-10",
    leadApprovedDate: "2025-01-12",
    hodApprovedDate: "2025-01-13",
    status: "Final Approved",
    points: 800,
    hodComments: "Excellent work on QMS implementation. Points awarded and employee notified.",
    category: "Quality",
  },
]

export default function HodDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("all")
  const [newActivity, setNewActivity] = useState({ activity: "", points: "" })
  const [editingActivity, setEditingActivity] = useState<any>(null)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [hodComments, setHodComments] = useState("")
  const { toast } = useToast()

  const filteredLeaderboard = departmentData.globalLeaderboard.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTeam === "all" || member.team === selectedTeam),
  )

  const handleFinalApproval = (taskId: number, action: "approve" | "reject") => {
    if (action === "approve") {
      toast({
        title: "🎉 Final Approval Granted!",
        description:
          "Task has been finally approved. Points have been awarded to the employee and all parties have been notified.",
        className: "bg-gray-800 border-green-500 text-white",
      })
    } else {
      toast({
        title: "🚫 Task Rejected by HOD",
        description: "Task has been rejected at final review stage. Employee and Team Lead have been notified.",
        className: "bg-gray-800 border-red-500 text-white",
      })
    }
    setSelectedTask(null)
    setHodComments("")
  }

  const handleAddActivity = () => {
    if (newActivity.activity && newActivity.points) {
      toast({
        title: "✅ Activity Added",
        description: `${newActivity.activity} with ${newActivity.points} points has been added to the system.`,
        className: "bg-gray-800 border-green-500 text-white",
      })
      setNewActivity({ activity: "", points: "" })
    }
  }

  const handleEditActivity = (activity: any) => {
    toast({
      title: "✅ Activity Updated",
      description: `${activity.activity} has been updated successfully.`,
      className: "bg-gray-800 border-green-500 text-white",
    })
    setEditingActivity(null)
  }

  const handleExportPDF = () => {
    toast({
      title: "📄 Export Started",
      description: "Your report is being generated and will be downloaded shortly.",
      className: "bg-gray-800 border-blue-500 text-white",
    })
  }

  return (
    <HodLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-3">HOD Dashboard 👨‍💼</h1>
                  <p className="text-green-100 text-xl mb-6">Department Performance & Task Management Overview</p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Users className="w-5 h-5 mr-2" />
                      <span className="font-bold">{departmentData.totalEmployees} Employees</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Building className="w-5 h-5 mr-2" />
                      <span className="font-bold">{departmentData.totalTeams} Teams</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-bold">{hodReviewTasks.length} Pending Review</span>
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
                  🏢
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
              title: "Total Employees",
              value: departmentData.totalEmployees,
              icon: Users,
              color: "text-blue-500",
              bg: "bg-blue-500/10",
            },
            {
              title: "Active Teams",
              value: departmentData.totalTeams,
              icon: Building,
              color: "text-green-500",
              bg: "bg-green-500/10",
            },
            {
              title: "Pending HOD Review",
              value: hodReviewTasks.length,
              icon: Clock,
              color: "text-yellow-500",
              bg: "bg-yellow-500/10",
            },
            { title: "Completed Today", value: 5, icon: CheckCircle, color: "text-purple-500", bg: "bg-purple-500/10" },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-gray-900 border-gray-700 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
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
          <Tabs defaultValue="review" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700 p-1 h-auto">
              <TabsTrigger
                value="review"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                🔍 HOD Review ({hodReviewTasks.length})
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                📊 Department Overview
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                🏆 Global Leaderboard
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                ⚙️ Point Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="review">
              <div className="space-y-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-2xl">
                      <Clock className="w-6 h-6 mr-3 text-yellow-500" />
                      Tasks Pending Final HOD Approval
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {hodReviewTasks.map((task, index) => (
                        <motion.div
                          key={task.id}
                          className="p-6 bg-gray-800 rounded-xl border-l-4 border-l-yellow-500 hover:bg-gray-700 transition-all duration-300 shadow-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                                  <CheckCircle className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-white font-bold text-xl">{task.title}</h3>
                                  <p className="text-gray-300 font-medium">
                                    {task.employeeName} • {task.employeeId} • Team Lead: {task.teamLead}
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div className="bg-gray-700/50 p-3 rounded-lg">
                                  <p className="text-gray-400 text-xs font-medium">Task Type</p>
                                  <Badge
                                    variant="outline"
                                    className={
                                      task.type === "Pre-defined Task"
                                        ? "border-green-500 text-green-400"
                                        : "border-blue-500 text-blue-400"
                                    }
                                  >
                                    {task.type === "Pre-defined Task" ? "Pre-defined" : "Custom"}
                                  </Badge>
                                </div>
                                <div className="bg-gray-700/50 p-3 rounded-lg">
                                  <p className="text-gray-400 text-xs font-medium">Points</p>
                                  <p className="text-green-400 font-bold text-lg">+{task.points}</p>
                                </div>
                                <div className="bg-gray-700/50 p-3 rounded-lg">
                                  <p className="text-gray-400 text-xs font-medium">Category</p>
                                  <p className="text-white font-medium">{task.category}</p>
                                </div>
                                <div className="bg-gray-700/50 p-3 rounded-lg">
                                  <p className="text-gray-400 text-xs font-medium">Priority</p>
                                  <Badge
                                    className={
                                      task.priority === "high"
                                        ? "bg-red-600"
                                        : task.priority === "medium"
                                          ? "bg-yellow-600"
                                          : "bg-green-600"
                                    }
                                  >
                                    {task.priority}
                                  </Badge>
                                </div>
                              </div>

                              <p className="text-gray-300 mb-4 leading-relaxed">{task.description}</p>

                              <div className="bg-blue-900/30 border border-blue-700 p-3 rounded-lg mb-4">
                                <p className="text-blue-300 text-sm">
                                  <strong>Team Lead Comments:</strong> {task.leadComments}
                                </p>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                  <span className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Submitted: {task.submittedDate}
                                  </span>
                                  <span className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Lead Approved: {task.leadApprovedDate}
                                  </span>
                                  <span className="flex items-center bg-gray-700/50 px-3 py-1 rounded-full">
                                    <FileText className="w-4 h-4 mr-2" />
                                    {task.file} ({task.fileSize})
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
                                        View Details
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-900 border-gray-700 max-w-3xl">
                                      <DialogHeader>
                                        <DialogTitle className="text-white text-xl">{task.title}</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-4">
                                          <div className="bg-gray-800 p-4 rounded-lg">
                                            <h4 className="text-white font-semibold mb-2">Employee Details</h4>
                                            <div className="space-y-1 text-gray-300 text-sm">
                                              <p>
                                                <strong>Name:</strong> {task.employeeName}
                                              </p>
                                              <p>
                                                <strong>ID:</strong> {task.employeeId}
                                              </p>
                                              <p>
                                                <strong>Team Lead:</strong> {task.teamLead}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="bg-gray-800 p-4 rounded-lg">
                                            <h4 className="text-white font-semibold mb-2">Task Details</h4>
                                            <div className="space-y-1 text-gray-300 text-sm">
                                              <p>
                                                <strong>Type:</strong> {task.type}
                                              </p>
                                              <p>
                                                <strong>Category:</strong> {task.category}
                                              </p>
                                              <p>
                                                <strong>Points:</strong> {task.points}
                                              </p>
                                              <p>
                                                <strong>Priority:</strong> {task.priority}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="bg-gray-800 p-4 rounded-lg">
                                            <h4 className="text-white font-semibold mb-2">Timeline</h4>
                                            <div className="space-y-1 text-gray-300 text-sm">
                                              <p>
                                                <strong>Submitted:</strong> {task.submittedDate}
                                              </p>
                                              <p>
                                                <strong>Lead Approved:</strong> {task.leadApprovedDate}
                                              </p>
                                              <p>
                                                <strong>File:</strong> {task.file}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="bg-gray-800 p-4 rounded-lg">
                                          <h4 className="text-white font-semibold mb-2">Task Description</h4>
                                          <p className="text-gray-300 text-sm">{task.description}</p>
                                        </div>
                                        <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-lg">
                                          <h4 className="text-blue-300 font-semibold mb-2">Team Lead Comments</h4>
                                          <p className="text-blue-300 text-sm">{task.leadComments}</p>
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>

                                  <Button
                                    onClick={() => handleFinalApproval(task.id, "approve")}
                                    className="bg-green-600 hover:bg-green-700 font-bold shadow-lg hover:shadow-green-500/20"
                                    size="sm"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Final Approve & Award Points
                                  </Button>

                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => setSelectedTask(task)}
                                        className="font-bold shadow-lg hover:shadow-red-500/20"
                                      >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Reject
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-gray-900 border-gray-700">
                                      <DialogHeader>
                                        <DialogTitle className="text-white">Reject Task - Final Review</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-4">
                                        <p className="text-gray-300">
                                          Please provide a detailed reason for rejecting this task at the final review
                                          stage:
                                        </p>
                                        <Textarea
                                          value={hodComments}
                                          onChange={(e) => setHodComments(e.target.value)}
                                          placeholder="Enter detailed rejection reason. This will be sent to both the employee and team lead..."
                                          className="bg-gray-800 border-gray-600 text-white min-h-[120px]"
                                        />
                                        <div className="bg-red-900/30 border border-red-700 p-3 rounded-lg">
                                          <p className="text-red-300 text-sm">
                                            <strong>Note:</strong> Rejecting at this stage will remove the task from the
                                            active queue and notify both the employee and team lead.
                                          </p>
                                        </div>
                                        <div className="flex justify-end space-x-2">
                                          <Button
                                            variant="outline"
                                            onClick={() => {
                                              setSelectedTask(null)
                                              setHodComments("")
                                            }}
                                            className="font-bold"
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            variant="destructive"
                                            onClick={() => handleFinalApproval(task.id, "reject")}
                                            disabled={!hodComments.trim()}
                                            className="font-bold"
                                          >
                                            Final Reject
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
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center text-xl">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Recently Completed Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {completedTasks.map((task, index) => (
                        <motion.div
                          key={task.id}
                          className="p-4 bg-gray-800 rounded-lg border border-green-700/50"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="text-white font-semibold">{task.title}</h4>
                                <p className="text-gray-400 text-sm">
                                  {task.employeeName} • {task.employeeId} • Team Lead: {task.teamLead}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-green-600 text-white font-bold mb-1">✅ Final Approved</Badge>
                              <p className="text-green-400 font-bold">+{task.points} points awarded</p>
                              <p className="text-gray-400 text-xs">Completed: {task.hodApprovedDate}</p>
                            </div>
                          </div>
                          {task.hodComments && (
                            <div className="mt-3 bg-green-900/30 border border-green-700 p-3 rounded-lg">
                              <p className="text-green-300 text-sm">
                                <strong>HOD Comments:</strong> {task.hodComments}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Department Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={departmentData.monthlyOverview}>
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
                    <CardTitle className="text-white">Activity Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={departmentData.activityDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {departmentData.activityDistribution.map((entry, index) => (
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
                    <CardTitle className="text-white">Team Performance Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={departmentData.teamPerformance}>
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
                        <Bar dataKey="score" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="leaderboard">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-green-500" />
                      Global Leaderboard
                    </span>
                    <Button onClick={handleExportPDF} className="bg-green-600 hover:bg-green-700 font-bold">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <Label htmlFor="search" className="text-gray-300 font-semibold">
                        Search Employee
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="search"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search by name..."
                          className="bg-gray-800 border-gray-600 text-white pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="team-filter" className="text-gray-300 font-semibold">
                        Filter by Team
                      </Label>
                      <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Select team" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="all">All Teams</SelectItem>
                          <SelectItem value="Training-A">Training-A</SelectItem>
                          <SelectItem value="Training-B">Training-B</SelectItem>
                          <SelectItem value="Training-C">Training-C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredLeaderboard.map((member, index) => (
                      <motion.div
                        key={member.name}
                        className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
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
                          <div>
                            <h4 className="text-white font-bold text-lg">{member.name}</h4>
                            <p className="text-gray-400 font-medium">{member.team}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold text-xl">{member.points.toLocaleString()}</p>
                          <p className="text-gray-400 text-sm">points</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span className="flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-green-500" />
                      Point Configuration
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700 font-bold">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Activity
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700">
                        <DialogHeader>
                          <DialogTitle className="text-white">Add New Activity</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="activity-name" className="text-gray-300 font-semibold">
                              Activity Name
                            </Label>
                            <Input
                              id="activity-name"
                              value={newActivity.activity}
                              onChange={(e) => setNewActivity({ ...newActivity, activity: e.target.value })}
                              placeholder="Enter activity name"
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="activity-points" className="text-gray-300 font-semibold">
                              Points
                            </Label>
                            <Input
                              id="activity-points"
                              type="number"
                              value={newActivity.points}
                              onChange={(e) => setNewActivity({ ...newActivity, points: e.target.value })}
                              placeholder="Enter points value"
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setNewActivity({ activity: "", points: "" })}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddActivity} className="bg-green-600 hover:bg-green-700 font-bold">
                              Add Activity
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentData.pointsConfig.map((config) => (
                      <div
                        key={config.id}
                        className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <div>
                          <h4 className="text-white font-bold text-lg">{config.activity}</h4>
                          <p className="text-green-400 font-bold text-xl">{config.points} points</p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingActivity(config)}
                              className="border-gray-600 text-gray-300 font-bold"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-700">
                            <DialogHeader>
                              <DialogTitle className="text-white">Edit Activity</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="edit-activity-name" className="text-gray-300 font-semibold">
                                  Activity Name
                                </Label>
                                <Input
                                  id="edit-activity-name"
                                  defaultValue={config.activity}
                                  className="bg-gray-800 border-gray-600 text-white"
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-activity-points" className="text-gray-300 font-semibold">
                                  Points
                                </Label>
                                <Input
                                  id="edit-activity-points"
                                  type="number"
                                  defaultValue={config.points}
                                  className="bg-gray-800 border-gray-600 text-white"
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setEditingActivity(null)}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => handleEditActivity(config)}
                                  className="bg-green-600 hover:bg-green-700 font-bold"
                                >
                                  Update Activity
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
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
