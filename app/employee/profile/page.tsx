"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, MapPin, Calendar, Edit, Save, X, Trophy, Target } from "lucide-react"
import { EmployeeLayout } from "@/components/layouts/employee-layout"
import { useToast } from "@/hooks/use-toast"

const profileData = {
  personalInfo: {
    name: "Ashish Suryawanshi",
    email: "ashish@skoda.com",
    phone: "+91 9876543210",
    location: "Mumbai, India",
    joinDate: "2023-03-15",
    employeeId: "EMP001",
    department: "Training Department",
    team: "Training-A",
    position: "Senior Trainer",
    manager: "Rajesh Kumar (Team Lead)",
  },
  stats: {
    currentRank: 5,
    totalPoints: 4300,
    badgesEarned: 4,
    submissionsApproved: 12,
    averageRating: 4.8,
    completionRate: 95,
  },
  achievements: [
    { name: "Top Performer", date: "2024-12-15", type: "Performance" },
    { name: "Consistent Certifier", date: "2024-11-20", type: "Certification" },
    { name: "Team Player", date: "2024-10-10", type: "Collaboration" },
    { name: "Innovation Leader", date: "2024-09-05", type: "Innovation" },
  ],
  goals: [
    { title: "Reach Top 3 in Department", progress: 60, target: "Q1 2025" },
    { title: "Complete 5 More Certifications", progress: 40, target: "Q2 2025" },
    { title: "Mentor 3 Junior Colleagues", progress: 33, target: "Q1 2025" },
  ],
}

export default function EmployeeProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profileData.personalInfo)
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(profileData.personalInfo)
    setIsEditing(false)
  }

  return (
    <EmployeeLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 border-0 text-white">
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24 border-4 border-white/20">
                  <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                    {profileData.personalInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{profileData.personalInfo.name}</h1>
                  <p className="text-green-100 text-lg mb-2">{profileData.personalInfo.position}</p>
                  <div className="flex items-center space-x-4 text-green-100">
                    <span className="flex items-center">
                      <Trophy className="w-4 h-4 mr-1" />
                      Rank #{profileData.stats.currentRank}
                    </span>
                    <span className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {profileData.stats.totalPoints.toLocaleString()} Points
                    </span>
                    <Badge className="bg-white/20 text-white border-white/30">{profileData.personalInfo.team}</Badge>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
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
            { title: "Current Rank", value: `#${profileData.stats.currentRank}`, color: "text-yellow-500" },
            { title: "Total Points", value: profileData.stats.totalPoints.toLocaleString(), color: "text-green-500" },
            { title: "Badges", value: profileData.stats.badgesEarned, color: "text-purple-500" },
            { title: "Approved", value: profileData.stats.submissionsApproved, color: "text-blue-500" },
            { title: "Rating", value: profileData.stats.averageRating, color: "text-orange-500" },
            { title: "Completion", value: `${profileData.stats.completionRate}%`, color: "text-pink-500" },
          ].map((stat, index) => (
            <Card key={stat.title} className="bg-gray-900 border-gray-700">
              <CardContent className="p-4 text-center">
                <p className="text-gray-400 text-xs mb-1">{stat.title}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
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
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="personal" className="data-[state=active]:bg-green-600">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-green-600">
                Achievements
              </TabsTrigger>
              <TabsTrigger value="goals" className="data-[state=active]:bg-green-600">
                Goals & Progress
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <User className="w-5 h-5 mr-2 text-green-500" />
                    Personal Information
                  </CardTitle>
                  {isEditing && (
                    <div className="space-x-2">
                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-600 text-white disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-600 text-white disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-600 text-white disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-300">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-600 text-white disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold">Work Information</h3>
                      <div className="space-y-3 text-gray-300">
                        <p className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-green-500" />
                          Employee ID: {formData.employeeId}
                        </p>
                        <p className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-green-500" />
                          Department: {formData.department}
                        </p>
                        <p className="flex items-center">
                          <Trophy className="w-4 h-4 mr-2 text-green-500" />
                          Position: {formData.position}
                        </p>
                        <p className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-green-500" />
                          Join Date: {formData.joinDate}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold">Team Information</h3>
                      <div className="space-y-3 text-gray-300">
                        <p className="flex items-center">
                          <Trophy className="w-4 h-4 mr-2 text-green-500" />
                          Team: {formData.team}
                        </p>
                        <p className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-green-500" />
                          Manager: {formData.manager}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profileData.achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.name}
                        className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold">{achievement.name}</h3>
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            {achievement.type}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Earned on {achievement.date}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-500" />
                    Goals & Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profileData.goals.map((goal, index) => (
                      <motion.div
                        key={goal.title}
                        className="p-4 bg-gray-800 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-semibold">{goal.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400 font-semibold">{goal.progress}%</span>
                            <Badge variant="outline" className="border-blue-500 text-blue-400">
                              {goal.target}
                            </Badge>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${goal.progress}%` }}
                            transition={{ delay: index * 0.2, duration: 1 }}
                          />
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
    </EmployeeLayout>
  )
}
