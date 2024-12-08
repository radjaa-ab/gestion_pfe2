import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  technologies: z.string().min(2, {
    message: "Please enter at least one technology.",
  }),
  status: z.enum(['in_progress', 'completed', 'on_hold']),
})

interface Project {
  id: string
  title: string
  description: string
  technologies: string
  status: 'in_progress' | 'completed' | 'on_hold'
}

export function ProjectModification() {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', title: 'AI Chatbot', description: 'Developing an AI-powered chatbot', technologies: 'Python, TensorFlow, NLP', status: 'in_progress' },
    { id: '2', title: 'E-commerce Platform', description: 'Building a scalable e-commerce solution', technologies: 'React, Node.js, MongoDB', status: 'in_progress' },
  ])

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      technologies: "",
      status: "in_progress",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (selectedProject) {
      // Update existing project
      setProjects(projects.map(project => 
        project.id === selectedProject.id ? { ...project, ...values } : project
      ))
      toast({
        title: "Project Updated",
        description: "The project has been updated successfully.",
      })
    } else {
      // Add new project
      const newProject = {
        id: (projects.length + 1).toString(),
        ...values,
      }
      setProjects([...projects, newProject])
      toast({
        title: "Project Added",
        description: "A new project has been added successfully.",
      })
    }
    setSelectedProject(null)
    form.reset()
  }

  const handleEditProject = (project: Project) => {
    setSelectedProject(project)
    form.reset(project)
  }

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId))
    toast({
      title: "Project Deleted",
      description: "The project has been deleted successfully.",
      variant: "destructive",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{selectedProject ? 'Edit Project' : 'Add New Project'}</CardTitle>
        <CardDescription>Modify existing projects or add new ones</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. React, Node.js, MongoDB" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on_hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{selectedProject ? 'Update Project' : 'Add Project'}</Button>
          </form>
        </Form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Existing Projects</h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>Status: {project.status}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p><strong>Description:</strong> {project.description}</p>
                  <p><strong>Technologies:</strong> {project.technologies}</p>
                  <div className="mt-4 space-x-2">
                    <Button onClick={() => handleEditProject(project)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


