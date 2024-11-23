import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { FileText, Clock, Calendar } from 'lucide-react'

type Project = {
  id: number;
  title: string;
  description: string;
  progress: number;
  deadline: string;
}

type Task = {
  id: number;
  title: string;
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

export default function StudentDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newUpdate, setNewUpdate] = useState('')
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Simulating fetching projects
    setProjects([
      { id: 1, title: 'AI Research Project', description: 'Researching AI algorithms', progress: 60, deadline: '2023-12-31' },
      { id: 2, title: 'Web Development Project', description: 'Building a web application', progress: 30, deadline: '2023-11-30' },
    ])

    // Simulating fetching tasks
    setTasks([
      { id: 1, title: 'Submit Literature Review', dueDate: '2023-10-15', status: 'Completed' },
      { id: 2, title: 'Implement User Authentication', dueDate: '2023-10-20', status: 'In Progress' },
      { id: 3, title: 'Prepare Presentation', dueDate: '2023-10-25', status: 'Not Started' },
    ])

    // Simulating notifications
    setNotifications([
      { id: 1, message: 'New task assigned: Prepare Presentation' },
      { id: 2, message: 'Upcoming deadline for AI Research Project' },
    ])
  }, [])

  const handleSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Update submitted",
      description: "Your project update has been submitted successfully.",
    })
    setIsDialogOpen(false)
    setNewUpdate('')
  }

  const handleNotificationDismiss = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Student Dashboard</h2>

      {notifications.map((notification) => (
        <Alert key={notification.id}>
          <AlertTitle>Notification</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
          <Button variant="outline" size="sm" onClick={() => handleNotificationDismiss(notification.id)}>
            Dismiss
          </Button>
        </Alert>
      ))}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.filter(task => task.status !== 'Completed').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(Math.min(...projects.map(p => new Date(p.deadline).getTime()))).toLocaleDateString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
              <div className="mt-2 flex items-center">
                <Progress value={project.progress} className="w-full" />
                <span className="ml-2 text-sm font-medium">{project.progress}%</span>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Deadline: {project.deadline}</p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-2">Submit Update</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Submit Project Update</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitUpdate} className="space-y-4">
                    <Textarea
                      placeholder="Enter your project update here..."
                      value={newUpdate}
                      onChange={(e) => setNewUpdate(e.target.value)}
                      required
                    />
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                      <Button type="submit">Submit Update</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => {
                      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'Completed' } : t))
                      toast({
                        title: "Task completed",
                        description: `${task.title} marked as completed.`,
                      })
                    }}>Mark as Completed</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

