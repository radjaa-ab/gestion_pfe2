import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"

export default function ScheduleManagement() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Schedule Management</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input id="event-title" placeholder="Enter event title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-date">Event Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <Button type="submit">Add Event</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Project Presentation</h3>
                  <p className="text-sm text-gray-500">July 15, 2023</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Team Meeting</h3>
                  <p className="text-sm text-gray-500">July 20, 2023</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

