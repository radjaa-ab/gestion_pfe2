import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface Feedback {
  id: string
  projectId: string
  supervisorId: string
  content: string
  rating: number
  date: string
}

interface Project {
  id: string
  title: string
  student: string
}

export function FeedbackSystem() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    { id: '1', projectId: '1', supervisorId: '1', content: 'Good progress on the AI model. Focus on improving the user interface next.', rating: 4, date: '2023-07-15' },
    { id: '2', projectId: '2', supervisorId: '2', content: 'The database design looks solid. Start working on the backend API.', rating: 3, date: '2023-07-20' },
  ])

  const [projects] = useState<Project[]>([
    { id: '1', title: 'AI Chatbot Development', student: 'Alice Johnson' },
    { id: '2', title: 'E-commerce Platform', student: 'Bob Smith' },
  ])

  const { toast } = useToast()

  const handleAddFeedback = (newFeedback: Omit<Feedback, 'id' | 'date'>) => {
    const feedback = {
      ...newFeedback,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    }
    setFeedbacks([...feedbacks, feedback])
    toast({
      title: "Feedback Submitted",
      description: "Your feedback has been successfully submitted.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback System</CardTitle>
        <CardDescription>Provide and view feedback for student projects</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Feedback</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Feedback</DialogTitle>
              <DialogDescription>Provide feedback for a student project.</DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleAddFeedback({
                projectId: formData.get('projectId') as string,
                supervisorId: '1', // Assuming logged in supervisor has ID 1
                content: formData.get('content') as string,
                rating: parseInt(formData.get('rating') as string),
              })
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="projectId" className="text-right">Project</Label>
                  <Select name="projectId" required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content" className="text-right">Feedback</Label>
                  <Textarea id="content" name="content" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rating" className="text-right">Rating</Label>
                  <Select name="rating" required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <SelectItem key={rating} value={rating.toString()}>{rating} Star{rating !== 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Feedback</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
          {feedbacks.map(feedback => {
            const project = projects.find(p => p.id === feedback.projectId)
            return (
              <Card key={feedback.id} className="mb-4">
                <CardHeader>
                  <CardTitle>{project?.title}</CardTitle>
                  <CardDescription>Student: {project?.student} | Date: {feedback.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{feedback.content}</p>
                  <p className="mt-2">Rating: {feedback.rating} / 5</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

