import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface Subject {
  id: string
  title: string
  description: string
  submittedBy: string
  
  status: 'pending' | 'approved' | 'rejected'
}

export function SubjectValidation() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', title: 'AI-powered Chatbot', description: 'Develop a chatbot using latest AI technologies', submittedBy: 'Dr. John Doe', status: 'pending' },
    { id: '2', title: 'Blockchain for Voting', description: 'Implement a secure voting system using blockchain', submittedBy: 'Prof. Jane Smith', status: 'pending' },
    { id: '3', title: 'IoT Home Automation', description: 'Create a smart home system using IoT devices', submittedBy: 'Dr. Robert Johnson', status: 'pending' },
  ])

  const { toast } = useToast()

  const handleApprove = (subjectId: string) => {
    setSubjects(subjects.map(subject => 
      subject.id === subjectId ? { ...subject, status: 'approved' } : subject
    ))
    toast({
      title: "Subject Approved",
      description: "The subject has been approved successfully.",
    })
  }

  const handleReject = (subjectId: string, _p0?: string) => {
    setSubjects(subjects.map(subject => 
      subject.id === subjectId ? { ...subject, status: 'rejected' } : subject
    ))
    toast({
      title: "Subject Rejected",
      description: "The subject has been rejected with the provided reason.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Validation</CardTitle>
        <CardDescription>Review and validate submitted project subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>{subject.title}</TableCell>
                <TableCell>{subject.submittedBy}</TableCell>
                <TableCell>
                  <Badge variant={subject.status === 'approved' ? 'default' : subject.status === 'rejected' ? 'destructive' : 'secondary'}>
                    {subject.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleApprove(subject.id)} disabled={subject.status !== 'pending'}>
                      Approve
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" disabled={subject.status !== 'pending'}>Reject</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Reject Subject</DialogTitle>
                          <DialogDescription>Please provide a reason for rejecting this subject.</DialogDescription>
                        </DialogHeader>
                        <Textarea placeholder="Enter rejection reason" />
                        <DialogFooter>
                          <Button onClick={() => handleReject(subject.id, 'Reason placeholder')}>Confirm Rejection</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{subject.title}</DialogTitle>
                          <DialogDescription>Submitted by {subject.submittedBy}</DialogDescription>
                        </DialogHeader>
                        <p>{subject.description}</p>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

