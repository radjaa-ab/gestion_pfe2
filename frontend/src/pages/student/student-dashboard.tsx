import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { FileText, Clock, Calendar, Plus, Edit, Trash } from 'lucide-react'
import { StatusBadge } from '../../components/status-badge'
import { Project, Task, ProposedProject } from '../types'

export default function StudentDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [proposedProjects, setProposedProjects] = useState<ProposedProject[]>([])
  const [teacherProjects, setTeacherProjects] = useState<ProposedProject[]>([])
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [newUpdate, setNewUpdate] = useState('')
  const [newProject, setNewProject] = useState<Omit<ProposedProject, 'id' | 'proposedBy' | 'status'>>({ title: '', description: '' })
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Simulating fetching projects
    setProjects([
      { id: 1, title: 'AI Research Project', description: 'Researching AI algorithms', progress: 60, deadline: '2023-12-31', students: ['John Doe'], status: 'In Progress', proposedBy: 'teacher', approvalStatus: 'validated' },
      { id: 2, title: 'Web Development Project', description: 'Building a web application', progress: 30, deadline: '2023-11-30', students: ['Jane Smith'], status: 'Not Started', proposedBy: 'student', approvalStatus: 'pending' },
    ])

    // Simulating fetching tasks
    setTasks([
      { id: 1, title: 'Submit Literature Review', dueDate: '2023-10-15', status: 'Completed' },
      { id: 2, title: 'Implement User Authentication', dueDate: '2023-10-20', status: 'In Progress' },
      { id: 3, title: 'Prepare Presentation', dueDate: '2023-10-25', status: 'Not Started' },
    ])

    // Simulating fetching proposed projects
    setProposedProjects([
      { id: 1, title: 'Machine Learning for Healthcare', description: 'Applying ML in healthcare diagnostics', proposedBy: 'student', status: 'pending' },
      { id: 2, title: 'Blockchain in Supply Chain', description: 'Implementing blockchain for supply chain management', proposedBy: 'student', status: 'validated' },
    ])

    // Simulating fetching teacher/company projects
    setTeacherProjects([
      { id: 1, title: 'Smart City Project', description: 'Developing IoT solutions for urban areas', proposedBy: 'teacher', status: 'validated' },
      { id: 2, title: 'E-commerce Platform', description: 'Building a scalable e-commerce solution', proposedBy: 'company', status: 'pending' },
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
    setIsUpdateDialogOpen(false)
    setNewUpdate('')
  }

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProjectId) {
      setProposedProjects(prev => prev.map(p => p.id === editingProjectId ? { ...p, ...newProject } : p))
      toast({
        title: "Project updated",
        description: "Your project proposal has been updated successfully.",
      })
    } else {
      setProposedProjects(prev => [...prev, { ...newProject, id: Date.now(), proposedBy: 'student', status: 'pending' }])
      toast({
        title: "Project proposed",
        description: "Your project proposal has been submitted successfully.",
      })
    }
    setIsProjectDialogOpen(false)
    setNewProject({ title: '', description: '' })
    setEditingProjectId(null)
  }

  const handleEditProject = (project: ProposedProject) => {
    setNewProject({ title: project.title, description: project.description })
    setEditingProjectId(project.id)
    setIsProjectDialogOpen(true)
  }

  const handleDeleteProject = (id: number) => {
    setProposedProjects(prev => prev.filter(p => p.id !== id))
    toast({
      title: "Project deleted",
      description: "Your project proposal has been deleted successfully.",
      variant: "destructive",
    })
  }

  const handleNotificationDismiss = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  // Function to safely get the next deadline
  const getNextDeadline = (): string => {
    const deadlines = projects
      .map(p => p.deadline)
      .filter((deadline): deadline is string => deadline !== undefined)
    
    if (deadlines.length === 0) {
      return 'No upcoming deadlines'
    }

    return new Date(Math.min(...deadlines.map(d => new Date(d).getTime()))).toLocaleDateString()
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
            <div className="text-2xl font-bold">{getNextDeadline()}</div>
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
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Deadline: {project.deadline || 'Not set'}</p>
              <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
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
                      <Button type="button" variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>Cancel</Button>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>My Proposed Projects</span>
            <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Propose New Project</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingProjectId ? 'Edit Project Proposal' : 'Propose New Project'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitProject} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      value={newProject.title}
                      onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      value={newProject.description}
                      onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => {
                      setIsProjectDialogOpen(false)
                      setNewProject({ title: '', description: '' })
                      setEditingProjectId(null)
                    }}>Cancel</Button>
                    <Button type="submit">{editingProjectId ? 'Update' : 'Submit'} Proposal</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell><StatusBadge status={project.status} /></TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditProject(project)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project.id)}><Trash className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projects Proposed by Teachers/Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Proposed By</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.proposedBy}</TableCell>
                  <TableCell><StatusBadge status={project.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

