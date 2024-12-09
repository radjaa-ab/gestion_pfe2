import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  schedule: string
}

export function EmailManagement() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const { toast } = useToast()

  const handleAddTemplate = (templateData: Omit<EmailTemplate, 'id'>) => {
    const newTemplate: EmailTemplate = {
      ...templateData,
      id: (templates.length + 1).toString(),
    }
    setTemplates([...templates, newTemplate])
    toast({
      title: "Template added",
      description: `${newTemplate.name} has been added successfully.`,
    })
  }

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(template => template.id !== templateId))
    toast({
      title: "Template deleted",
      description: "The email template has been removed.",
    })
  }

  const handlePreviewEmail = (template: EmailTemplate) => {
    // In a real application, you might want to show this in a modal
    toast({
      title: "Email Preview",
      description: `Subject: ${template.subject}\n\nBody: ${template.body}`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Management</CardTitle>
        <CardDescription>Create and manage email templates and schedules</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Add New Template</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Template</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Email Template</DialogTitle>
                <DialogDescription>Create a new email template and set its schedule.</DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleAddTemplate({
                  name: formData.get('name') as string,
                  subject: formData.get('subject') as string,
                  body: formData.get('body') as string,
                  schedule: formData.get('schedule') as string,
                })
              }}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" name="name" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">Subject</Label>
                    <Input id="subject" name="subject" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="body" className="text-right">Body</Label>
                    <Textarea id="body" name="body" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="schedule" className="text-right">Schedule</Label>
                    <Select name="schedule" required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Template</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Email Templates</h3>
          <div className="space-y-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>Schedule: {template.schedule}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p><strong>Subject:</strong> {template.subject}</p>
                  <p className="mt-2"><strong>Body:</strong> {template.body.substring(0, 100)}...</p>
                  <div className="mt-4 space-x-2">
                    <Button onClick={() => handlePreviewEmail(template)}>Preview</Button>
                    <Button variant="destructive" onClick={() => handleDeleteTemplate(template.id)}>Delete</Button>
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

