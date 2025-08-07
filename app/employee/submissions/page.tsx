"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { FileText, Search, Calendar, CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react"
import { EmployeeLayout } from "@/components/layouts/employee-layout"

const submissionsData = [
  {
    id: 1,
    title: "Advanced Safety Training",
    type: "Certification",
    status: "Approved",
    points: 1000,
    submittedDate: "2025-01-15",
    approvedDate: "2025-01-16",
    approvedBy: "Team Lead",
    file: "safety_cert.pdf",
    comments: "Excellent completion of safety training program.",
  },
  {
    id: 2,
    title: "Leadership Skills Development",
    type: "Workshop",
    status: "Pending",
    points: 500,
    submittedDate: "2025-01-10",
    approvedDate: null,
    approvedBy: null,
    file: "leadership_workshop.pdf",
    comments: null,
  },
  {
    id: 3,
    title: "Technical Excellence Program",
    type: "Training",
    status: "Approved",
    points: 800,
    submittedDate: "2025-01-05",
    approvedDate: "2025-01-07",
    approvedBy: "HOD",
    file: "tech_training.pdf",
    comments: "Outstanding technical skills demonstration.",
  },
  {
    id: 4,
    title: "Quality Management System",
    type: "Certification",
    status: "Rejected",
    points: 0,
    submittedDate: "2024-12-28",
    approvedDate: "2024-12-30",
    approvedBy: "Team Lead",
    file: "qms_cert.pdf",
    comments: "Certificate appears to be incomplete. Please resubmit with all required documentation.",
  },
  {
    id: 5,
    title: "Innovation Workshop 2024",
    type: "Workshop",
    status: "Approved",
    points: 600,
    submittedDate: "2024-12-20",
    approvedDate: "2024-12-22",
    approvedBy: "HOD",
    file: "innovation_workshop.pdf",
    comments: "Great participation and innovative ideas presented.",
  },
]

const analyticsData = {
  monthlySubmissions: [
    { month: "Jul", submitted: 3, approved: 2, rejected: 1 },
    { month: "Aug", submitted: 4, approved: 3, rejected: 1 },
    { month: "Sep", submitted: 5, approved: 4, rejected: 1 },
    { month: "Oct", submitted: 3, approved: 3, rejected: 0 },
    { month: "Nov", submitted: 6, approved: 5, rejected: 1 },
    { month: "Dec", submitted: 4, approved: 3, rejected: 1 },
  ],
  statusDistribution: [
    { name: "Approved", value: 65, color: "#10B981" },
    { name: "Pending", value: 20, color: "#F59E0B" },
    { name: "Rejected", value: 15, color: "#EF4444" },
  ],
  typeDistribution: [
    { name: "Certifications", value: 45, color: "#8B5CF6" },
    { name: "Workshops", value: 35, color: "#3B82F6" },
    { name: "Training", value: 20, color: "#10B981" },
  ],
}

export default function EmployeeSubmissions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredSubmissions = submissionsData.filter(
    (submission) =>
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "all" || submission.status.toLowerCase() === statusFilter) &&
      (typeFilter === "all" || submission.type.toLowerCase() === typeFilter),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "Rejected":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "Pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-600 text-white">Approved</Badge>
      case "Rejected":
        return <Badge className="bg-red-600 text-white">Rejected</Badge>
      case "Pending":
        return <Badge className="bg-yellow-600 text-white">Pending</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <EmployeeLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 border-0 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    <FileText className="w-8 h-8 mr-3" />
                    My Submissions
                  </h1>
                  <p className="text-blue-100 text-lg">Track your submitted activities and their approval status</p>
                </div>
                <motion.div
                  className="text-8xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  📋
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
            { title: "Total Submissions", value: submissionsData.length, icon: FileText, color: "text-blue-500" },
            {
              title: "Approved",
              value: submissionsData.filter((s) => s.status === "Approved").length,
              icon: CheckCircle,
              color: "text-green-500",
            },
            {
              title: "Pending",
              value: submissionsData.filter((s) => s.status === "Pending").length,
              icon: Clock,
              color: "text-yellow-500",
            },
            {
              title: "Total Points",
              value: submissionsData.filter((s) => s.status === "Approved").reduce((sum, s) => sum + s.points, 0),
              icon: TrendingUp,
              color: "text-purple-500",
            },
          ].map((stat, index) => (
            <Card
              key={stat.title}
              className="bg-gray-900 border-gray-700 hover:border-green-500 transition-all duration-300"
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
          <Tabs defaultValue="submissions" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="submissions" className="data-[state=active]:bg-green-600">
                All Submissions
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600">
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="submissions">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Submission History</CardTitle>
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search submissions..."
                          className="bg-gray-800 border-gray-600 text-white pl-10"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-full md:w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-full md:w-40">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="certification">Certification</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredSubmissions.map((submission, index) => (
                      <motion.div
                        key={submission.id}
                        className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            {getStatusIcon(submission.status)}
                            <div className="flex-1">
                              <h3 className="text-white font-semibold text-lg mb-2">{submission.title}</h3>
                              <div className="flex items-center space-x-4 mb-3">
                                <Badge variant="outline" className="border-blue-500 text-blue-400">
                                  {submission.type}
                                </Badge>
                                {getStatusBadge(submission.status)}
                                {submission.status === "Approved" && (
                                  <Badge className="bg-green-600 text-white">+{submission.points} pts</Badge>
                                )}
                              </div>
                              <div className="text-gray-400 text-sm space-y-1">
                                <p className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Submitted: {submission.submittedDate}
                                </p>
                                {submission.approvedDate && (
                                  <p className="flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    {submission.status === "Approved" ? "Approved" : "Processed"}:{" "}
                                    {submission.approvedDate} by {submission.approvedBy}
                                  </p>
                                )}
                                <p className="text-gray-500">File: {submission.file}</p>
                              </div>
                              {submission.comments && (
                                <div
                                  className={`mt-3 p-3 rounded-lg ${
                                    submission.status === "Approved"
                                      ? "bg-green-900/30 border border-green-700"
                                      : "bg-red-900/30 border border-red-700"
                                  }`}
                                >
                                  <p
                                    className={`text-sm ${
                                      submission.status === "Approved" ? "text-green-300" : "text-red-300"
                                    }`}
                                  >
                                    <strong>Comments:</strong> {submission.comments}
                                  </p>
                                </div>
                              )}
                            </div>
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
                    <CardTitle className="text-white">Monthly Submission Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData.monthlySubmissions}>
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
                        <Bar dataKey="submitted" fill="#3B82F6" name="Submitted" />
                        <Bar dataKey="approved" fill="#10B981" name="Approved" />
                        <Bar dataKey="rejected" fill="#EF4444" name="Rejected" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Status Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={analyticsData.statusDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {analyticsData.statusDistribution.map((entry, index) => (
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
                    <CardTitle className="text-white">Activity Type Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData.typeDistribution} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis type="number" stroke="#9CA3AF" />
                        <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="value" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </EmployeeLayout>
  )
}
