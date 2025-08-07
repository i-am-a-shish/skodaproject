"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Award, Clock, Target, Plus, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const predefinedTasks = [
  {
    id: 1,
    title: "Safety Training Certification",
    description: "Complete comprehensive safety training program with practical assessments",
    category: "Safety",
    points: 1000,
    duration: "40 hours",
    difficulty: "Advanced",
    requirements: ["Attend all sessions", "Pass practical test", "Submit certificate"],
  },
  {
    id: 2,
    title: "Leadership Skills Workshop",
    description: "Participate in leadership development workshop focusing on team management",
    category: "Leadership",
    points: 500,
    duration: "16 hours",
    difficulty: "Intermediate",
    requirements: ["Complete workshop", "Submit reflection report", "Peer evaluation"],
  },
  {
    id: 3,
    title: "Technical Excellence Program",
    description: "Advanced technical training program for skill enhancement",
    category: "Technical",
    points: 800,
    duration: "24 hours",
    difficulty: "Advanced",
    requirements: ["Technical assessment", "Project completion", "Documentation"],
  },
  {
    id: 4,
    title: "Quality Management System",
    description: "Learn and implement quality management principles",
    category: "Quality",
    points: 600,
    duration: "20 hours",
    difficulty: "Intermediate",
    requirements: ["Theory completion", "Case study", "Implementation plan"],
  },
  {
    id: 5,
    title: "Innovation Workshop",
    description: "Creative thinking and innovation methodology workshop",
    category: "Innovation",
    points: 400,
    duration: "12 hours",
    difficulty: "Beginner",
    requirements: ["Workshop attendance", "Innovation project", "Presentation"],
  },
  {
    id: 6,
    title: "Digital Transformation Basics",
    description: "Foundational course on digital transformation strategies",
    category: "Technology",
    points: 300,
    duration: "8 hours",
    difficulty: "Beginner",
    requirements: ["Online course", "Quiz completion", "Summary report"],
  },
]

export function TaskSelector() {
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [customTask, setCustomTask] = useState({
    title: "",
    description: "",
    category: "",
    file: null as File | null,
  })
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const handleTaskSelection = (task: any) => {
    setUploading(true)
    setTimeout(() => {
      toast({
        title: "🎯 Task Selected Successfully!",
        description: `You have selected "${task.title}". Task has been sent to your Team Lead for review.`,
        className: "bg-gray-800 border-green-500 text-white",
      })
      setUploading(false)
      setSelectedTask(null)
    }, 2000)
  }

  const handleCustomTaskSubmit = () => {
    if (!customTask.title || !customTask.description || !customTask.file) return

    setUploading(true)
    setTimeout(() => {
      toast({
        title: "📤 Custom Task Submitted!",
        description: `Your custom task "${customTask.title}" has been submitted to your Team Lead for review.`,
        className: "bg-gray-800 border-blue-500 text-white",
      })
      setCustomTask({ title: "", description: "", category: "", file: null })
      setUploading(false)
    }, 2000)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-600"
      case "Intermediate":
        return "bg-yellow-600"
      case "Advanced":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Safety":
        return "border-red-500 text-red-400"
      case "Leadership":
        return "border-purple-500 text-purple-400"
      case "Technical":
        return "border-blue-500 text-blue-400"
      case "Quality":
        return "border-green-500 text-green-400"
      case "Innovation":
        return "border-yellow-500 text-yellow-400"
      case "Technology":
        return "border-cyan-500 text-cyan-400"
      default:
        return "border-gray-500 text-gray-400"
    }
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center text-2xl">
          <Target className="w-6 h-6 mr-3 text-green-500" />
          Select or Submit Task
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="predefined" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700 p-1 h-auto">
            <TabsTrigger
              value="predefined"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
            >
              🎯 Pre-defined Tasks
            </TabsTrigger>
            <TabsTrigger
              value="custom"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-300 font-bold px-6 py-3"
            >
              📝 Custom Task
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predefined">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {predefinedTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-gray-800 border-gray-700 hover:border-green-500 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-white font-bold text-lg mb-2">{task.title}</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">{task.description}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={getCategoryColor(task.category)}>
                            {task.category}
                          </Badge>
                          <Badge className={`${getDifficultyColor(task.difficulty)} text-white font-bold`}>
                            {task.difficulty}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                            <Award className="w-5 h-5 text-green-400 mx-auto mb-1" />
                            <p className="text-green-400 font-bold">{task.points}</p>
                            <p className="text-gray-400 text-xs">Points</p>
                          </div>
                          <div className="bg-gray-700/50 p-3 rounded-lg text-center">
                            <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                            <p className="text-blue-400 font-bold">{task.duration}</p>
                            <p className="text-gray-400 text-xs">Duration</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-gray-400 text-sm font-semibold">Requirements:</p>
                          <ul className="space-y-1">
                            {task.requirements.map((req, idx) => (
                              <li key={idx} className="text-gray-300 text-xs flex items-center">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="w-full bg-green-600 hover:bg-green-700 font-bold"
                              onClick={() => setSelectedTask(task)}
                            >
                              <Target className="w-4 h-4 mr-2" />
                              Select This Task
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-white text-xl">{task.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="text-white font-semibold mb-2">Task Description</h4>
                                <p className="text-gray-300">{task.description}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800 p-4 rounded-lg">
                                  <h4 className="text-white font-semibold mb-2">Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <p className="text-gray-300">
                                      <strong>Category:</strong> {task.category}
                                    </p>
                                    <p className="text-gray-300">
                                      <strong>Points:</strong> {task.points}
                                    </p>
                                    <p className="text-gray-300">
                                      <strong>Duration:</strong> {task.duration}
                                    </p>
                                    <p className="text-gray-300">
                                      <strong>Difficulty:</strong> {task.difficulty}
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-gray-800 p-4 rounded-lg">
                                  <h4 className="text-white font-semibold mb-2">Requirements</h4>
                                  <ul className="space-y-1">
                                    {task.requirements.map((req, idx) => (
                                      <li key={idx} className="text-gray-300 text-sm flex items-center">
                                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="bg-yellow-900/30 border border-yellow-700 p-4 rounded-lg">
                                <p className="text-yellow-300 text-sm">
                                  <strong>Note:</strong> Once you select this task, it will be sent to your Team Lead
                                  for review and approval. You can track the progress in your submissions page.
                                </p>
                              </div>

                              <div className="flex justify-end space-x-3">
                                <Button variant="outline" onClick={() => setSelectedTask(null)}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => handleTaskSelection(task)}
                                  disabled={uploading}
                                  className="bg-green-600 hover:bg-green-700 font-bold"
                                >
                                  {uploading ? (
                                    <div className="flex items-center">
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                      Submitting...
                                    </div>
                                  ) : (
                                    <div className="flex items-center">
                                      <Target className="w-4 h-4 mr-2" />
                                      Confirm Selection
                                    </div>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-blue-500" />
                  Submit Custom Task
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="custom-title" className="text-gray-300 font-semibold">
                        Task Title
                      </Label>
                      <Input
                        id="custom-title"
                        value={customTask.title}
                        onChange={(e) => setCustomTask({ ...customTask, title: e.target.value })}
                        placeholder="Enter task title"
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="custom-category" className="text-gray-300 font-semibold">
                        Category
                      </Label>
                      <Select
                        value={customTask.category}
                        onValueChange={(value) => setCustomTask({ ...customTask, category: value })}
                      >
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="certification">Certification</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="training">Training</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="project">Project</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-description" className="text-gray-300 font-semibold">
                      Task Description
                    </Label>
                    <Textarea
                      id="custom-description"
                      value={customTask.description}
                      onChange={(e) => setCustomTask({ ...customTask, description: e.target.value })}
                      placeholder="Describe your task, achievements, and learning outcomes..."
                      className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-file" className="text-gray-300 font-semibold">
                      Upload Supporting Document
                    </Label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                      <input
                        id="custom-file"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setCustomTask({ ...customTask, file: e.target.files[0] })
                          }
                        }}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        className="hidden"
                        required
                      />
                      <label htmlFor="custom-file" className="cursor-pointer">
                        <div className="flex flex-col items-center space-y-3">
                          <FileText className="w-16 h-16 text-gray-400" />
                          <div>
                            <p className="text-gray-300 font-semibold">
                              {customTask.file ? customTask.file.name : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-sm text-gray-500">PDF, JPG, PNG, DOC up to 10MB</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-lg">
                    <p className="text-blue-300 text-sm">
                      <strong>Custom Task Review:</strong> Your custom task will be reviewed by your Team Lead who will
                      determine the appropriate point value based on complexity and learning outcomes.
                    </p>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={handleCustomTaskSubmit}
                      disabled={uploading || !customTask.title || !customTask.description || !customTask.file}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg"
                    >
                      {uploading ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                          Submitting Custom Task...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Upload className="w-5 h-5 mr-3" />
                          Submit Custom Task for Review
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
