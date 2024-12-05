import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function FeedbackSubmission() {
  const [feedback, setFeedback] = useState({
    category: '',
    title: '',
    description: '',
    rating: ''
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFeedback(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFeedback(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Feedback submitted:', feedback)
    toast({
      title: "Feedback Submitted",
      description: "Your feedback has been successfully submitted.",
    })
    setFeedback({ category: '', title: '', description: '', rating: '' })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Feedback Submission</h2>
      <Card>
        <CardHeader>
          <CardTitle>Submit Your Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Feedback Category</Label>
              <Select onValueChange={(value) => handleSelectChange('category', value)} value={feedback.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="ui">User Interface</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Feedback Title</Label>
              <Input 
                id="title" 
                name="title"
                value={feedback.title}
                onChange={handleInputChange}
                placeholder="Enter a title for your feedback"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Feedback Description</Label>
              <Textarea 
                id="description" 
                name="description"
                value={feedback.description}
                onChange={handleInputChange}
                placeholder="Provide detailed feedback here..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Select onValueChange={(value) => handleSelectChange('rating', value)} value={feedback.rating}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Excellent</SelectItem>
                  <SelectItem value="4">Good</SelectItem>
                  <SelectItem value="3">Average</SelectItem>
                  <SelectItem value="2">Poor</SelectItem>
                  <SelectItem value="1">Very Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Submit Feedback</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
