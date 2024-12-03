import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { FileText, Users, Calendar } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from '../../components/status-badge'
import { Project } from '../types'

export default function TeacherDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Omit<Project, 'id' | 'proposedBy' | 'approvalStatus'>>({ 
    title: '', 
    description: '', 
    students: [], 
    status: 'Not Started'
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Simulating fetching projects
    setProjects([
      { id: 1, title: 'AI Research', description: 'Research on AI algorithms', students: ['John Doe', 'Jane Smith'], status: 'In Progress', proposedBy: 'teacher', approvalStatus: 'validated' },
      { id: 2, title: 'Web Development', description: 'Building a web application', students: ['Alice Johnson'], status: 'Not Started', proposedBy: 'teacher', approvalStatus: 'validated' },
      { id: 3, title: 'Mobile App', description: 'Developing a mobile app for local businesses', students: ['Bob Wilson'], status: 'Not Started', proposedBy: 'student', approvalStatus: 'pending' },
      { id: 4, title: 'Data Analysis', description: 'Analyzing customer data for insights', students: ['Eva Brown'], status: 'Not Started', proposedBy: 'student', approvalStatus: 'rejected' },
    ])

    // Simulating notifications
    setNotifications([
      { id: 1, message: 'New project proposal submitted for review' },
      { id: 2, message: 'Upcoming deadline for progress reports' },
    ])
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProject(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = projects.length + 1
    setProjects(prev => [...prev, { 
      id, 
      ...newProject, 
      students: newProject.students[0].split(',').map(s => s.trim()),
      proposedBy: 'teacher',
      approvalStatus: 'validated'
    }])
    toast({
      title: "Project added",
      description: `${newProject.title} has been successfully added.`,
    })
    setIsDialogOpen(false)
    setNewProject({ title: '', description: '', students: [], status: 'Not Started' })
  }

  const handleDeleteProject = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id))
    toast({
      title: "Project deleted",
      description: "Project has been removed successfully.",
      variant: "destructive",
    })
  }

  const handleNotificationDismiss = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const teacherProjects = projects.filter(p => p.proposedBy === 'teacher')
  const studentProjects = projects.filter(p => p.proposedBy === 'student')

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Teacher Dashboard</h2>

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
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Supervised</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.reduce((acc, project) => acc + project.students.length, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add New Project</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Project</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input id="title" name="title" value={newProject.title} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" value={newProject.description} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="students">Students (comma-separated)</Label>
                    <Input id="students" name="students" value={newProject.students}
                      onChange={(e) => setNewProject(prev => ({ ...prev, students: [e.target.value] }))}
                      required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" value={newProject.status} onValueChange={(value) => setNewProject(prev => ({ ...prev, status: value as Project['status'] }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Started">Not Started</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">Add Project</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.students.join(', ')}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({
                        title: "Edit project",
                        description: `Editing ${project.title}.`,
                      })
                    }}>Edit</Button>
                    <Button variant="outline" size="sm" className="ml-2" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Proposed Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Proposed By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.students.join(', ')}</TableCell>
                  <TableCell><StatusBadge status={project.approvalStatus} /></TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({
                        title: "Review project",
                        description: `Reviewing ${project.title}.`,
                      })
                    }}>Review</Button>
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
