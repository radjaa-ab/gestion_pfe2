import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface Resource {
  id: string
  name: string
  type: 'hardware' | 'software' | 'human'
  availability: number
}

interface Allocation {
  id: string
  projectId: string
  resourceId: string
  amount: number
}

interface Project {
  id: string
  title: string
}

export function ResourceAllocation() {
  const [resources, setResources] = useState<Resource[]>([
    { id: '1', name: 'High-performance GPU', type: 'hardware', availability: 5 },
    { id: '2', name: 'Cloud Server Instances', type: 'hardware', availability: 20 },
    { id: '3', name: 'AI Development Framework License', type: 'software', availability: 10 },
    { id: '4', name: 'Senior AI Engineer', type: 'human', availability: 2 },
  ])

  const [allocations, setAllocations] = useState<Allocation[]>([
    { id: '1', projectId: '1', resourceId: '1', amount: 2 },{ id: '1', projectId: '1', resourceId: '1', amount: 2 },
    { id: '2', projectId: '2', resourceId: '3', amount: 5 },
  ])

  const [projects] = useState<Project[]>([
    { id: '1', title: 'AI Chatbot Development' },
    { id: '2', title: 'E-commerce Platform' },
  ])

  const { toast } = useToast()

  const handleAddAllocation = (newAllocation: Omit<Allocation, 'id'>) => {
    const resource = resources.find(r => r.id === newAllocation.resourceId)
    if (resource && resource.availability >= newAllocation.amount) {
      const allocation = {
        ...newAllocation,
        id: Date.now().toString(),
      }
      setAllocations([...allocations, allocation])
      setResources(resources.map(r => 
        r.id === newAllocation.resourceId 
          ? { ...r, availability: r.availability - newAllocation.amount }
          : r
      ))
      toast({
        title: "Resource Allocated",
        description: "The resource has been successfully allocated to the project.",
      })
    } else {
      toast({
        title: "Allocation Failed",
        description: "Not enough resources available for allocation.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Allocation</CardTitle>
        <CardDescription>Manage and allocate resources to projects</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Allocate Resource</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Allocate Resource</DialogTitle>
              <DialogDescription>Assign resources to a project.</DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              handleAddAllocation({
                projectId: formData.get('projectId') as string,
                resourceId: formData.get('resourceId') as string,
                amount: parseInt(formData.get('amount') as string),
              })
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="projectId" className="text-right">Project</Label>
                  <Select name="projectId" required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="resourceId" className="text-right">Resource</Label>
                  <Select name="resourceId" required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select resource" />
                    </SelectTrigger>
                    <SelectContent>
                      {resources.map(resource => (
                        <SelectItem key={resource.id} value={resource.id}>{resource.name} (Available: {resource.availability})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">Amount</Label>
                  <Input id="amount" name="amount" type="number" min="1" className="col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Allocate</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Current Allocations</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allocations.map(allocation => {
                const project = projects.find(p => p.id === allocation.projectId)
                const resource = resources.find(r => r.id === allocation.resourceId)
                return (
                  <TableRow key={allocation.id}>
                    <TableCell>{project?.title}</TableCell>
                    <TableCell>{resource?.name}</TableCell>
                    <TableCell>{allocation.amount}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Available Resources</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Availability</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map(resource => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell>{resource.availability}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

