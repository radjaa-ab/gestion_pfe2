import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TeamFormation() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Team Formation</h2>
      <Card>
        <CardHeader>
          <CardTitle>Create a Team</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Team Name</Label>
              <Input id="team-name" placeholder="Enter team name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-members">Team Members</Label>
              <Textarea id="team-members" placeholder="Enter team members' names (one per line)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-idea">Project Idea</Label>
              <Textarea id="project-idea" placeholder="Briefly describe your project idea" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-skills">Team Skills</Label>
              <Textarea id="team-skills" placeholder="List the skills your team brings to the project" />
            </div>
            <Button type="submit">Create Team</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

