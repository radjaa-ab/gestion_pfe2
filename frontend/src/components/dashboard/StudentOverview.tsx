"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileText, Clock, CheckCircle } from 'lucide-react'

interface OverviewCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  progress?: number
}

function OverviewCard({ title, value, description, icon, progress }: OverviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {progress !== undefined && (
          <Progress value={progress} className="mt-3 h-2" />
        )}
      </CardContent>
    </Card>
  )
}

export function StudentOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <OverviewCard
        title="Project Progress"
        value="65%"
        description="Overall completion"
        icon={<FileText className="h-4 w-4 text-muted-foreground" />}
        progress={65}
      />
      <OverviewCard
        title="Next Deadline"
        value="7 days"
        description="Literature Review"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
      />
      <OverviewCard
        title="Completed Tasks"
        value="12/15"
        description="80% completion rate"
        icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
        progress={80}
      />
    </div>
  )
}

