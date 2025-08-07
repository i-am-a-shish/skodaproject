"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCircle, Clock, Award, TrendingUp, X, Users, Building, AlertTriangle } from "lucide-react"
import { HodLayout } from "@/components/layouts/hod-layout"
import { useToast } from "@/hooks/use-toast"

const notificationsData = [
  {
    id: 1,
    title: "Final Approval Required! 📋",
    message:
      "Team Lead Rajesh Kumar has approved Ashish Suryawanshi's 'Advanced Safety Training' certification. Awaiting your final approval for 1000 points.",
    type: "final_approval_required",
    timestamp: "2025-01-16 02:30 PM",
    read: false,
    priority: "high",
    actionBy: "Team Lead - Rajesh Kumar",
    employeeId: "EMP001",
    submissionId: "SUB001",
  },
  {
    id: 2,
    title: "Department Milestone Achieved! 🎉",
    message:
      "Congratulations! Training Department has achieved the highest average score (3580) across all departments this quarter.",
    type: "department_milestone",
    timestamp: "2025-01-16 11:00 AM",
    read: false,
    priority: "medium",
    actionBy: "System",
    employeeId: null,
  },
  {
    id: 3,
    title: "Team Performance Alert 📊",
    message:
      "Training-E team performance has dropped below department average. Consider reviewing team lead Vikash Singh's management approach.",
    type: "performance_alert",
    timestamp: "2025-01-15 04:45 PM",
    read: true,
    priority: "high",
    actionBy: "System Analytics",
    employeeId: null,
  },
  {
    id: 4,
    title: "Bulk Approvals Pending ⏰",
    message:
      "You have 15 submissions pending final approval for more than 48 hours. Please review to maintain department efficiency.",
    type: "bulk_approval_reminder",
    timestamp: "2025-01-15 09:00 AM",
    read: false,
    priority: "high",
    actionBy: "System",
    employeeId: null,
  },
  {
    id: 5,
    title: "New Team Lead Recommendation 👨‍💼",
    message:
      "Based on performance metrics, Ashish Suryawanshi from Training-A is recommended for team lead promotion consideration.",
    type: "promotion_recommendation",
    timestamp: "2025-01-14 03:20 PM",
    read: true,
    priority: "medium",
    actionBy: "HR Analytics",
    employeeId: "EMP001",
  },
  {
    id: 6,
    title: "Budget Approval Request 💰",
    message:
      "Team Lead Sunita Verma has requested budget approval for advanced training equipment worth ₹2,50,000 for Training-B team.",
    type: "budget_request",
    timestamp: "2025-01-14 01:15 PM",
    read: true,
    priority: "medium",
    actionBy: "Team Lead - Sunita Verma",
    employeeId: null,
  },
  {
    id: 7,
    title: "Monthly Department Report 📈",
    message:
      "December 2024 department performance report is ready for review. Overall growth: +12%, Approval rate: 94%.",
    type: "monthly_report",
    timestamp: "2025-01-01 12:00 PM",
    read: true,
    priority: "low",
    actionBy: "System",
    employeeId: null,
  },
  {
    id: 8,
    title: "System Configuration Update ⚙️",
    message:
      "Point system configuration has been updated. New certification categories added with revised point values.",
    type: "system_update",
    timestamp: "2024-12-28 10:30 AM",
    read: true,
    priority: "low",
    actionBy: "System Administrator",
    employeeId: null,
  },
]

export default function HodNotifications() {
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
      title: "All notifications marked as read ✅",
      description: "You're all caught up!",
      className: "bg-gray-800 border-gray-700 text-white",
    })
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    toast({
      title: "Notification deleted 🗑️",
      description: "The notification has been removed.",
      className: "bg-gray-800 border-gray-700 text-white",
    })
  }

  const handleQuickAction = (notification: any, action: string) => {
    if (action === "approve") {
      toast({
        title: "Final Approval Granted! ✅",
        description: "The submission has been approved and points have been awarded.",
        className: "bg-gray-800 border-gray-700 text-white",
      })
    } else if (action === "review") {
      toast({
        title: "Redirecting to Review 👀",
        description: "Opening detailed review page...",
        className: "bg-gray-800 border-gray-700 text-white",
      })
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "final_approval_required":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "department_milestone":
        return <Award className="w-5 h-5 text-purple-500" />
      case "performance_alert":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "bulk_approval_reminder":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "promotion_recommendation":
        return <TrendingUp className="w-5 h-5 text-blue-500" />
      case "budget_request":
        return <Building className="w-5 h-5 text-green-500" />
      case "monthly_report":
        return <Users className="w-5 h-5 text-blue-500" />
      case "system_update":
        return <Bell className="w-5 h-5 text-gray-500" />
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
      case "final_approval_required":
        return "Final Approval"
      case "department_milestone":
        return "Milestone"
      case "performance_alert":
        return "Performance Alert"
      case "bulk_approval_reminder":
        return "Bulk Reminder"
      case "promotion_recommendation":
        return "Promotion"
      case "budget_request":
        return "Budget Request"
      case "monthly_report":
        return "Report"
      case "system_update":
        return "System Update"
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
    <HodLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    <Bell className="w-8 h-8 mr-3" />
                    HOD Notifications
                    {unreadCount > 0 && (
                      <Badge className="ml-3 bg-white text-red-600 font-bold">{unreadCount} new</Badge>
                    )}
                  </h1>
                  <p className="text-red-100 text-lg">
                    Stay updated with department activities, approvals, and strategic insights
                  </p>
                </div>
                <motion.div
                  className="text-8xl opacity-20"
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
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
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                    {notifications.filter((n) => n.priority === "high" && !n.read).length} high priority
                  </Badge>
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
            <TabsList className="bg-gray-800 border-gray-700 grid grid-cols-4 lg:grid-cols-9 w-full">
              <TabsTrigger value="all" className="data-[state=active]:bg-red-600">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="data-[state=active]:bg-red-600">
                Unread
              </TabsTrigger>
              <TabsTrigger value="final_approval_required" className="data-[state=active]:bg-red-600">
                Approvals
              </TabsTrigger>
              <TabsTrigger value="performance_alert" className="data-[state=active]:bg-red-600">
                Alerts
              </TabsTrigger>
              <TabsTrigger value="department_milestone" className="data-[state=active]:bg-red-600">
                Milestones
              </TabsTrigger>
              <TabsTrigger value="promotion_recommendation" className="data-[state=active]:bg-red-600">
                Promotions
              </TabsTrigger>
              <TabsTrigger value="budget_request" className="data-[state=active]:bg-red-600">
                Budget
              </TabsTrigger>
              <TabsTrigger value="monthly_report" className="data-[state=active]:bg-red-600">
                Reports
              </TabsTrigger>
              <TabsTrigger value="system_update" className="data-[state=active]:bg-red-600">
                System
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
                            whileHover={{ scale: 1.01 }}
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
                                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    )}
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${
                                        notification.type === "final_approval_required"
                                          ? "border-green-500 text-green-400"
                                          : notification.type === "performance_alert"
                                            ? "border-red-500 text-red-400"
                                            : notification.type === "department_milestone"
                                              ? "border-purple-500 text-purple-400"
                                              : notification.type === "budget_request"
                                                ? "border-blue-500 text-blue-400"
                                                : "border-yellow-500 text-yellow-400"
                                      }`}
                                    >
                                      {getTypeLabel(notification.type)}
                                    </Badge>
                                    {notification.priority === "high" && (
                                      <Badge className="bg-red-600 text-white text-xs">HIGH</Badge>
                                    )}
                                  </div>
                                  <p className={`mb-3 ${!notification.read ? "text-gray-300" : "text-gray-400"}`}>
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                      <p>{notification.timestamp}</p>
                                      <p>By: {notification.actionBy}</p>
                                      {notification.employeeId && <p>Employee: {notification.employeeId}</p>}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      {notification.type === "final_approval_required" && (
                                        <>
                                          <Button
                                            onClick={() => handleQuickAction(notification, "approve")}
                                            className="bg-green-600 hover:bg-green-700"
                                            size="sm"
                                          >
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Quick Approve
                                          </Button>
                                          <Button
                                            onClick={() => handleQuickAction(notification, "review")}
                                            variant="outline"
                                            size="sm"
                                            className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                                          >
                                            Review Details
                                          </Button>
                                        </>
                                      )}
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
    </HodLayout>
  )
}
