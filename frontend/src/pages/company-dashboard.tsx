import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { FileText, Users, ListTodo, Edit, Trash } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'validated' | 'rejected' | 'pending';
  assignedStudent?: string;
  currentStage: string;
}

interface Stage {
  id: number;
  title: string;
}

interface Student {
  id: number;
  name: string;
  projectId?: number;
  progress: number;
}

const CompanyDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: 'AI Chatbot', description: 'Develop an AI-powered chatbot', status: 'validated', assignedStudent: 'John Doe', currentStage: 'Development' },
    { id: 2, title: 'IoT Smart Home', description: 'Create a smart home system using IoT devices', status: 'pending', currentStage: 'Planning' },
  ]);
  const [newProject, setNewProject] = useState<Omit<Project, 'id' | 'status' | 'currentStage'>>({ title: '', description: '' });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isStageDialogOpen, setIsStageDialogOpen] = useState(false);
  const [newStage, setNewStage] = useState<Omit<Stage, 'id'>>({ title: '' });
  const [stages, setStages] = useState<Stage[]>([
    { id: 1, title: 'Planning' },
    { id: 2, title: 'Development' },
    { id: 3, title: 'Testing' },
    { id: 4, title: 'Deployment' },
  ]);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'John Doe', projectId: 1, progress: 60 },
    { id: 2, name: 'Jane Smith', projectId: undefined, progress: 0 },
  ]);
  const { toast } = useToast();

  const handleAddOrUpdateProject = () => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
      toast({
        title: "Project updated",
        description: `${editingProject.title} has been successfully updated.`,
      });
    } else {
      const newProjectWithId = { ...newProject, id: projects.length + 1, status: 'pending', currentStage: stages[0].title };
      setProjects([...projects, newProjectWithId]);
      toast({
        title: "Project added",
        description: `${newProject.title} has been successfully added.`,
      });
    }
    setNewProject({ title: '', description: '' });
    setEditingProject(null);
    setIsProjectDialogOpen(false);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsProjectDialogOpen(true);
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    setStudents(students.map(student => student.projectId === id ? { ...student, projectId: undefined, progress: 0 } : student));
    toast({
      title: "Project deleted",
      description: "Project has been removed successfully.",
      variant: "destructive",
    });
  };

  const handleAddStage = () => {
    setStages([...stages, { id: stages.length + 1, title: newStage.title }]);
    setNewStage({ title: '' });
    setIsStageDialogOpen(false);
    toast({
      title: "Stage added",
      description: `${newStage.title} has been successfully added as a new stage.`,
    });
  };

  const handleUpdateProjectStage = (projectId: number, newStage: string) => {
    setProjects(projects.map(project => 
      project.id === projectId ? { ...project, currentStage: newStage } : project
    ));
    toast({
      title: "Project stage updated",
      description: `Project stage has been updated to ${newStage}.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Company Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter(s => s.projectId !== undefined).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Stages</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stages.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="space-x-2">
              <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add New Project</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => { e.preventDefault(); handleAddOrUpdateProject(); }} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                        id="title"
                        value={editingProject ? editingProject.title : newProject.title}
                        onChange={(e) => editingProject 
                          ? setEditingProject({ ...editingProject, title: e.target.value })
                          : setNewProject({ ...newProject, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={editingProject ? editingProject.description : newProject.description}
                        onChange={(e) => editingProject
                          ? setEditingProject({ ...editingProject, description: e.target.value })
                          : setNewProject({ ...newProject, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => {
                        setIsProjectDialogOpen(false);
                        setEditingProject(null);
                      }}>Cancel</Button>
                      <Button type="submit">{editingProject ? 'Update' : 'Add'} Project</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog open={isStageDialogOpen} onOpenChange={setIsStageDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add New Stage</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Stage</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => { e.preventDefault(); handleAddStage(); }} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="stageTitle">Stage Title</Label>
                      <Input
                        id="stageTitle"
                        value={newStage.title}
                        onChange={(e) => setNewStage({ title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsStageDialogOpen(false)}>Cancel</Button>
                      <Button type="submit">Add Stage</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Student</TableHead>
                <TableHead>Current Stage</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map(project => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>{project.assignedStudent || 'Not assigned'}</TableCell>
                  <TableCell>
                    <Select
                      value={project.currentStage}
                      onValueChange={(value) => handleUpdateProjectStage(project.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {stages.map((stage) => (
                          <SelectItem key={stage.id} value={stage.title}>
                            {stage.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditProject(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Student Progress Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Assigned Project</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{projects.find(p => p.id === student.projectId)?.title || 'Not assigned'}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                      </div>
                      <span>{student.progress}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDashboard;

