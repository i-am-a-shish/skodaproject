"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Star, Target, Trophy, Medal, Crown } from "lucide-react"
import { EmployeeLayout } from "@/components/layouts/employee-layout"

const earnedBadges = [
  {
    id: 1,
    name: "Top Performer",
    description: "Achieved top 10% performance in the department",
    icon: "🏆",
    color: "from-yellow-500 to-yellow-600",
    earnedDate: "2024-12-15",
    points: 1000,
    rarity: "Legendary",
  },
  {
    id: 2,
    name: "Consistent Certifier",
    description: "Completed 5+ certifications in a single quarter",
    icon: "📜",
    color: "from-blue-500 to-blue-600",
    earnedDate: "2024-11-20",
    points: 500,
    rarity: "Epic",
  },
  {
    id: 3,
    name: "Team Player",
    description: "Actively participated in team activities and workshops",
    icon: "🤝",
    color: "from-green-500 to-green-600",
    earnedDate: "2024-10-10",
    points: 300,
    rarity: "Rare",
  },
  {
    id: 4,
    name: "Innovation Leader",
    description: "Contributed innovative ideas in innovation workshops",
    icon: "💡",
    color: "from-purple-500 to-purple-600",
    earnedDate: "2024-09-05",
    points: 800,
    rarity: "Epic",
  },
]

const availableBadges = [
  {
    id: 5,
    name: "Master Trainer",
    description: "Complete 10+ training programs",
    icon: "🎓",
    color: "from-indigo-500 to-indigo-600",
    progress: 70,
    requirement: "7/10 trainings completed",
    points: 1200,
    rarity: "Legendary",
  },
  {
    id: 6,
    name: "Quality Champion",
    description: "Achieve 95%+ quality score in assessments",
    icon: "⭐",
    color: "from-pink-500 to-pink-600",
    progress: 85,
    requirement: "Current quality score: 92%",
    points: 600,
    rarity: "Epic",
  },
  {
    id: 7,
    name: "Mentor",
    description: "Help 3+ colleagues with their development",
    icon: "👨‍🏫",
    color: "from-teal-500 to-teal-600",
    progress: 33,
    requirement: "1/3 colleagues mentored",
    points: 400,
    rarity: "Rare",
  },
  {
    id: 8,
    name: "Speed Learner",
    description: "Complete certifications 50% faster than average",
    icon: "⚡",
    color: "from-orange-500 to-orange-600",
    progress: 20,
    requirement: "Improve completion speed",
    points: 350,
    rarity: "Rare",
  },
]

const badgeStats = {
  totalEarned: earnedBadges.length,
  totalAvailable: earnedBadges.length + availableBadges.length,
  totalPoints: earnedBadges.reduce((sum, badge) => sum + badge.points, 0),
  rarity: {
    legendary: earnedBadges.filter((b) => b.rarity === "Legendary").length,
    epic: earnedBadges.filter((b) => b.rarity === "Epic").length,
    rare: earnedBadges.filter((b) => b.rarity === "Rare").length,
  },
}

export default function EmployeeBadges() {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "text-yellow-400 border-yellow-400"
      case "Epic":
        return "text-purple-400 border-purple-400"
      case "Rare":
        return "text-blue-400 border-blue-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  return (
    <EmployeeLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 border-0 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    <Award className="w-8 h-8 mr-3" />
                    Badge Collection
                  </h1>
                  <p className="text-purple-100 text-lg">Showcase your achievements and track your progress</p>
                </div>
                <motion.div
                  className="text-8xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  🏅
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
              title: "Badges Earned",
              value: `${badgeStats.totalEarned}/${badgeStats.totalAvailable}`,
              icon: Award,
              color: "text-purple-500",
            },
            { title: "Badge Points", value: badgeStats.totalPoints, icon: Star, color: "text-yellow-500" },
            { title: "Legendary", value: badgeStats.rarity.legendary, icon: Crown, color: "text-yellow-400" },
            { title: "Epic", value: badgeStats.rarity.epic, icon: Medal, color: "text-purple-400" },
          ].map((stat, index) => (
            <Card
              key={stat.title}
              className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-all duration-300"
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

        {/* Earned Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Earned Badges ({earnedBadges.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {earnedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    className={`relative p-6 rounded-xl bg-gradient-to-br ${badge.color} text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">{badge.icon}</div>
                      <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                      <p className="text-white/80 text-sm mb-3">{badge.description}</p>
                      <Badge variant="outline" className={`${getRarityColor(badge.rarity)} bg-white/10`}>
                        {badge.rarity}
                      </Badge>
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <p className="text-white/80 text-xs">Earned: {badge.earnedDate}</p>
                        <p className="text-white font-semibold">+{badge.points} points</p>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Available Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-500" />
                Available Badges ({availableBadges.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-2xl opacity-60`}
                      >
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold text-lg">{badge.name}</h3>
                          <Badge variant="outline" className={`${getRarityColor(badge.rarity)} text-xs`}>
                            {badge.rarity}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{badge.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-green-400 font-semibold">{badge.progress}%</span>
                          </div>
                          <Progress value={badge.progress} className="h-2" />
                          <p className="text-gray-500 text-xs">{badge.requirement}</p>
                          <p className="text-green-400 font-semibold text-sm">Reward: +{badge.points} points</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </EmployeeLayout>
  )
}
