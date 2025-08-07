"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { User, Trophy, TrendingUp, Clock, Award, Target, CheckCircle, FileText } from "lucide-react"
import { EmployeeLayout } from "@/components/layouts/employee-layout"
import { UploadForm } from "@/components/upload-form"
import { LeaderboardPreview } from "@/components/leaderboard-preview"
import { TaskSelector } from "@/components/task-selector"

// Dummy data
const employeeData = {
  name: "Ashish Suryawanshi",
  employeeId: "EMP001",
  team: "Training-A",
  currentRank: 5,
  totalPoints: 3650,
  monthlyTarget: 4000,
  completedTasks: 12,
  pendingTasks: 3,
  approvedTasks: 9,
  rejectedTasks: 1,
  monthlyProgress: [
    { month: "Jul", points: 2800, target: 3000 },
    { month: "Aug", points: 3100, target: 3200 },
    { month: "Sep", points: 3350, target: 3400 },
    { month: "Oct", points: 3500, target: 3600 },
    { month: "Nov", points: 3650, target: 3800 },
    { month: "Dec", points: 3800, target: 4000 },
  ],
  recentActivities: [
    {
      id: 1,
      title: "Advanced Safety Training",
      status: "Approved",
      points: 1000,
      date: "2025-01-16",
      stage: "Final Approved by HOD",
    },
    {
      id: 2,
      title: "Leadership Skills Development",
      status: "Pending",
      points: 500,
      date: "2025-01-14",
      stage: "Under Team Lead Review",
    },
    {
      id: 3,
      title: "Technical Excellence Program",
      status: "Approved",
      points: 800,
      date: "2025-01-12",
      stage: "Final Approved by HOD",
    },
  ],
  achievements: [
    { title: "Top Performer", description: "Achieved top 10% performance", date: "2025-01-15" },
    { title: "Safety Champion", description: "Completed all safety certifications", date: "2025-01-10" },
    { title: "Team Player", description: "Excellent collaboration score", date: "2025-01-05" },
  ],
}

export default function EmployeeDashboard() {
  const progressPercentage = (employeeData.totalPoints / employeeData.monthlyTarget) * 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-600"
      case "Pending":
        return "bg-yellow-600"
      case "Rejected":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getStageInfo = (stage: string) => {
    if (stage.includes("Team Lead")) {
      return { icon: User, color: "text-blue-400", bg: "bg-blue-500/10" }
    } else if (stage.includes("HOD")) {
      return { icon: Award, color: "text-green-400", bg: "bg-green-500/10" }
    } else {
      return { icon: CheckCircle, color: "text-purple-400", bg: "bg-purple-500/10" }
    }
  }

  return (
    <EmployeeLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-3">Welcome back, {employeeData.name}! 👋</h1>
                  <p className="text-blue-100 text-xl mb-6">
                    Team: <span className="font-bold">{employeeData.team}</span> • ID:{" "}
                    <span className="font-bold">{employeeData.employeeId}</span>
                  </p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Trophy className="w-5 h-5 mr-2" />
                      <span className="font-bold">Rank #{employeeData.currentRank}</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Award className="w-5 h-5 mr-2" />
                      <span className="font-bold">{employeeData.totalPoints.toLocaleString()} Points</span>
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
                  🚀
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
              title: "Total Points",
              value: employeeData.totalPoints.toLocaleString(),
              icon: Award,
              color: "text-green-500",
              bg: "bg-green-500/10",
            },
            {
              title: "Current Rank",
              value: `#${employeeData.currentRank}`,
              icon: Trophy,
              color: "text-yellow-500",
              bg: "bg-yellow-500/10",
            },
            {
              title: "Completed Tasks",
              value: employeeData.completedTasks,
              icon: CheckCircle,
              color: "text-blue-500",
              bg: "bg-blue-500/10",
            },
            {
              title: "Pending Tasks",
              value: employeeData.pendingTasks,
              icon: Clock,
              color: "text-orange-500",
              bg: "bg-orange-500/10",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-gray-900 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
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
          <Tabs defaultValue="tasks" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700 p-1 h-auto">
              <TabsTrigger
                value="tasks"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                🎯 Select Tasks
              </TabsTrigger>
              <TabsTrigger
                value="upload"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                📤 Upload Activity
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                📊 My Progress
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                🏆 Leaderboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tasks">
              <TaskSelector />
            </TabsContent>

            <TabsContent value="upload">
              <UploadForm />
            </TabsContent>

            <TabsContent value="progress">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                      Monthly Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={employeeData.monthlyProgress}>
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
                        <Line type="monotone" dataKey="points" stroke="#10B981" strokeWidth={3} name="Points" />
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

                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-500" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {employeeData.recentActivities.map((activity, index) => {
                        const stageInfo = getStageInfo(activity.stage)
                        return (
                          <motion.div
                            key={activity.id}
                            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="text-white font-semibold mb-1">{activity.title}</h4>
                                <div className="flex items-center space-x-3 mb-2">
                                  <Badge className={`${getStatusColor(activity.status)} text-white font-bold`}>
                                    {activity.status}
                                  </Badge>
                                  <span className="text-green-400 font-bold">+{activity.points} pts</span>
                                </div>
                                <div className={`flex items-center space-x-2 p-2 rounded-lg ${stageInfo.bg}`}>
                                  <stageInfo.icon className={`w-4 h-4 ${stageInfo.color}`} />
                                  <span className={`text-sm font-medium ${stageInfo.color}`}>{activity.stage}</span>
                                </div>
                              </div>
                              <span className="text-gray-400 text-sm">{activity.date}</span>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Award className="w-5 h-5 mr-2 text-purple-500" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {employeeData.achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.title}
                          className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700/50 rounded-lg"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-center">
                            <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                            <h4 className="text-white font-bold mb-1">{achievement.title}</h4>
                            <p className="text-gray-300 text-sm mb-2">{achievement.description}</p>
                            <span className="text-purple-400 text-xs">{achievement.date}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="leaderboard">
              <LeaderboardPreview />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </EmployeeLayout>
  )
}
