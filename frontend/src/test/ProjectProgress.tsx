import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface Milestone {
  id: string
  title: string
  dueDate: string
  status: 'pending' | 'completed' | 'overdue'
}

interface Project {
  id: string
  title: string
  progress: number
  milestones: Milestone[]
}

export function ProjectProgress() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'AI Chatbot Development',
      progress: 60,
      milestones: [
        { id: '1', title: 'Project Initiation', dueDate: '2023-06-01', status: 'completed' },
        { id: '2', title: 'Design Phase', dueDate: '2023-07-15', status: 'completed' },
        { id: '3', title: 'Development Sprint 1', dueDate: '2023-08-30', status: 'pending' },
        { id: '4', title: 'Testing Phase', dueDate: '2023-09-30', status: 'pending' },
      ]
    },
    {
      id: '2',
      title: 'E-commerce Platform',
      progress: 30,
      milestones: [
        { id: '1', title: 'Requirements Gathering', dueDate: '2023-06-15', status: 'completed' },
        { id: '2', title: 'Database Design', dueDate: '2023-07-30', status: 'pending' },
        { id: '3', title: 'Frontend Development', dueDate: '2023-09-15', status: 'pending' },
        { id: '4', title: 'Backend Integration', dueDate: '2023-10-30', status: 'pending' },
      ]
    }
  ])

  const { toast } = useToast()

  const handleAddMilestone = (projectId: string, newMilestone: Omit<Milestone, 'id'>) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedMilestones = [...project.milestones, { ...newMilestone, id: Date.now().toString() }]
        return { ...project, milestones: updatedMilestones }
      }
      return project
    }))
    toast({
      title: "Milestone Added",
      description: "New milestone has been added to the project.",
    })
  }

  const handleUpdateMilestoneStatus = (projectId: string, milestoneId: string, newStatus: Milestone['status']) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedMilestones = project.milestones.map(milestone => 
          milestone.id === milestoneId ? { ...milestone, status: newStatus } : milestone
        )
        const completedMilestones = updatedMilestones.filter(m => m.status === 'completed').length
        const newProgress = Math.round((completedMilestones / updatedMilestones.length) * 100)
        return { ...project, milestones: updatedMilestones, progress: newProgress }
      }
      return project
    }))
    toast({
      title: "Milestone Updated",
      description: "The milestone status has been updated.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Progress Tracker</CardTitle>
        <CardDescription>Monitor project milestones and overall progress</CardDescription>
      </CardHeader>
      <CardContent>
        {projects.map(project => (
          <div key={project.id} className="mb-8">
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            <Progress value={project.progress} className="mb-4" />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Milestone</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.milestones.map(milestone => (
                  <TableRow key={milestone.id}>
                    <TableCell>{milestone.title}</TableCell>
                    <TableCell>{milestone.dueDate}</TableCell>
                    <TableCell>{milestone.status}</TableCell>
                    <TableCell>
                      <select
                        value={milestone.status}
                        onChange={(e) => handleUpdateMilestoneStatus(project.id, milestone.id, e.target.value as Milestone['status'])}
                        className="border rounded p-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="overdue">Overdue</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">Add Milestone</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Milestone</DialogTitle>
                  <DialogDescription>Enter the details for the new milestone.</DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleAddMilestone(project.id, {
                    title: formData.get('title') as string,
                    dueDate: formData.get('dueDate') as string,
                    status: 'pending'
                  })
                }}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">Title</Label>
                      <Input id="title" name="title" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                      <Input id="dueDate" name="dueDate" type="date" className="col-span-3" required />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Milestone</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

