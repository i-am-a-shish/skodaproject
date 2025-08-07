"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCircle, XCircle, Clock, Award, TrendingUp, X } from "lucide-react"
import { EmployeeLayout } from "@/components/layouts/employee-layout"
import { useToast } from "@/hooks/use-toast"

const notificationsData = [
  {
    id: 1,
    title: "Submission Approved! 🎉",
    message: "Your 'Advanced Safety Training' certification has been approved by Team Lead. You earned 1000 points!",
    type: "approval",
    timestamp: "2025-01-16 10:30 AM",
    read: false,
    priority: "high",
    actionBy: "Team Lead - Rajesh Kumar",
  },
  {
    id: 2,
    title: "New Badge Earned! 🏆",
    message: "Congratulations! You've earned the 'Top Performer' badge for achieving top 10% performance.",
    type: "badge",
    timestamp: "2025-01-15 02:15 PM",
    read: false,
    priority: "medium",
    actionBy: "System",
  },
  {
    id: 3,
    title: "Submission Rejected ❌",
    message:
      "Your 'Quality Management System' certification was rejected by Team Lead. Reason: Certificate appears to be incomplete. Please resubmit with all required documentation.",
    type: "rejection",
    timestamp: "2024-12-30 11:45 AM",
    read: true,
    priority: "high",
    actionBy: "Team Lead - Rajesh Kumar",
  },
  {
    id: 4,
    title: "Rank Update 📈",
    message: "Great job! You've moved up 2 positions in the leaderboard. Your current rank is #5.",
    type: "rank",
    timestamp: "2025-01-14 09:20 AM",
    read: true,
    priority: "medium",
    actionBy: "System",
  },
  {
    id: 5,
    title: "Submission Under Review ⏳",
    message: "Your 'Leadership Skills Development' workshop submission is currently under review by your Team Lead.",
    type: "pending",
    timestamp: "2025-01-10 03:30 PM",
    read: false,
    priority: "low",
    actionBy: "System",
  },
  {
    id: 6,
    title: "Team Achievement! 🎯",
    message: "Your team 'Training-A' has achieved the highest average score this month. Keep up the excellent work!",
    type: "team",
    timestamp: "2025-01-01 12:00 PM",
    read: true,
    priority: "medium",
    actionBy: "HOD - Pradeep Singh",
  },
  {
    id: 7,
    title: "Final Approval Received! ✅",
    message: "Your 'Technical Excellence Program' has received final approval from HOD. You earned 800 points!",
    type: "final_approval",
    timestamp: "2025-01-07 04:45 PM",
    read: true,
    priority: "high",
    actionBy: "HOD - Pradeep Singh",
  },
]

export default function EmployeeNotifications() {
  const [notifications, setNotifications] = useState(notificationsData)
  const [filter, setFilter] = useState("all")
  const { toast } = useToast()

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    return notification.type === filter
  })

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "All notifications marked as read",
      description: "You're all caught up!",
    })
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "approval":
      case "final_approval":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "rejection":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "badge":
        return <Award className="w-5 h-5 text-purple-500" />
      case "rank":
        return <TrendingUp className="w-5 h-5 text-blue-500" />
      case "team":
        return <Award className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "approval":
        return "Approved"
      case "final_approval":
        return "Final Approval"
      case "rejection":
        return "Rejected"
      case "pending":
        return "Pending"
      case "badge":
        return "Badge"
      case "rank":
        return "Rank Update"
      case "team":
        return "Team"
      default:
        return "Notification"
    }
  }

  // Auto-dismiss toast notifications after 3 seconds
  useEffect(() => {
    const unreadNotifications = notifications.filter((n) => !n.read)
    if (unreadNotifications.length > 0) {
      const timer = setTimeout(() => {
        // This would typically show a toast for new notifications
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notifications])

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
                    <Bell className="w-8 h-8 mr-3" />
                    Notifications
                    {unreadCount > 0 && <Badge className="ml-3 bg-red-500 text-white">{unreadCount} new</Badge>}
                  </h1>
                  <p className="text-blue-100 text-lg">
                    Stay updated with your submissions, achievements, and team updates
                  </p>
                </div>
                <motion.div
                  className="text-8xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  🔔
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-white font-semibold">{filteredNotifications.length} notifications</span>
                  {unreadCount > 0 && <Badge className="bg-red-600 text-white">{unreadCount} unread</Badge>}
                </div>
                {unreadCount > 0 && (
                  <Button
                    onClick={markAllAsRead}
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white bg-transparent"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark All as Read
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={filter} onValueChange={setFilter} className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700 grid grid-cols-4 lg:grid-cols-8 w-full">
              <TabsTrigger value="all" className="data-[state=active]:bg-green-600">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="data-[state=active]:bg-green-600">
                Unread
              </TabsTrigger>
              <TabsTrigger value="approval" className="data-[state=active]:bg-green-600">
                Approvals
              </TabsTrigger>
              <TabsTrigger value="rejection" className="data-[state=active]:bg-green-600">
                Rejections
              </TabsTrigger>
              <TabsTrigger value="badge" className="data-[state=active]:bg-green-600">
                Badges
              </TabsTrigger>
              <TabsTrigger value="rank" className="data-[state=active]:bg-green-600">
                Rankings
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-green-600">
                Team
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-green-600">
                Pending
              </TabsTrigger>
            </TabsList>

            <TabsContent value={filter}>
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-0">
                  <AnimatePresence>
                    {filteredNotifications.length === 0 ? (
                      <motion.div
                        className="p-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No notifications found</p>
                        <p className="text-gray-500 text-sm">You're all caught up!</p>
                      </motion.div>
                    ) : (
                      <div className="divide-y divide-gray-700">
                        {filteredNotifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            className={`p-6 hover:bg-gray-800 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                              !notification.read ? "bg-gray-800/50" : ""
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-4 flex-1">
                                <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <h3
                                      className={`font-semibold ${!notification.read ? "text-white" : "text-gray-300"}`}
                                    >
                                      {notification.title}
                                    </h3>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    )}
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${
                                        notification.type === "approval" || notification.type === "final_approval"
                                          ? "border-green-500 text-green-400"
                                          : notification.type === "rejection"
                                            ? "border-red-500 text-red-400"
                                            : notification.type === "badge"
                                              ? "border-purple-500 text-purple-400"
                                              : "border-blue-500 text-blue-400"
                                      }`}
                                    >
                                      {getTypeLabel(notification.type)}
                                    </Badge>
                                  </div>
                                  <p className={`mb-3 ${!notification.read ? "text-gray-300" : "text-gray-400"}`}>
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                      <p>{notification.timestamp}</p>
                                      <p>By: {notification.actionBy}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      {!notification.read && (
                                        <Button
                                          onClick={() => markAsRead(notification.id)}
                                          variant="outline"
                                          size="sm"
                                          className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                                        >
                                          <CheckCircle className="w-4 h-4 mr-1" />
                                          Mark Read
                                        </Button>
                                      )}
                                      <Button
                                        onClick={() => deleteNotification(notification.id)}
                                        variant="outline"
                                        size="sm"
                                        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </EmployeeLayout>
  )
}
