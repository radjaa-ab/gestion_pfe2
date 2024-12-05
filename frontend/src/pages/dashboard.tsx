import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { FileText, Clock, Calendar } from 'lucide-react'
import { PageContainer } from '@/components/PageContainer'

interface Notification {
  id: number;
  type: 'default' | 'destructive' | 'warning';
  message: string;
}

interface Project {
  id: number;
  title: string;
  progress: number;
}

interface Task {
  id: number;
  title: string;
  dueDate: string;
}

export default function Dashboard() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Simulating fetching data
    const fetchedNotifications: Notification[] = [
      { id: 1, type: 'default', message: 'Welcome to your dashboard!' },
      { id: 2, type: 'warning', message: 'You have a pending task.' },
      { id: 3, type: 'destructive', message: 'Critical update required.' },
    ]
    setNotifications(fetchedNotifications)

    const fetchedProjects: Project[] = [
      { id: 1, title: 'AI Research Project', progress: 60 },
      { id: 2, title: 'Web Development Project', progress: 30 },
    ]
    setProjects(fetchedProjects)

    const fetchedTasks: Task[] = [
      { id: 1, title: 'Submit Literature Review', dueDate: '2023-10-15' },
      { id: 2, title: 'Implement User Authentication', dueDate: '2023-10-20' },
    ]
    setTasks(fetchedTasks)
  }, [])

  const handleDismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
    toast({
      title: "Notification dismissed",
      description: "The notification has been removed.",
    })
  }

  return (
    <PageContainer title="dashboard">
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
      
      {notifications.map((notification) => (
        <Alert key={notification.id} variant={notification.type === 'warning' ? 'default' : notification.type}>
          <AlertTitle>{notification.type === 'destructive' ? 'Error' : notification.type === 'warning' ? 'Warning' : 'Info'}</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
          <Button variant="outline" size="sm" onClick={() => handleDismissNotification(notification.id)}>
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
            <div className="text-2xl font-bold">{tasks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.length > 0 ? new Date(Math.min(...tasks.map(t => new Date(t.dueDate).getTime()))).toLocaleDateString() : 'No deadlines'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add more dashboard content here as needed */}
    </div>
    </PageContainer>
  )
}

