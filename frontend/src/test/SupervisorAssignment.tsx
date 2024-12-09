import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface Project {
  id: string
  title: string
  student: string
  supervisor: string | null
}

interface Teacher {
  id: string
  name: string
}

export function SupervisorAssignment() {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', title: 'AI in Healthcare', student: 'Alice Johnson', supervisor: null },
    { id: '2', title: 'Blockchain for Supply Chain', student: 'Bob Smith', supervisor: null },
    { id: '3', title: 'IoT for Smart Cities', student: 'Charlie Brown', supervisor: null },
  ])

  const [teachers] = useState<Teacher[]>([
    { id: '1', name: 'Dr. John Doe' },
    { id: '2', name: 'Prof. Jane Smith' },
    { id: '3', name: 'Dr. Robert Johnson' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const handleAssignSupervisor = (projectId: string, teacherId: string) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, supervisor: teachers.find(t => t.id === teacherId)?.name || null }
        : project
    ))
    toast({
      title: "Supervisor Assigned",
      description: `Supervisor has been assigned to the project.`,
    })
  }

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.student.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supervisor Assignment</CardTitle>
        <CardDescription>Assign supervisors to student projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search projects or students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Title</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Supervisor</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.student}</TableCell>
                <TableCell>{project.supervisor || 'Not assigned'}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) => handleAssignSupervisor(project.id, value)}
                    value={teachers.find(t => t.name === project.supervisor)?.id}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Assign Supervisor" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

