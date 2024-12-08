import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { PageContainer } from '@/components/PageContainer'
import { Input } from "@/components/ui/input"

type NotificationType = 'all' | 'info' | 'warning' | 'success'

interface Notification {
  id: number
  type: 'info' | 'warning' | 'success'
  message: string
  date: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: 1, type: 'info', message: 'New project proposal submitted', date: '2023-07-01', read: false },
  { id: 2, type: 'warning', message: 'Deadline approaching for Project X', date: '2023-07-02', read: false },
  { id: 3, type: 'success', message: 'Your project has been approved', date: '2023-07-03', read: false },
  { id: 4, type: 'info', message: 'Team meeting scheduled for tomorrow', date: '2023-07-04', read: true },
  { id: 5, type: 'warning', message: 'You have unread feedback', date: '2023-07-05', read: false },
]

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [filter, setFilter] = useState<NotificationType>('all')
  const [newNotification, setNewNotification] = useState('')
  const [newNotificationType, setNewNotificationType] = useState<'info' | 'warning' | 'success'>('info')
  const { toast } = useToast()

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' ? true : notification.type === filter
  )

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const handleAddNotification = () => {
    if (newNotification.trim() === '') {
      toast({
        title: "Error",
        description: "Notification message cannot be empty.",
        variant: "destructive",
      })
      return
    }
    const newNotificationObj: Notification = {
      id: notifications.length + 1,
      type: newNotificationType,
      message: newNotification,
      date: new Date().toISOString().split('T')[0],
      read: false,
    }
    setNotifications([...notifications, newNotificationObj])
    setNewNotification('')
    toast({
      title: "Notification added",
      description: "A new notification has been added.",
    })
  }

  const getIcon = (type: 'info' | 'warning' | 'success') => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <PageContainer title="Notifications">
      <div className="flex justify-between items-center mb-4">
        <Badge variant="secondary" className="text-sm">
          {unreadCount} unread
        </Badge>
        <div className="flex items-center space-x-2">
          <Select value={filter} onValueChange={(value: NotificationType) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter notifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="info">Information</SelectItem>
              <SelectItem value="warning">Warnings</SelectItem>
              <SelectItem value="success">Success</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            Mark all as read
          </Button>
        </div>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Notification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              value={newNotification}
              onChange={(e) => setNewNotification(e.target.value)}
              placeholder="Enter notification message"
              className="flex-grow"
            />
            <Select value={newNotificationType} onValueChange={(value: 'info' | 'warning' | 'success') => setNewNotificationType(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddNotification}>Add</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">No notifications to display.</p>
          ) : (
            <ul className="space-y-4">
              {filteredNotifications.map((notification) => (
                <li key={notification.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <p className={`text-sm font-medium ${notification.read ? 'text-gray-600 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.date}</p>
                  </div>
                  {!notification.read && (
                    <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                      Mark as read
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  )
}

