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
import { Users, FileText, Bell, Upload } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserDistributionChart } from '@/components/charts/UserDistributionChart'
import { PfeDistributionChart } from '@/components/charts/PfeDistributionChart'
import { ProposalStatusChart } from '@/components/charts/ProposalStatusChart'
import { StudentsPfeByOptionChart } from '@/components/charts/StudentsPfeByOptionChart'

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

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState<Partial<User>>({ role: 'student' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [notifications, setNotifications] = useState<{ id: number; message: string }[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Simulating fetching users
    setUsers([
      { id: 1, nom: 'Doe', prenom: 'John', dateNaissance: '1995-05-15', email: 'john@example.com', role: 'student', specialite: 'Informatique', moyenne: 14.5, motDePasse: 'password123' },
      { id: 2, nom: 'Smith', prenom: 'Jane', dateNaissance: '1980-10-20', email: 'jane@example.com', role: 'teacher', specialite: 'Mathématiques', grade: 'Professeur', anciennete: 10, promo: 'Math2023', isResponsableSpecialite: true, motDePasse: 'password456' },
      { id: 3, nom: 'Admin', prenom: 'User', dateNaissance: '1985-03-25', email: 'admin@example.com', role: 'admin', domaine: 'Gestion académique', motDePasse: 'adminpass' },
    ])

    // Simulating notifications
    setNotifications([
      { id: 1, message: 'New user registration pending approval' },
      { id: 2, message: 'System update scheduled for next week' },
    ])
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUser(prev => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: 'student' | 'teacher' | 'admin' | 'company') => {
    setNewUser({ role: value })
  }

  const generatePassword = () => {
    return Math.random().toString(36).slice(-8)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = users.length + 1
    const motDePasse = generatePassword()
    const userWithId = { ...newUser, id, motDePasse } as User
    setUsers(prev => [...prev, userWithId])
    toast({
      title: "User added",
      description: `${userWithId.prenom} ${userWithId.nom} has been successfully added as a ${userWithId.role}.`,
    })
    setIsDialogOpen(false)
    setNewUser({ role: 'student' })
  }

  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Here you would typically send this file to your backend for processing
      // For this example, we'll just show a success message
      toast({
        title: "CSV Imported",
        description: "The CSV file has been successfully imported.",
      })
    }
  }

  const handleNotificationDismiss = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
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
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

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

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add New User</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
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
    </div>
  )
}

