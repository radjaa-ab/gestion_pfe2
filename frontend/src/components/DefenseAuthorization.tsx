import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Student {
  id: number
  name: string
  project: string
  authorized: boolean
}

export function DefenseAuthorization() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Alice Johnson", project: "AI in Healthcare", authorized: false },
    { id: 2, name: "Bob Smith", project: "Blockchain for Supply Chain", authorized: false },
    { id: 3, name: "Charlie Brown", project: "IoT for Smart Cities", authorized: false },
  ])
  const { toast } = useToast()

  const handleAuthorization = (studentId: number, authorized: boolean) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, authorized } : student
    ))
    toast({
      title: authorized ? "Student Authorized" : "Student Not Authorized",
      description: `${students.find(s => s.id === studentId)?.name} has been ${authorized ? 'authorized' : 'not authorized'} for defense.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Defense Authorization</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Authorization</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.project}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) => handleAuthorization(student.id, value === 'authorized')}
                    defaultValue={student.authorized ? 'authorized' : 'not_authorized'}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select authorization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="authorized">Authorized (Session 1)</SelectItem>
                      <SelectItem value="not_authorized">Not Authorized (Session 2)</SelectItem>
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

