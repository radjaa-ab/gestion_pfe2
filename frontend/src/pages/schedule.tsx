import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import api from '../services/api'

interface PfeEvent {
  id: number;
  title: string;
  deadline: Date;
}

const standardEvents = [
  { title: "Student Project Selection", id: "student_selection" },
  { title: "Teacher Validation of Student Choices", id: "teacher_validation" },
  { title: "Teacher Selection of Students to Supervise", id: "teacher_selection" },
  { title: "Jury Selection", id: "jury_selection" },
  { title: "Project Proposal Submission", id: "project_proposal" },
  { title: "Mid-term Report Submission", id: "midterm_report" },
  { title: "Final Report Submission", id: "final_report" },
  { title: "Defense Presentation", id: "defense_presentation" },
]

export default function Schedule() {
  const [events, setEvents] = useState<PfeEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState(standardEvents[0])
  const [deadline, setDeadline] = useState<Date | undefined>(new Date())
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!deadline) {
      toast({
        title: "Error",
        description: "Please select a deadline",
        variant: "destructive",
      })
      return
    }
    try {
      const newEvent = {
        title: selectedEvent.title,
        deadline,
      }
      const response = await api.post('/pfe-events', newEvent)
      setEvents(prevEvents => [...prevEvents, response.data])
      toast({
        title: "Success",
        description: "PFE event scheduled successfully",
      })
      setDeadline(new Date())
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule PFE event",
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
            <CardTitle>Schedule PFE Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="event-select" className="block text-sm font-medium text-gray-700">Select Event</label>
                <select
                  id="event-select"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedEvent.id}
                  onChange={(e) => setSelectedEvent(standardEvents.find(event => event.id === e.target.value) || standardEvents[0])}
                >
                  {standardEvents.map((event) => (
                    <option key={event.id} value={event.id}>{event.title}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  className="rounded-md border"
                />
              </div>
              <Button type="submit">Schedule Event</Button>
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
                  <TableHead>Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{new Date(event.deadline).toLocaleDateString()}</TableCell>
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

