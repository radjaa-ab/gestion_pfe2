import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '@/hooks/useAuth'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const baseSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  technologies: z.string().min(2, {
    message: "Please enter at least one technology.",
  }),
})

const studentSchema = baseSchema.extend({
  partner: z.string().optional(),
  supervisor: z.string().optional(),
})

const teacherSchema = baseSchema.extend({
  type: z.enum(['classic', 'innovative']),
  option: z.enum(['GL', 'IA', 'RSD', 'SIC']),
})

const companySchema = baseSchema.extend({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
})

export function ProjectSubmission() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [showPartnerNotification, setShowPartnerNotification] = useState(false)
  const [showSupervisorNotification, setShowSupervisorNotification] = useState(false)

  let schema: z.ZodType<any>
  switch (user?.role) {
    case 'student':
      schema = studentSchema
      break
    case 'teacher':
      schema = teacherSchema
      break
    case 'company':
      schema = companySchema
      break
    default:
      schema = baseSchema
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      technologies: "",
      ...(user?.role === 'student' && { partner: "", supervisor: "" }),
      ...(user?.role === 'teacher' && { type: "classic", option: "GL" }),
      ...(user?.role === 'company' && { companyName: "" }),
    },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values)
    if (user?.role === 'student') {
      if (values.partner) {
        setShowPartnerNotification(true)
      }
      if (values.supervisor) {
        setShowSupervisorNotification(true)
      }
    }
    toast({
      title: "Project submitted",
      description: "Your project has been successfully submitted for review.",
    })
  }

  const handlePartnerResponse = (accepted: boolean) => {
    setShowPartnerNotification(false)
    toast({
      title: accepted ? "Partner Accepted" : "Partner Declined",
      description: accepted ? "Your partner has accepted the collaboration." : "Your partner has declined the collaboration.",
    })
  }

  const handleSupervisorResponse = (accepted: boolean) => {
    setShowSupervisorNotification(false)
    toast({
      title: accepted ? "Supervisor Accepted" : "Supervisor Declined",
      description: accepted ? "Your supervisor has accepted to oversee the project." : "Your supervisor has declined to oversee the project.",
    })
  }

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Submit a New Project</CardTitle>
        <CardDescription>Propose a new project for review.</CardDescription>
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
                    <Textarea placeholder="Describe your project" {...field} />
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
                  <FormLabel>Technologies Used</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. React, Node.js, MongoDB" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {user?.role === 'student' && (
              <>
                <FormField
                  control={form.control}
                  name="partner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partner (Optional)</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a partner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student1">Student 1</SelectItem>
                            <SelectItem value="student2">Student 2</SelectItem>
                            <SelectItem value="student3">Student 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supervisor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supervisor (Optional)</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a supervisor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="teacher1">Teacher 1</SelectItem>
                            <SelectItem value="teacher2">Teacher 2</SelectItem>
                            <SelectItem value="teacher3">Teacher 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {user?.role === 'teacher' && (
              <>
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="innovative">Innovative</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="option"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Option</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="GL">GL</SelectItem>
                          <SelectItem value="IA">IA</SelectItem>
                          <SelectItem value="RSD">RSD</SelectItem>
                          <SelectItem value="SIC">SIC</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {user?.role === 'company' && (
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit">Submit Project</Button>
          </form>
        </Form>
      </CardContent>

      {/* Partner Notification Dialog */}
      <Dialog open={showPartnerNotification} onOpenChange={setShowPartnerNotification}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Partner Request</DialogTitle>
            <DialogDescription>
              You have been requested to be a partner for a project. Do you accept?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => handlePartnerResponse(false)}>
              Decline
            </Button>
            <Button onClick={() => handlePartnerResponse(true)}>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Supervisor Notification Dialog */}
      <Dialog open={showSupervisorNotification} onOpenChange={setShowSupervisorNotification}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supervisor Request</DialogTitle>
            <DialogDescription>
              You have been requested to supervise a project. Do you accept?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleSupervisorResponse(false)}>
              Decline
            </Button>
            <Button onClick={() => handleSupervisorResponse(true)}>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

