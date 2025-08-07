"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Settings, Bell, Shield, Users, Award, Plus, Edit, Trash2, Save } from "lucide-react"
import { HodLayout } from "@/components/layouts/hod-layout"
import { useToast } from "@/hooks/use-toast"

// Settings data
const settingsData = {
  pointsSystem: [
    { id: 1, activity: "Basic Certification", points: 500, category: "Certification", active: true },
    { id: 2, activity: "Advanced Certification", points: 1000, category: "Certification", active: true },
    { id: 3, activity: "Workshop Attendance", points: 300, category: "Workshop", active: true },
    { id: 4, activity: "Training Completion", points: 800, category: "Training", active: true },
    { id: 5, activity: "Leadership Program", points: 1200, category: "Leadership", active: true },
    { id: 6, activity: "Innovation Project", points: 1500, category: "Innovation", active: false },
  ],
  approvalSettings: {
    autoApprovalLimit: 200,
    requireHODApproval: true,
    bulkApprovalEnabled: true,
    approvalTimeout: 48,
  },
  notificationSettings: {
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    monthlyReports: true,
    performanceAlerts: true,
    goalReminders: true,
  },
  departmentSettings: {
    departmentName: "Training Department",
    departmentCode: "TRN",
    targetScore: 4000,
    maxTeamSize: 20,
    evaluationPeriod: "monthly",
  },
}

export default function HodSettings() {
  const [pointsSystem, setPointsSystem] = useState(settingsData.pointsSystem)
  const [approvalSettings, setApprovalSettings] = useState(settingsData.approvalSettings)
  const [notificationSettings, setNotificationSettings] = useState(settingsData.notificationSettings)
  const [departmentSettings, setDepartmentSettings] = useState(settingsData.departmentSettings)
  const [newActivity, setNewActivity] = useState({ activity: "", points: "", category: "" })
  const [editingActivity, setEditingActivity] = useState<any>(null)
  const { toast } = useToast()

  const handleSaveSettings = (section: string) => {
    toast({
      title: "✅ Settings Saved!",
      description: `${section} settings have been updated successfully.`,
      className: "bg-gray-800 border-green-500 text-white",
    })
  }

  const handleAddActivity = () => {
    if (newActivity.activity && newActivity.points && newActivity.category) {
      const newId = Math.max(...pointsSystem.map((p) => p.id)) + 1
      setPointsSystem([
        ...pointsSystem,
        {
          id: newId,
          activity: newActivity.activity,
          points: Number.parseInt(newActivity.points),
          category: newActivity.category,
          active: true,
        },
      ])
      setNewActivity({ activity: "", points: "", category: "" })
      toast({
        title: "🎯 Activity Added!",
        description: `${newActivity.activity} has been added to the points system.`,
        className: "bg-gray-800 border-green-500 text-white",
      })
    }
  }

  const handleEditActivity = (activity: any) => {
    setPointsSystem(pointsSystem.map((p) => (p.id === activity.id ? { ...activity } : p)))
    setEditingActivity(null)
    toast({
      title: "✏️ Activity Updated!",
      description: `${activity.activity} has been updated successfully.`,
      className: "bg-gray-800 border-blue-500 text-white",
    })
  }

  const handleDeleteActivity = (id: number) => {
    setPointsSystem(pointsSystem.filter((p) => p.id !== id))
    toast({
      title: "🗑️ Activity Deleted!",
      description: "The activity has been removed from the points system.",
      className: "bg-gray-800 border-red-500 text-white",
    })
  }

  const toggleActivityStatus = (id: number) => {
    setPointsSystem(pointsSystem.map((p) => (p.id === id ? { ...p, active: !p.active } : p)))
  }

  return (
    <HodLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-transparent" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16" />
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-3 flex items-center">
                    <Settings className="w-10 h-10 mr-4" />
                    Department Settings
                  </h1>
                  <p className="text-indigo-100 text-xl mb-6">
                    Configure points system, approvals, notifications, and department preferences
                  </p>
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Award className="w-5 h-5 mr-2" />
                      <span className="font-bold">{pointsSystem.filter((p) => p.active).length} Active Activities</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Shield className="w-5 h-5 mr-2" />
                      <span className="font-bold">Advanced Security</span>
                    </div>
                    <div className="flex items-center bg-white/20 px-4 py-2 rounded-full">
                      <Bell className="w-5 h-5 mr-2" />
                      <span className="font-bold">Smart Notifications</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="text-9xl opacity-30"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  ⚙️
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs defaultValue="points" className="space-y-6">
            <TabsList className="bg-gray-800 border-gray-700 p-1 h-auto">
              <TabsTrigger
                value="points"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                🎯 Points System
              </TabsTrigger>
              <TabsTrigger
                value="approvals"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                ✅ Approval Settings
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                🔔 Notifications
              </TabsTrigger>
              <TabsTrigger
                value="department"
                className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
              >
                🏢 Department
              </TabsTrigger>
            </TabsList>

            <TabsContent value="points">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between text-2xl">
                    <span className="flex items-center">
                      <Award className="w-6 h-6 mr-3 text-indigo-500" />
                      Points System Configuration
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 font-bold">
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
                            <Label htmlFor="activity-name" className="text-gray-300">
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
                            <Label htmlFor="activity-points" className="text-gray-300">
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
                          <div>
                            <Label htmlFor="activity-category" className="text-gray-300">
                              Category
                            </Label>
                            <Select
                              value={newActivity.category}
                              onValueChange={(value) => setNewActivity({ ...newActivity, category: value })}
                            >
                              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-600">
                                <SelectItem value="Certification">Certification</SelectItem>
                                <SelectItem value="Workshop">Workshop</SelectItem>
                                <SelectItem value="Training">Training</SelectItem>
                                <SelectItem value="Leadership">Leadership</SelectItem>
                                <SelectItem value="Innovation">Innovation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => setNewActivity({ activity: "", points: "", category: "" })}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleAddActivity} className="bg-indigo-600 hover:bg-indigo-700">
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
                    {pointsSystem.map((config, index) => (
                      <motion.div
                        key={config.id}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                          config.active
                            ? "bg-gray-800 border-gray-700 hover:border-indigo-500"
                            : "bg-gray-800/50 border-gray-600 opacity-60"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-center space-x-4">
                          <Switch checked={config.active} onCheckedChange={() => toggleActivityStatus(config.id)} />
                          <div>
                            <h4 className="text-white font-semibold">{config.activity}</h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-indigo-400 font-bold">{config.points} points</span>
                              <span className="text-gray-500">•</span>
                              <span className="text-gray-400 text-sm">{config.category}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingActivity(config)}
                                className="border-gray-600 text-gray-300 hover:bg-gray-600"
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
                                  <Label htmlFor="edit-activity-name" className="text-gray-300">
                                    Activity Name
                                  </Label>
                                  <Input
                                    id="edit-activity-name"
                                    defaultValue={config.activity}
                                    className="bg-gray-800 border-gray-600 text-white"
                                    onChange={(e) => setEditingActivity({ ...config, activity: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-activity-points" className="text-gray-300">
                                    Points
                                  </Label>
                                  <Input
                                    id="edit-activity-points"
                                    type="number"
                                    defaultValue={config.points}
                                    className="bg-gray-800 border-gray-600 text-white"
                                    onChange={(e) =>
                                      setEditingActivity({ ...config, points: Number.parseInt(e.target.value) })
                                    }
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setEditingActivity(null)}>
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => handleEditActivity(editingActivity || config)}
                                    className="bg-indigo-600 hover:bg-indigo-700"
                                  >
                                    Update Activity
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteActivity(config.id)}
                            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button
                      onClick={() => handleSaveSettings("Points System")}
                      className="bg-indigo-600 hover:bg-indigo-700 font-bold"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Points Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="approvals">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-indigo-500" />
                    Approval Workflow Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="auto-approval-limit" className="text-gray-300 font-medium">
                          Auto-Approval Limit (Points)
                        </Label>
                        <Input
                          id="auto-approval-limit"
                          type="number"
                          value={approvalSettings.autoApprovalLimit}
                          onChange={(e) =>
                            setApprovalSettings({
                              ...approvalSettings,
                              autoApprovalLimit: Number.parseInt(e.target.value),
                            })
                          }
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                        <p className="text-gray-400 text-sm mt-1">
                          Submissions below this point value will be auto-approved
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="approval-timeout" className="text-gray-300 font-medium">
                          Approval Timeout (Hours)
                        </Label>
                        <Input
                          id="approval-timeout"
                          type="number"
                          value={approvalSettings.approvalTimeout}
                          onChange={(e) =>
                            setApprovalSettings({
                              ...approvalSettings,
                              approvalTimeout: Number.parseInt(e.target.value),
                            })
                          }
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                        <p className="text-gray-400 text-sm mt-1">Time limit for approval decisions</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="text-white font-semibold">Require HOD Final Approval</h4>
                          <p className="text-gray-400 text-sm">All approvals must go through HOD</p>
                        </div>
                        <Switch
                          checked={approvalSettings.requireHODApproval}
                          onCheckedChange={(checked) =>
                            setApprovalSettings({ ...approvalSettings, requireHODApproval: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div>
                          <h4 className="text-white font-semibold">Enable Bulk Approvals</h4>
                          <p className="text-gray-400 text-sm">Allow multiple approvals at once</p>
                        </div>
                        <Switch
                          checked={approvalSettings.bulkApprovalEnabled}
                          onCheckedChange={(checked) =>
                            setApprovalSettings({ ...approvalSettings, bulkApprovalEnabled: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      onClick={() => handleSaveSettings("Approval Settings")}
                      className="bg-indigo-600 hover:bg-indigo-700 font-bold"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Approval Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <Bell className="w-6 h-6 mr-3 text-indigo-500" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold text-lg">Communication Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                          <div>
                            <h4 className="text-white font-semibold">Email Notifications</h4>
                            <p className="text-gray-400 text-sm">Receive notifications via email</p>
                          </div>
                          <Switch
                            checked={notificationSettings.emailNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                          <div>
                            <h4 className="text-white font-semibold">Push Notifications</h4>
                            <p className="text-gray-400 text-sm">Real-time browser notifications</p>
                          </div>
                          <Switch
                            checked={notificationSettings.pushNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                          <div>
                            <h4 className="text-white font-semibold">Performance Alerts</h4>
                            <p className="text-gray-400 text-sm">Alerts for performance issues</p>
                          </div>
                          <Switch
                            checked={notificationSettings.performanceAlerts}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, performanceAlerts: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold text-lg">Report Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                          <div>
                            <h4 className="text-white font-semibold">Weekly Reports</h4>
                            <p className="text-gray-400 text-sm">Automated weekly performance reports</p>
                          </div>
                          <Switch
                            checked={notificationSettings.weeklyReports}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                          <div>
                            <h4 className="text-white font-semibold">Monthly Reports</h4>
                            <p className="text-gray-400 text-sm">Comprehensive monthly analytics</p>
                          </div>
                          <Switch
                            checked={notificationSettings.monthlyReports}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, monthlyReports: checked })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                          <div>
                            <h4 className="text-white font-semibold">Goal Reminders</h4>
                            <p className="text-gray-400 text-sm">Reminders for upcoming goals</p>
                          </div>
                          <Switch
                            checked={notificationSettings.goalReminders}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, goalReminders: checked })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      onClick={() => handleSaveSettings("Notification Settings")}
                      className="bg-indigo-600 hover:bg-indigo-700 font-bold"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Notification Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="department">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    <Users className="w-6 h-6 mr-3 text-indigo-500" />
                    Department Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="dept-name" className="text-gray-300 font-medium">
                          Department Name
                        </Label>
                        <Input
                          id="dept-name"
                          value={departmentSettings.departmentName}
                          onChange={(e) =>
                            setDepartmentSettings({ ...departmentSettings, departmentName: e.target.value })
                          }
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dept-code" className="text-gray-300 font-medium">
                          Department Code
                        </Label>
                        <Input
                          id="dept-code"
                          value={departmentSettings.departmentCode}
                          onChange={(e) =>
                            setDepartmentSettings({ ...departmentSettings, departmentCode: e.target.value })
                          }
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="target-score" className="text-gray-300 font-medium">
                          Target Department Score
                        </Label>
                        <Input
                          id="target-score"
                          type="number"
                          value={departmentSettings.targetScore}
                          onChange={(e) =>
                            setDepartmentSettings({
                              ...departmentSettings,
                              targetScore: Number.parseInt(e.target.value),
                            })
                          }
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="max-team-size" className="text-gray-300 font-medium">
                          Maximum Team Size
                        </Label>
                        <Input
                          id="max-team-size"
                          type="number"
                          value={departmentSettings.maxTeamSize}
                          onChange={(e) =>
                            setDepartmentSettings({
                              ...departmentSettings,
                              maxTeamSize: Number.parseInt(e.target.value),
                            })
                          }
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="evaluation-period" className="text-gray-300 font-medium">
                          Evaluation Period
                        </Label>
                        <Select
                          value={departmentSettings.evaluationPeriod}
                          onValueChange={(value) =>
                            setDepartmentSettings({ ...departmentSettings, evaluationPeriod: value })
                          }
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-semibold mb-2">Department Description</h4>
                        <Textarea
                          placeholder="Enter department description..."
                          className="bg-gray-700 border-gray-600 text-white"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button
                      onClick={() => handleSaveSettings("Department Settings")}
                      className="bg-indigo-600 hover:bg-indigo-700 font-bold"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Department Settings
                    </Button>
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
