import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Student {
  id: string
  name: string
  project: string
}

export function DefenseAuthorization() {
  const [students, setStudents] = useState<Student[]>([])
  const [authorizations, setAuthorizations] = useState<{[key: string]: 'authorized' | 'not_authorized' | ''}>({})
  const { toast } = useToast()

  useEffect(() => {
    // Fetch students from API
    // For now, we'll use mock data
    setStudents([
      { id: '1', name: 'Asma Dahman', project: 'AI in Healthcare' },
      { id: '2', name: 'Jane Smith', project: 'Blockchain for Supply Chain' },
      { id: '3', name: 'Alice Johnson', project: 'IoT Smart Home' },
    ])
  }, [])

  const handleAuthorizationChange = (studentId: string, value: 'authorized' | 'not_authorized') => {
    setAuthorizations(prev => ({ ...prev, [studentId]: value }))
  }

  const handleSubmit = () => {
    // Submit authorizations to API
    console.log('Authorizations:', authorizations)
    toast({
      title: "Authorizations submitted",
      description: "Defense authorizations have been submitted successfully.",
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
                    value={authorizations[student.id] || ''}
                    onValueChange={(value: 'authorized' | 'not_authorized') => handleAuthorizationChange(student.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select authorization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="authorized">Authorized (Session 1 - June)</SelectItem>
                      <SelectItem value="not_authorized">Not Authorized (Session 2 - September)</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={handleSubmit} className="mt-4">Submit Authorizations</Button>
      </CardContent>
    </Card>
  )
}

