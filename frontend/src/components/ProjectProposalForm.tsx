import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ProjectProposalForm() {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [options, setOptions] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log({ title, type, options, description })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Propose a Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Project Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="type">Project Type</Label>
            <Input 
              id="type" 
              value={type} 
              onChange={(e) => setType(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="options">Options</Label>
            <Input 
              id="options" 
              value={options} 
              onChange={(e) => setOptions(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="description">Project Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>
          <Button type="submit">Submit Proposal</Button>
        </form>
      </CardContent>
    </Card>
  )
}