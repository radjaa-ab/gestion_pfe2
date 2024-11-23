import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

interface ProjectNotification {
  id: number;
  type: 'default' | 'destructive' | 'warning';
  message: string;
}

interface Project {
  id: number;
  title: string;
  supervisor: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  type: string;
}

export default function Projects() {
  const [projectNotifications, setProjectNotifications] = useState<ProjectNotification[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    supervisor: '',
    status: 'Pending',
    type: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    // Simulating fetching project notifications and projects
    const fetchedNotifications: ProjectNotification[] = [
      { id: 1, type: 'default', message: 'New project proposal submitted.' },
      { id: 2, type: 'warning', message: 'Project deadline approaching.' },
      { id: 3, type: 'destructive', message: 'Project resources depleted.' },
    ]
    setProjectNotifications(fetchedNotifications)

    const fetchedProjects: Project[] = [
      { id: 1, title: 'AI Research', supervisor: 'Dr. Smith', status: 'In Progress', type: 'Research' },
      { id: 2, title: 'Web App Development', supervisor: 'Prof. Johnson', status: 'Completed', type: 'Development' },
      { id: 3, title: 'Data Analysis', supervisor: 'Dr. Brown', status: 'Pending', type: 'Analysis' },
    ]
    setProjects(fetchedProjects)
  }, [])

  const handleDismissNotification = (id: number) => {
    setProjectNotifications(prev => prev.filter(notification => notification.id !== id))
    toast({
      title: "Notification dismissed",
      description: "The project notification has been removed.",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProject(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: 'status' | 'type', value: string) => {
    setNewProject(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = projects.length + 1
    setProjects(prev => [...prev, { id, ...newProject }])
    toast({
      title: "Project created",
      description: `${newProject.title} has been successfully added.`,
    })
    setIsDialogOpen(false)
    setNewProject({ title: '', supervisor: '', status: 'Pending', type: '' })
  }

  const handleDelete = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id))
    toast({
      title: "Project deleted",
      description: "The project has been successfully removed.",
      variant: "destructive",
    })
  }

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.supervisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Projects</h2>
      
      {projectNotifications.map((notification) => (
        <Alert key={notification.id} variant={notification.type === 'warning' ? 'default' : notification.type}>
          <AlertTitle>{notification.type === 'destructive' ? 'Error' : notification.type === 'warning' ? 'Warning' : 'Info'}</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
          <Button variant="outline" size="sm" onClick={() => handleDismissNotification(notification.id)}>
            Dismiss
          </Button>
        </Alert>
      ))}

      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title">Project Title</label>
                <Input id="title" name="title" value={newProject.title} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="supervisor">Supervisor</label>
                <Input id="supervisor" name="supervisor" value={newProject.supervisor} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <label htmlFor="status">Status</label>
                <Select onValueChange={(value) => handleSelectChange('status', value)} value={newProject.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="type">Project Type</label>
                <Select onValueChange={(value) => handleSelectChange('type', value)} value={newProject.type}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Analysis">Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Create Project</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Supervisor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.supervisor}</TableCell>
                  <TableCell>
                    <Badge variant={project.status === 'Completed' ? 'success' : project.status === 'In Progress' ? 'warning' : 'default'}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.type}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)}>
                      <Trash2 className="h-4 w-4" />
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

