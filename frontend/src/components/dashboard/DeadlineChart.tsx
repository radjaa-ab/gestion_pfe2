"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface DeadlineProps {
  title: string
  daysRemaining: number
  totalDays: number
  className?: string
}

export function DeadlineChart({ title, daysRemaining, totalDays, className }: DeadlineProps) {
  const progress = Math.round((daysRemaining / totalDays) * 100)
  const getColor = () => {
    if (daysRemaining <= 7) return "bg-red-500"
    if (daysRemaining <= 14) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn("h-3 w-3 rounded-full", getColor())} />
              <span className="text-xs text-muted-foreground">
                {daysRemaining} days remaining
              </span>
            </div>
            <span className="text-xs font-bold">{progress}%</span>
          </div>
          <Progress value={progress} className={cn("h-2", getColor())} />
        </div>
      </CardContent>
    </Card>
  )
}

