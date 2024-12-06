import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface Theme {
  id: number
  title: string
  description: string
  technologies: string
  supervisor: string
  specialty: string
  status: 'pending' | 'approved' | 'rejected'
}

export function ThemeSelection({userRole, themesToValidate}: {userRole: 'teacher' | 'admin' | null, themesToValidate: Theme[]}) {
  const [themes, setThemes] = useState<Theme[]>([])
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [specialty, setSpecialty] = useState<string>('')
  const [teacherWishList, setTeacherWishList] = useState<number[]>([])
  const { toast } = useToast()

  const handleApprove = (theme: Theme) => {
    setThemes(themes.map(t => t.id === theme.id ? { ...t, status: 'approved' } : t))
    toast({
      title: "Theme Approved",
      description: `The theme "${theme.title}" has been approved.`,
    })
  }

  const handleReject = (theme: Theme) => {
    setSelectedTheme(theme)
  }

  const submitRejection = () => {
    if (selectedTheme) {
      setThemes(themes.map(t => t.id === selectedTheme.id ? { ...t, status: 'rejected' } : t))
      toast({
        title: "Theme Rejected",
        description: `The theme "${selectedTheme.title}" has been rejected.`,
        variant: "destructive",
      })
      setSelectedTheme(null)
      setRejectionReason('')
    }
  }

  const calculateThemeLimit = (totalThemes: number, totalTeachers: number) => {
    return Math.ceil(totalThemes / totalTeachers)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Selection</CardTitle>
        <CardDescription>Approve or reject proposed themes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="ee">Electrical Engineering</SelectItem>
              <SelectItem value="me">Mechanical Engineering</SelectItem>
            </SelectContent>
          </Select>
          <Input className="w-[300px]" placeholder="Search themes..." />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Supervisor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {themes.map((theme) => (
              <TableRow key={theme.id}>
                <TableCell>{theme.title}</TableCell>
                <TableCell>{theme.supervisor}</TableCell>
                <TableCell>{theme.specialty}</TableCell>
                <TableCell>
                  <Badge variant={theme.status === 'approved' ? 'default' : theme.status === 'rejected' ? 'destructive' : 'secondary'}>
                    {theme.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleApprove(theme)} disabled={theme.status !== 'pending'}>
                    Approve
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-2" onClick={() => handleReject(theme)} disabled={theme.status !== 'pending'}>
                        Reject
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Reject Theme</DialogTitle>
                      </DialogHeader>
                      <Textarea
                        placeholder="Enter reason for rejection"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                      <Button onClick={submitRejection}>Submit Rejection</Button>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {userRole === 'teacher' && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Teacher's Wish List</h3>
            <p>You can select up to {calculateThemeLimit(themesToValidate.length, 10)} themes.</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {themesToValidate.map((theme) => (
                <Button
                  key={theme.id}
                  variant={teacherWishList.includes(theme.id) ? "default" : "outline"}
                  onClick={() => {
                    if (teacherWishList.includes(theme.id)) {
                      setTeacherWishList(teacherWishList.filter(id => id !== theme.id))
                    } else if (teacherWishList.length < calculateThemeLimit(themesToValidate.length, 10)) {
                      setTeacherWishList([...teacherWishList, theme.id])
                    } else {
                      toast({
                        title: "Limit Reached",
                        description: "You've reached the maximum number of themes you can select.",
                        variant: "destructive",
                      })
                    }
                  }}
                >
                  {theme.title}
                </Button>
              ))}
            </div>
            <div className="mt-4">
              <p>Remaining choices: {calculateThemeLimit(themesToValidate.length, 10) - teacherWishList.length}</p>
            </div>
          </div>
        )}
        {userRole === 'teacher' && (
          <Button className="mt-4" onClick={() => {
            // Submit teacher's wish list
            toast({
              title: "Wish List Submitted",
              description: "Your theme preferences have been submitted successfully.",
            })
          }}>
            Submit Wish List
          </Button>
        )}
        {userRole === 'admin' && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Adjust Teacher's Choices</h3>
            {/* Add a table or list of teachers and their choices with edit functionality */}
            {/* This is a placeholder and should be replaced with actual data and edit functionality */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Selected Themes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>Theme 1, Theme 2, Theme 3</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

