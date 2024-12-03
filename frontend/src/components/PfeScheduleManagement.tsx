import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import api from '../services/api'

interface PfeEvent {
  id: number;
  title: string;
  type: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

const eventTypes = [
  "Student Selection",
  "Teacher Validation",
  "Supervisor Selection",
  "Jury Selection",
  "Project Submission",
  "Defense"
]

export default function PfeScheduleManagement() {
  const [events, setEvents] = useState<PfeEvent[]>([])
  const [newEvent, setNewEvent] = useState<Omit<PfeEvent, 'id'>>({
    title: '',
    type: '',
    startDate: new Date(),
    endDate: new Date(),
    description: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await api.get('/pfe-events')
      setEvents(response.data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch PFE events",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewEvent(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setNewEvent(prev => ({ ...prev, type: value }))
  }

  const handleDateChange = (date: Date | undefined, field: 'startDate' | 'endDate') => {
    if (date) {
      setNewEvent(prev => ({ ...prev, [field]: date }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/pfe-events', newEvent)
      toast({
        title: "Success",
        description: "PFE event added successfully",
      })
      fetchEvents()
      setNewEvent({
        title: '',
        type: '',
        startDate: new Date(),
        endDate: new Date(),
        description: ''
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add PFE event",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">PFE Schedule Management</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New PFE Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input 
                  id="event-title" 
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  placeholder="Enter event title" 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-type">Event Type</Label>
                <Select onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Calendar
                  mode="single"
                  selected={newEvent.startDate}
                  onSelect={(date) => handleDateChange(date, 'startDate')}
                  className="rounded-md border"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Calendar
                  mode="single"
                  selected={newEvent.endDate}
                  onSelect={(date) => handleDateChange(date, 'endDate')}
                  className="rounded-md border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Input 
                  id="event-description" 
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description" 
                />
              </div>
              <Button type="submit">Add Event</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>PFE Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.type}</TableCell>
                    <TableCell>{event.startDate.toLocaleDateString()}</TableCell>
                    <TableCell>{event.endDate.toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

