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
import { User, MapPin, Calendar, Edit, Save, X, Trophy, Target, Users, Award } from "lucide-react"
import { LeadLayout } from "@/components/layouts/lead-layout"
import { useToast } from "@/hooks/use-toast"

const profileData = {
  personalInfo: {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@skoda.com",
    phone: "+91 9876543210",
    location: "Mumbai, India",
    joinDate: "2022-08-15",
    employeeId: "LEAD001",
    department: "Training Department",
    team: "Training-A",
    position: "Team Lead",
    manager: "Pradeep Singh (HOD)",
    teamSize: 12,
  },
  stats: {
    teamRank: 1,
    teamAvgPoints: 3867,
    totalApprovals: 156,
    pendingApprovals: 8,
    teamMembers: 12,
    approvalRate: 94,
  },
  achievements: [
    { name: "Best Team Lead 2024", date: "2024-12-01", type: "Leadership" },
    { name: "Team Excellence Award", date: "2024-11-15", type: "Team Performance" },
    { name: "100+ Approvals Milestone", date: "2024-10-20", type: "Milestone" },
    { name: "Innovation Mentor", date: "2024-09-10", type: "Innovation" },
  ],
  teamGoals: [
    { title: "Maintain #1 Team Ranking", progress: 85, target: "Q1 2025" },
    { title: "Achieve 95% Approval Rate", progress: 94, target: "Q1 2025" },
    { title: "All Members in Top 20", progress: 75, target: "Q2 2025" },
  ],
}

export default function LeadProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profileData.personalInfo)
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
      className: "bg-gray-800 border-gray-700 text-white",
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(profileData.personalInfo)
    setIsEditing(false)
  }

  return (
    <LeadLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 border-0 text-white">
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
                  <p className="text-blue-100 text-lg mb-2">{profileData.personalInfo.position}</p>
                  <div className="flex items-center space-x-4 text-blue-100">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Team: {profileData.personalInfo.team}
                    </span>
                    <span className="flex items-center">
                      <Trophy className="w-4 h-4 mr-1" />
                      Team Rank: #{profileData.stats.teamRank}
                    </span>
                    <Badge className="bg-white/20 text-white border-white/30">
                      {profileData.personalInfo.teamSize} Members
                    </Badge>
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
            { title: "Team Rank", value: `#${profileData.stats.teamRank}`, color: "text-yellow-500" },
            { title: "Team Avg", value: profileData.stats.teamAvgPoints, color: "text-green-500" },
            { title: "Total Approvals", value: profileData.stats.totalApprovals, color: "text-blue-500" },
            { title: "Pending", value: profileData.stats.pendingApprovals, color: "text-orange-500" },
            { title: "Team Size", value: profileData.stats.teamMembers, color: "text-purple-500" },
            { title: "Approval Rate", value: `${profileData.stats.approvalRate}%`, color: "text-pink-500" },
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
              <TabsTrigger value="personal" className="data-[state=active]:bg-blue-600">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-600">
                Achievements
              </TabsTrigger>
              <TabsTrigger value="goals" className="data-[state=active]:bg-blue-600">
                Team Goals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-500" />
                    Personal Information
                  </CardTitle>
                  {isEditing && (
                    <div className="space-x-2">
                      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
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
                          <User className="w-4 h-4 mr-2 text-blue-500" />
                          Employee ID: {formData.employeeId}
                        </p>
                        <p className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          Department: {formData.department}
                        </p>
                        <p className="flex items-center">
                          <Trophy className="w-4 h-4 mr-2 text-blue-500" />
                          Position: {formData.position}
                        </p>
                        <p className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                          Join Date: {formData.joinDate}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold">Leadership Information</h3>
                      <div className="space-y-3 text-gray-300">
                        <p className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-blue-500" />
                          Team: {formData.team}
                        </p>
                        <p className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-blue-500" />
                          Manager: {formData.manager}
                        </p>
                        <p className="flex items-center">
                          <Trophy className="w-4 h-4 mr-2 text-blue-500" />
                          Team Size: {formData.teamSize} members
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
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    Leadership Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profileData.achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.name}
                        className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold">{achievement.name}</h3>
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
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
                    Team Goals & Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profileData.teamGoals.map((goal, index) => (
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
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
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
    </LeadLayout>
  )
}
