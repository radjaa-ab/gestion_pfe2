import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Users, FileText, Bell, Upload, Mail } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserDistributionChart } from '@/components/charts/UserDistributionChart'
import { PfeDistributionChart } from '@/components/charts/PfeDistributionChart'
import { ProposalStatusChart } from '@/components/charts/ProposalStatusChart'
import { StudentsPfeByOptionChart } from '@/components/charts/StudentsPfeByOptionChart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DateRangePicker } from "@/components/DateRangePicker"
import { DateRange } from "react-day-picker"

type UserBase = {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  email: string;
  motDePasse: string;
}

type Student = UserBase & {
  role: 'student';
  specialite: string;
  moyenne: number;
}

type Teacher = UserBase & {
  role: 'teacher';
  specialite: string;
  grade: string;
  anciennete: number;
  promo: string;
  isResponsableSpecialite: boolean;
}

type Admin = UserBase & {
  role: 'admin';
  domaine: string;
}

type Company = UserBase & {
  role: 'company';
  nomEntreprise: string;
  secteur: string;
}

type User = Student | Teacher | Admin | Company;

type EmailTemplate = {
  id: number;
  name: string;
  subject: string;
  body: string;
  urgencyLevel: 'low' | 'medium' | 'high';
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState<Partial<User>>({ role: 'student' })
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([])
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([])
  const [newEmailTemplate, setNewEmailTemplate] = useState<Omit<EmailTemplate, 'id'>>({
    name: '',
    subject: '',
    body: '',
    urgencyLevel: 'low'
  })
  const [isEmailTemplateDialogOpen, setIsEmailTemplateDialogOpen] = useState(false)
  const [projectProposalDeadline, setProjectProposalDeadline] = useState<DateRange | undefined>(undefined)
  const { toast } = useToast()

  useEffect(() => {
    // Simulating fetching users and email templates
    setUsers([
      { id: 1, nom: 'Doe', prenom: 'John', dateNaissance: '1995-05-15', email: 'john@example.com', role: 'student', specialite: 'Informatique', moyenne: 14.5, motDePasse: 'password123' },
      { id: 2, nom: 'Smith', prenom: 'Jane', dateNaissance: '1980-10-20', email: 'jane@example.com', role: 'teacher', specialite: 'Mathématiques', grade: 'Professeur', anciennete: 10, promo: 'Math2023', isResponsableSpecialite: true, motDePasse: 'password456' },
      { id: 3, nom: 'Admin', prenom: 'User', dateNaissance: '1985-03-25', email: 'admin@example.com', role: 'admin', domaine: 'Gestion académique', motDePasse: 'adminpass' },
    ] as User[])

    setEmailTemplates([
      { id: 1, name: 'Welcome Email', subject: 'Welcome to PFE Management System', body: 'Dear {name},\n\nWelcome to our PFE Management System...', urgencyLevel: 'low' },
      { id: 2, name: 'Project Proposal Reminder', subject: 'Reminder: Submit Your Project Proposal', body: 'Dear {name},\n\nThis is a reminder to submit your project proposal...', urgencyLevel: 'medium' },
    ])

    setNotifications([
      { id: 1, message: 'New user registration pending approval' },
      { id: 2, message: 'Project proposal deadline approaching' },
    ])
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser(prev => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: 'student' | 'teacher' | 'admin' | 'company') => {
    setNewUser({ role: value })
  }

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = users.length + 1
    const userWithId = { ...newUser, id } as User
    setUsers(prev => [...prev, userWithId])
    toast({
      title: "User added",
      description: `${userWithId.prenom} ${userWithId.nom} has been successfully added as a ${userWithId.role}.`,
    })
    setIsUserDialogOpen(false)
    setNewUser({ role: 'student' })
  }

  const handleEmailTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = emailTemplates.length + 1
    const newTemplate = { ...newEmailTemplate, id }
    setEmailTemplates(prev => [...prev, newTemplate])
    toast({
      title: "Email template added",
      description: `${newTemplate.name} has been successfully added.`,
    })
    setIsEmailTemplateDialogOpen(false)
    setNewEmailTemplate({ name: '', subject: '', body: '', urgencyLevel: 'low' })
  }

  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      toast({
        title: "CSV Imported",
        description: "The CSV file has been successfully imported.",
      })
    }
  }

  const handleNotificationDismiss = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const handleProjectProposalDeadlineChange = (range: DateRange | undefined) => {
    setProjectProposalDeadline(range)
    if (range?.from && range?.to) {
      toast({
        title: "Project Proposal Deadline Updated",
        description: `New deadline set from ${range.from.toDateString()} to ${range.to.toDateString()}.`,
      })
    }
  }

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    setNewUser(prev => ({
      ...prev,
      isResponsableSpecialite: checked === true
    }))
  }

  const handleSpecialiteChange = (value: string) => {
    setNewUser((prev) => ({
      ...prev,
      specialite: value,
    }));
  };

  // Sample data for the charts
  const userDistributionData = [
    { name: 'Students', value: 300 },
    { name: 'Teachers', value: 50 },
    { name: 'Companies', value: 30 },
  ];

  const pfeDistributionData = [
    { name: 'Classic', value: 100 },
    { name: 'Innovative', value: 50 },
    { name: 'Company Internship', value: 80 },
  ];

  const proposalStatusData = [
    { name: 'Validated', value: 150 },
    { name: 'Rejected', value: 30 },
    { name: 'Pending Modification', value: 50 },
  ];

  const studentsPfeByOptionData = [
    { option: 'GL', students: 100, proposals: 120 },
    { option: 'IA', students: 80, proposals: 90 },
    { option: 'RSD', students: 70, proposals: 85 },
    { option: 'SIC', students: 60, proposals: 70 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h2>

      {notifications.map((notification) => (
        <Alert key={notification.id}>
          <Bell className="h-4 w-4" />
          <AlertTitle>Notification</AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
          <Button variant="outline" size="sm" onClick={() => handleNotificationDismiss(notification.id)}>
            Dismiss
          </Button>
        </Alert>
      ))}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Templates</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emailTemplates.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Proposal Deadline</CardTitle>
        </CardHeader>
        <CardContent>
          <DateRangePicker date={projectProposalDeadline} setDate={handleProjectProposalDeadlineChange} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <UserDistributionChart data={userDistributionData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>PFE Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PfeDistributionChart data={pfeDistributionData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Proposal Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ProposalStatusChart data={proposalStatusData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Students and PFE Proposals by Option</CardTitle>
          </CardHeader>
          <CardContent>
            <StudentsPfeByOptionChart data={studentsPfeByOptionData} />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="email-templates">Email Templates</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Add New User</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] pr-4">
                      <form onSubmit={handleUserSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select onValueChange={handleRoleChange} value={newUser.role}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="company">Company</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nom">Nom</Label>
                          <Input id="nom" name="nom" value={newUser.nom || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="prenom">Prénom</Label>
                          <Input id="prenom" name="prenom" value={newUser.prenom || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateNaissance">Date de Naissance</Label>
                          <Input id="dateNaissance" name="dateNaissance" type="date" value={newUser.dateNaissance || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" value={newUser.email || ''} onChange={handleInputChange} required />
                        </div>
                        {newUser.role === 'student' && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="specialite">Spécialité</Label>
                              <Select 
                                onValueChange={(value) => handleSpecialiteChange(value)} 
                                value={(newUser as Student).specialite || ''}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select spécialité" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="GL">GL</SelectItem>
                                  <SelectItem value="AI">AI</SelectItem>
                                  <SelectItem value="SIC">SIC</SelectItem>
                                  <SelectItem value="RSD">RSD</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="moyenne">Moyenne</Label>
                              <Input id="moyenne" name="moyenne" type="number" step="0.01" value={(newUser as Student).moyenne || ''} onChange={handleInputChange} required />
                            </div>
                          </>
                        )}
                        {newUser.role === 'teacher' && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="specialite">Spécialité</Label>
                              <Input id="specialite" name="specialite" value={(newUser as Teacher).specialite || ''} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="grade">Grade</Label>
                              <Input id="grade" name="grade" value={(newUser as Teacher).grade || ''} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="anciennete">Ancienneté</Label>
                              <Input id="anciennete" name="anciennete" type="number" value={(newUser as Teacher).anciennete || ''} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="promo">Promo</Label>
                              <Input id="promo" name="promo" value={(newUser as Teacher).promo || ''} onChange={handleInputChange} required />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="isResponsableSpecialite" 
                                checked={(newUser as Teacher).isResponsableSpecialite || false}
                                onCheckedChange={handleCheckboxChange}
                              />
                              <Label htmlFor="isResponsableSpecialite">Responsable de Spécialité</Label>
                            </div>
                          </>
                        )}
                        {newUser.role === 'admin' && (
                          <div className="space-y-2">
                            <Label htmlFor="domaine">Domaine</Label>
                            <Input id="domaine" name="domaine" value={(newUser as Admin).domaine || ''} onChange={handleInputChange} required />
                          </div>
                        )}
                        {newUser.role === 'company' && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="nomEntreprise">Nom de l'Entreprise</Label>
                              <Input id="nomEntreprise" name="nomEntreprise" value={(newUser as Company).nomEntreprise || ''} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="secteur">Secteur</Label>
                              <Input id="secteur" name="secteur" value={(newUser as Company).secteur || ''} onChange={handleInputChange} required />
                            </div>
                          </>
                        )}
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsUserDialogOpen(false)}>Cancel</Button>
                          <Button type="submit">Add User</Button>
                        </div>
                      </form>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVImport}
                    style={{ display: 'none' }}
                    id="csv-upload"
                  />
                  <Label htmlFor="csv-upload" className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        Import CSV
                      </span>
                    </Button>
                  </Label>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Prénom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.nom}</TableCell>
                      <TableCell>{user.prenom}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({
                            title: "Edit user",
                            description: `Editing ${user.prenom} ${user.nom}'s information.`,
                          })
                        }}>Edit</Button>
                        <Button variant="outline" size="sm" className="ml-2" onClick={() => {
                          setUsers(prev => prev.filter(u => u.id !== user.id))
                          toast({
                            title: "User deleted",
                            description: `${user.prenom} ${user.nom} has been removed from the system.`,
                            variant: "destructive",
                          })
                        }}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="email-templates">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Dialog open={isEmailTemplateDialogOpen} onOpenChange={setIsEmailTemplateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Add New Email Template</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle>Add New Email Template</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] pr-4">
                      <form onSubmit={handleEmailTemplateSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Template Name</Label>
                          <Input
                            id="name"
                            value={newEmailTemplate.name}
                            onChange={(e) => setNewEmailTemplate(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            value={newEmailTemplate.subject}
                            onChange={(e) => setNewEmailTemplate(prev => ({ ...prev, subject: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="body">Body</Label>
                          <Textarea
                            id="body"
                            value={newEmailTemplate.body}
                            onChange={(e) => setNewEmailTemplate(prev => ({ ...prev, body: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="urgencyLevel">Urgency Level</Label>
                          <Select
                            value={newEmailTemplate.urgencyLevel}
                            onValueChange={(value: 'low' | 'medium' | 'high') => setNewEmailTemplate(prev => ({ ...prev, urgencyLevel: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select urgency level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsEmailTemplateDialogOpen(false)}>Cancel</Button>
                          <Button type="submit">Add Template</Button>
                        </div>
                      </form>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Urgency Level</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>{template.name}</TableCell>
                      <TableCell>{template.subject}</TableCell>
                      <TableCell>{template.urgencyLevel}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({
                            title: "Edit template",
                            description: `Editing ${template.name} template.`,
                          })
                        }}>Edit</Button>
                        <Button variant="outline" size="sm" className="ml-2" onClick={() => {
                          setEmailTemplates(prev => prev.filter(t => t.id !== template.id))
                          toast({
                            title: "Template deleted",
                            description: `${template.name} has been removed from the system.`,
                            variant: "destructive",
                          })
                        }}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
