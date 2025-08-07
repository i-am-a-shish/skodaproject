"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Target,
  TrendingUp,
  Users,
  Building,
  Edit,
  Save,
  Camera,
} from "lucide-react"
import { HodLayout } from "@/components/layouts/hod-layout"
import { useToast } from "@/hooks/use-toast"

// Profile data
const profileData = {
  personal: {
    name: "Pradeep Singh",
    email: "pradeep.singh@skoda.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    joinDate: "2018-03-15",
    employeeId: "HOD001",
    department: "Training Department",
    designation: "Head of Department",
    reportingTo: "Director - Human Resources",
    avatar: "PS",
  },
  achievements: [
    { title: "Excellence in Leadership", date: "2024-12-01", type: "Leadership" },
    { title: "Department of the Year", date: "2024-11-15", type: "Team Achievement" },
    { title: "Innovation Champion", date: "2024-10-20", type: "Innovation" },
    { title: "Best HOD Award", date: "2024-09-10", type: "Recognition" },
    { title: "Training Excellence", date: "2024-08-05", type: "Professional" },
  ],
  departmentGoals: [
    { goal: "Increase department average score to 4000", progress: 87, target: "Q1 2025" },
    { goal: "Achieve 95% training completion rate", progress: 92, target: "Q2 2025" },
    { goal: "Implement 5 new training programs", progress: 60, target: "Q3 2025" },
    { goal: "Reduce approval time by 30%", progress: 75, target: "Q4 2025" },
  ],
  stats: {
    totalEmployees: 156,
    teamsManaged: 12,
    avgDepartmentScore: 3750,
    approvalRate: 94.5,
    yearsOfService: 6.8,
    trainingsCompleted: 45,
  },
  recentActivities: [
    { action: "Approved 15 submissions", time: "2 hours ago", type: "approval" },
    { action: "Updated points configuration", time: "1 day ago", type: "settings" },
    { action: "Generated monthly report", time: "2 days ago", type: "report" },
    { action: "Team meeting with Training-A", time: "3 days ago", type: "meeting" },
    { action: "Performance review completed", time: "1 week ago", type: "review" },
  ],
}

export default function HodProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [personalInfo, setPersonalInfo] = useState(profileData.personal)
  const { toast } = useToast()

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "✅ Profile Updated!",
      description: "Your profile information has been saved successfully.",
      className: "bg-gray-800 border-green-500 text-white",
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "approval":
        return "✅"
      case "settings":
        return "⚙️"
      case "report":
        return "📊"
      case "meeting":
        return "👥"
      case "review":
        return "📋"
      default:
        return "📌"
    }
  }

  const getAchievementColor = (type: string) => {
    switch (type) {
      case "Leadership":
        return "bg-purple-600"
      case "Team Achievement":
        return "bg-green-600"
      case "Innovation":
        return "bg-blue-600"
      case "Recognition":
        return "bg-yellow-600"
      case "Professional":
        return "bg-indigo-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <HodLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-green-600 via-green-700 to-teal-600 border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
                      {personalInfo.avatar}
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
                    <p className="text-green-100 text-xl mb-2">{personalInfo.designation}</p>
                    <p className="text-green-200 mb-4">{personalInfo.department}</p>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="font-bold">{profileData.stats.totalEmployees} Employees</span>
                      </div>
                      <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                        <Building className="w-4 h-4 mr-2" />
                        <span className="font-bold">{profileData.stats.teamsManaged} Teams</span>
                      </div>
                      <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                        <Award className="w-4 h-4 mr-2" />
                        <span className="font-bold">{profileData.achievements.length} Awards</span>
                      </div>
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
                  👨‍💼
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            {
              title: "Years of Service",
              value: profileData.stats.yearsOfService,
              icon: Calendar,
              color: "text-blue-500",
            },
            { title: "Total Employees", value: profileData.stats.totalEmployees, icon: Users, color: "text-green-500" },
            { title: "Teams Managed", value: profileData.stats.teamsManaged, icon: Building, color: "text-purple-500" },
            {
              title: "Avg Score",
              value: profileData.stats.avgDepartmentScore,
              icon: TrendingUp,
              color: "text-yellow-500",
            },
            {
              title: "Approval Rate",
              value: `${profileData.stats.approvalRate}%`,
              icon: Award,
              color: "text-indigo-500",
            },
            { title: "Trainings", value: profileData.stats.trainingsCompleted, icon: Target, color: "text-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-gray-900 border-gray-700 hover:border-green-500 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-xs">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Profile Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700 p-1 h-auto">
              <TabsTrigger
                value="personal"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                👤 Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                🏆 Achievements
              </TabsTrigger>
              <TabsTrigger
                value="goals"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                🎯 Department Goals
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                📊 Recent Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between text-2xl">
                    <span className="flex items-center">
                      <User className="w-6 h-6 mr-3 text-green-500" />
                      Personal Information
                    </span>
                    <Button
                      onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                      className={`font-bold ${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-300 font-medium">
                          Full Name
                        </Label>
                        <div className="flex items-center space-x-2">
                          <User className="w-5 h-5 text-gray-400" />
                          {isEditing ? (
                            <Input
                              id="name"
                              value={personalInfo.name}
                              onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          ) : (
                            <span className="text-white font-medium">{personalInfo.name}</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-300 font-medium">
                          Email Address
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-5 h-5 text-gray-400" />
                          {isEditing ? (
                            <Input
                              id="email"
                              type="email"
                              value={personalInfo.email}
                              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          ) : (
                            <span className="text-white font-medium">{personalInfo.email}</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-300 font-medium">
                          Phone Number
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-5 h-5 text-gray-400" />
                          {isEditing ? (
                            <Input
                              id="phone"
                              value={personalInfo.phone}
                              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          ) : (
                            <span className="text-white font-medium">{personalInfo.phone}</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location" className="text-gray-300 font-medium">
                          Location
                        </Label>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          {isEditing ? (
                            <Input
                              id="location"
                              value={personalInfo.location}
                              onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          ) : (
                            <span className="text-white font-medium">{personalInfo.location}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-white font-semibold mb-3">Professional Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Employee ID:</span>
                            <span className="text-white font-medium">{personalInfo.employeeId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Department:</span>
                            <span className="text-white font-medium">{personalInfo.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Designation:</span>
                            <span className="text-white font-medium">{personalInfo.designation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Reporting To:</span>
                            <span className="text-white font-medium">{personalInfo.reportingTo}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Join Date:</span>
                            <span className="text-white font-medium">{personalInfo.joinDate}</span>
                          </div>
                        </div>
                      </div>
                      {isEditing && (
                        <div>
                          <Label htmlFor="bio" className="text-gray-300 font-medium">
                            Bio / Description
                          </Label>
                          <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            className="bg-gray-800 border-gray-600 text-white"
                            rows={4}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <Award className="w-6 h-6 mr-3 text-green-500" />
                    Achievements & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profileData.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                            <Award className="w-6 h-6 text-black" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1">{achievement.title}</h4>
                            <Badge className={`${getAchievementColor(achievement.type)} text-white text-xs mb-2`}>
                              {achievement.type}
                            </Badge>
                            <p className="text-gray-400 text-sm">{achievement.date}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <Target className="w-6 h-6 mr-3 text-green-500" />
                    Department Goals & Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profileData.departmentGoals.map((goal, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-800 p-6 rounded-lg border border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-white font-semibold text-lg">{goal.goal}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400 font-bold">{goal.progress}%</span>
                            <Badge variant="outline" className="border-green-500 text-green-400">
                              {goal.target}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={goal.progress} className="h-3" />
                        <div className="flex justify-between text-sm text-gray-400 mt-2">
                          <span>Progress</span>
                          <span>Target: {goal.target}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <TrendingUp className="w-6 h-6 mr-3 text-green-500" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profileData.recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{activity.action}</p>
                          <p className="text-gray-400 text-sm">{activity.time}</p>
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
