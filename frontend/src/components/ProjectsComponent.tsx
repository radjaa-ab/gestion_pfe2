import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { StatusBadge } from './status-badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Project {
  id: number
  title: string
  description: string
  progress: number
  deadline?: string
  students: string[]
  status: string
  proposedBy: string
  approvalStatus: string
}

interface ProposedProject {
  id: number
  title: string
  description: string
  proposedBy: string
  status: "validated" | "rejected" | "pending" | "changes_requested" | "Pending Approval" | "Project Updated" | "Approved" | "Pending Changes" | "In Progress" | "Completed" | "Not Started"
}

export function ProjectsComponent() {
  const [projects] = React.useState<Project[]>([
    { id: 1, title: 'AI Research Project', description: 'Researching AI algorithms', progress: 60, deadline: '2023-12-31', students: ['John Doe'], status: 'In Progress', proposedBy: 'teacher', approvalStatus: 'validated' },
    { id: 2, title: 'Web Development Project', description: 'Building a web application', progress: 30, deadline: '2023-11-30', students: ['Jane Smith'], status: 'Not Started', proposedBy: 'student', approvalStatus: 'pending' },
  ])
  const [proposedProjects, setProposedProjects] = React.useState<ProposedProject[]>([
    { id: 1, title: 'Machine Learning for Healthcare', description: 'Applying ML in healthcare diagnostics', proposedBy: 'student', status: 'pending' },
    { id: 2, title: 'Blockchain in Supply Chain', description: 'Implementing blockchain for supply chain management', proposedBy: 'student', status: 'validated' },
  ])
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = React.useState(false)
  const [isProjectDialogOpen, setIsProjectDialogOpen] = React.useState(false)
  const [newUpdate, setNewUpdate] = React.useState('')
  const [newProject, setNewProject] = React.useState<Omit<ProposedProject, 'id' | 'proposedBy' | 'status'>>({ title: '', description: '' })
  const [editingProjectId, setEditingProjectId] = React.useState<number | null>(null)
  const { toast } = useToast()

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

  return (
    <div className="space-y-6">
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
                    <label htmlFor="title" className="text-sm font-medium">Project Title</label>
                    <input
                      id="title"
                      className="w-full p-2 border rounded"
                      value={newProject.title}
                      onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Project Description</label>
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
    </div>
  )
}

