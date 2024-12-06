import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { FileText, Users, Calendar, Edit, Trash } from 'lucide-react'
import { StatusBadge } from '../../components/status-badge'
import { Project } from '../types'

export default function CompanyDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Omit<Project, 'id' | 'status' | 'approvalStatus' | 'students'>>({
    title: '',
    description: '',
    proposedBy: 'company',
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Simulating fetching projects
    const fetchProjects = async () => {
      // This would be replaced with an actual API call
      const fetchedProjects: Project[] = [
        {
          id: 1,
          title: "AI Chatbot Development",
          description: "Develop an AI-powered chatbot for customer service",
          students: ["John Doe"],
          status: "In Progress",
          proposedBy: "company",
          approvalStatus: "validated",
          progress: 30,
          deadline: "2023-12-31",
          currentStage: "Development"
        },
        {
          id: 2,
          title: "IoT Smart Home System",
          description: "Create a smart home system using IoT devices",
          students: [],
          status: "Not Started",
          proposedBy: "company",
          approvalStatus: "pending",
          currentStage: "Proposal"
        }
      ]
      setProjects(fetchedProjects)
    }

    fetchProjects()

    // Simulating notifications
    setNotifications([
      { id: 1, message: 'New student application for AI Chatbot project' },
      { id: 2, message: 'Project proposal for IoT Smart Home System is pending approval' },
    ])
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProject(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProjectId) {
      setProjects(prevProjects => prevProjects.map(project => 
        project.id === editingProjectId ? { ...project, ...newProject } : project
      ))
      toast({
        title: "Project updated",
        description: `${newProject.title} has been successfully updated.`,
      })
    } else {
      const newProjectWithDefaults: Project = {
        ...newProject,
        id: projects.length + 1,
        status: 'Not Started',
        approvalStatus: 'pending',
        students: [],
        currentStage: 'Proposal',
      }
      setProjects(prevProjects => [...prevProjects, newProjectWithDefaults])
      toast({
        title: "Project proposed",
        description: `${newProject.title} has been successfully proposed and is pending approval.`,
      })
    }
    setIsDialogOpen(false)
    setNewProject({ title: '', description: '', proposedBy: 'company' })
    setEditingProjectId(null)
  }

  const handleEditProject = (project: Project) => {
    setNewProject({
      title: project.title,
      description: project.description,
      proposedBy: project.proposedBy,
    })
    setEditingProjectId(project.id)
    setIsDialogOpen(true)
  }

  const handleDeleteProject = (id: number) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== id))
    toast({
      title: "Project deleted",
      description: "The project has been successfully deleted.",
      variant: "destructive",
    })
  }

  const handleNotificationDismiss = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Company Dashboard</h2>

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
            <CardTitle className="text-sm font-medium">Assigned Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.reduce((total, project) => total + project.students.length, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects
                .filter(project => project.deadline)
                .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())[0]?.deadline || 'No deadlines'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>{editingProjectId ? 'Edit Project' : 'Propose New Project'}</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingProjectId ? 'Edit Project' : 'Propose New Project'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input id="title" name="title" value={newProject.title} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={newProject.description} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => {
                      setIsDialogOpen(false)
                      setNewProject({ title: '', description: '', proposedBy: 'company' })
                      setEditingProjectId(null)
                    }}>Cancel</Button>
                    <Button type="submit">{editingProjectId ? 'Update Project' : 'Propose Project'}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approval Status</TableHead>
                <TableHead>Current Stage</TableHead>
                <TableHead>Assigned Students</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell><StatusBadge status={project.approvalStatus} /></TableCell>
                  <TableCell>{project.currentStage || 'N/A'}</TableCell>
                  <TableCell>{project.students.join(', ') || 'None'}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditProject(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
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

