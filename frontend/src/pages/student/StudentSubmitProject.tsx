//import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SubmitProject() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Submit Project</h2>
      <Card>
        <CardHeader>
          <CardTitle>Project Submission</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-title">Project Title</Label>
              <Input id="project-title" placeholder="Enter project title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea id="project-description" placeholder="Describe your project..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-members">Team Members</Label>
              <Input id="team-members" placeholder="Enter team members' names" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-url">Project URL</Label>
              <Input id="project-url" placeholder="Enter project URL (if applicable)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload Project Files</Label>
              <Input id="file-upload" type="file" multiple />
            </div>
            <Button type="submit">Submit Project</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

