"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp, TrendingDown } from "lucide-react"

const teamLeaderboard = [
  { rank: 1, name: "Ashish Suryawanshi", points: 4300, change: "+2", avatar: "AS" },
  { rank: 2, name: "Priya Sharma", points: 4100, change: "0", avatar: "PS" },
  { rank: 3, name: "Rahul Kumar", points: 3950, change: "+1", avatar: "RK" },
  { rank: 4, name: "Sneha Patel", points: 3800, change: "-2", avatar: "SP" },
  { rank: 5, name: "Amit Singh", points: 3650, change: "+1", avatar: "AS" },
]

export function LeaderboardPreview() {
  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-green-500" />
          Team Leaderboard (Top 5)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamLeaderboard.map((member, index) => (
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
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
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{member.avatar}</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">{member.name}</h4>
                  <p className="text-gray-400 text-sm">{member.points.toLocaleString()} points</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {member.change !== "0" && (
                  <div
                    className={`flex items-center ${member.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                  >
                    {member.change.startsWith("+") ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                  </div>
                )}
                <Badge
                  variant={
                    member.change.startsWith("+") ? "default" : member.change === "0" ? "secondary" : "destructive"
                  }
                  className={
                    member.change.startsWith("+")
                      ? "bg-green-600"
                      : member.change === "0"
                        ? "bg-gray-600"
                        : "bg-red-600"
                  }
                >
                  {member.change === "0" ? "—" : member.change}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
