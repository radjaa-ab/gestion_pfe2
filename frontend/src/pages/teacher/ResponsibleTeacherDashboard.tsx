import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { FileText, Users, Calendar } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatusBadge } from '../../components/status-badge'
import { Project } from '../../pages/types'

export default function ResponsibleTeacherDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [feedback, setFeedback] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Simulating fetching projects
    const fetchedProjects: Project[] = [
      {
        id: 1,
        title: "AI Chatbot Development",
        description: "Develop an AI-powered chatbot for customer service",
        students: ["John Doe"],
        status: "Pending Approval",
        proposedBy: "teacher",
        approvalStatus: "pending",
        progress: 0,
        deadline: "2023-12-31",
        currentStage: "Proposal"
      },
      {
        id: 2,
        title: "IoT Smart Home System",
        description: "Create a smart home system using IoT devices",
        students: ["Jane Smith", "Alice Johnson"],
        status: "Pending Approval",
        proposedBy: "student",
        approvalStatus: "pending",
        progress: 0,
        currentStage: "Proposal"
      },
    ]
    setProjects(fetchedProjects)

    // Simulating notifications
    setNotifications([
      { id: 1, message: 'New project proposal submitted for review' },
      { id: 2, message: 'Deadline for project approval approaching' },
    ])
  }, [])

  const handleProjectAction = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  const handleSubmitFeedback = () => {
    if (!selectedProject) return

    const updatedProjects = projects.map(p => {
      if (p.id === selectedProject.id) {
        return {
          ...p,
          approvalStatus: feedback === 'validate' ? 'validated' : feedback === 'reject' ? 'rejected' : 'changes_requested',
          status: feedback === 'validate' ? 'Approved' : 'Pending Changes',
        } as Project
      }
      return p
    })

    setProjects(updatedProjects)
    toast({
      title: "Project Updated",
      description: `Project "${selectedProject.title}" has been ${feedback === 'validate' ? 'validated' : feedback === 'reject' ? 'rejected' : 'requested changes'}.`,
    })
    setIsDialogOpen(false)
    setSelectedProject(null)
    setFeedback('')
  }

  const handleNotificationDismiss = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Responsible Teacher Dashboard</h2>

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
            <CardTitle className="text-sm font-medium">Pending Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter(p => p.approvalStatus === 'pending').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.reduce((acc, p) => acc + p.students.length, 0)}</div>
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
                .filter(p => p.deadline)
                .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())[0]?.deadline || 'No deadlines'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Proposals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Proposed By</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.proposedBy}</TableCell>
                  <TableCell>{project.students.join(', ')}</TableCell>
                  <TableCell><StatusBadge status={project.approvalStatus} /></TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleProjectAction(project)}>Validate</Button>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleProjectAction(project)}>Request Changes</Button>
                    <Button variant="outline" size="sm" onClick={() => handleProjectAction(project)}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select onValueChange={setFeedback}>
              <SelectTrigger>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="validate">Validate</SelectItem>
                <SelectItem value="changes">Request Changes</SelectItem>
                <SelectItem value="reject">Reject</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Provide feedback (optional)"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button onClick={handleSubmitFeedback}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
