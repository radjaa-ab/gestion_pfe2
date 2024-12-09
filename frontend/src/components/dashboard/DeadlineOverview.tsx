"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeadlineChart } from "./DeadlineChart"

interface Deadline {
  id: number
  title: string
  daysRemaining: number
  totalDays: number
}

const deadlines: Deadline[] = [
  {
    id: 1,
    title: "Project Proposal Submission",
    daysRemaining: 15,
    totalDays: 30,
  },
  {
    id: 2,
    title: "Literature Review",
    daysRemaining: 7,
    totalDays: 21,
  },
  {
    id: 3,
    title: "Progress Report",
    daysRemaining: 25,
    totalDays: 45,
  },
  {
    id: 4,
    title: "Final Defense",
    daysRemaining: 60,
    totalDays: 90,
  },
]

export function DeadlineOverview() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {deadlines.map((deadline) => (
            <DeadlineChart
              key={deadline.id}
              title={deadline.title}
              daysRemaining={deadline.daysRemaining}
              totalDays={deadline.totalDays}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

