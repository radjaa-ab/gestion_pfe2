import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ProgressReport() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Progress Report</h2>
      <Card>
        <CardHeader>
          <CardTitle>Submit Progress Report</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input id="project-name" placeholder="Enter project name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="progress-summary">Progress Summary</Label>
              <Textarea id="progress-summary" placeholder="Summarize your progress..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenges">Challenges Faced</Label>
              <Textarea id="challenges" placeholder="Describe any challenges..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="next-steps">Next Steps</Label>
              <Textarea id="next-steps" placeholder="Outline your next steps..." />
            </div>
            <Button type="submit">Submit Report</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

