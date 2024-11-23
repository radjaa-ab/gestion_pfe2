import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProjectProposal() {
  const [proposal, setProposal] = useState({
    title: '',
    description: '',
    objectives: '',
    methodology: '',
    timeline: '',
    resources: '',
    team: '',
    category: ''
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProposal(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setProposal(prev => ({ ...prev, category: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Project proposal submitted:', proposal)
    toast({
      title: "Project Proposal Submitted",
      description: "Your project proposal has been successfully submitted for review.",
    })
    setProposal({
      title: '',
      description: '',
      objectives: '',
      methodology: '',
      timeline: '',
      resources: '',
      team: '',
      category: ''
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Project Proposal</h2>
      <Card>
        <CardHeader>
          <CardTitle>Submit Project Proposal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input 
                id="title" 
                name="title"
                placeholder="Enter project title" 
                value={proposal.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Project Category</Label>
              <Select onValueChange={handleSelectChange} value={proposal.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Tabs defaultValue="description" className="w-full">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="objectives">Objectives</TabsTrigger>
                <TabsTrigger value="methodology">Methodology</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea 
                    id="description" 
                    name="description"
                    placeholder="Describe your project..." 
                    value={proposal.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </TabsContent>
              <TabsContent value="objectives">
                <div className="space-y-2">
                  <Label htmlFor="objectives">Project Objectives</Label>
                  <Textarea 
                    id="objectives" 
                    name="objectives"
                    placeholder="List your project objectives..." 
                    value={proposal.objectives}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </TabsContent>
              <TabsContent value="methodology">
                <div className="space-y-2">
                  <Label htmlFor="methodology">Methodology</Label>
                  <Textarea 
                    id="methodology" 
                    name="methodology"
                    placeholder="Describe your project methodology..." 
                    value={proposal.methodology}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </TabsContent>
              <TabsContent value="timeline">
                <div className="space-y-2">
                  <Label htmlFor="timeline">Project Timeline</Label>
                  <Textarea 
                    id="timeline" 
                    name="timeline"
                    placeholder="Outline your project timeline..." 
                    value={proposal.timeline}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </TabsContent>
              <TabsContent value="resources">
                <div className="space-y-2">
                  <Label htmlFor="resources">Required Resources</Label>
                  <Textarea 
                    id="resources" 
                    name="resources"
                    placeholder="List required resources..." 
                    value={proposal.resources}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className="space-y-2">
              <Label htmlFor="team">Team Members</Label>
              <Textarea 
                id="team" 
                name="team"
                placeholder="List team members and their roles..." 
                value={proposal.team}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Submit Proposal</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

