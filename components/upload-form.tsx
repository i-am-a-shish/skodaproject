"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function UploadForm() {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    file: null as File | null,
  })
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    // Simulate upload
    setTimeout(() => {
      toast({
        title: "Submission Uploaded",
        description: "Your submission has been uploaded and is pending approval.",
      })
      setFormData({ type: "", title: "", description: "", file: null })
      setUploading(false)
    }, 2000)
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Upload className="w-5 h-5 mr-2 text-green-500" />
          Submit New Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-gray-300">
                Activity Type
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="certification">Certification</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">
                Activity Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter activity title"
                className="bg-gray-800 border-gray-600 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your activity and achievements..."
              className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file" className="text-gray-300">
              Upload Certificate/Document
            </Label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
              <input
                id="file"
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
                required
              />
              <label htmlFor="file" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  <FileText className="w-12 h-12 text-gray-400" />
                  <p className="text-gray-400">
                    {formData.file ? formData.file.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-sm text-gray-500">PDF, JPG, PNG, DOC up to 10MB</p>
                </div>
              </label>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={uploading || !formData.type || !formData.title || !formData.file}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
            >
              {uploading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Uploading...
                </div>
              ) : (
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Submit for Approval
                </div>
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}
