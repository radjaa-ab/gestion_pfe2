import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import api from '../services/api';

interface Project {
  id: number;
  title: string;
  description?: string;
  supervisor: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  type?: string;
}

interface ProjectNotification {
  id: number;
  type: 'default' | 'destructive' | 'warning';
  message: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectNotifications, setProjectNotifications] = useState<ProjectNotification[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    supervisor: '',
    status: 'Pending',
    type: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
    setProjectNotifications([
      { id: 1, type: 'default', message: 'New project proposal submitted.' },
      { id: 2, type: 'warning', message: 'Project deadline approaching.' },
      { id: 3, type: 'destructive', message: 'Project resources depleted.' },
    ]);
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch projects.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: 'status' | 'type', value: string) => {
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = projects.length + 1;
    setProjects((prev) => [...prev, { id, ...newProject }]);
    toast({
      title: "Project created",
      description: `${newProject.title} has been successfully added.`,
    });
    setIsDialogOpen(false);
    setNewProject({ title: '', supervisor: '', status: 'Pending', type: '' });
  };

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    toast({
      title: "Project deleted",
      description: "The project has been successfully removed.",
      variant: "destructive",
    });
  };

  const handleDismissNotification = (id: number) => {
    setProjectNotifications((prev) => prev.filter((notif) => notif.id !== id));
    toast({
      title: "Notification dismissed",
      description: "The notification has been removed.",
    });
  };

  const filteredProjects = projects.filter((project) =>
    [project.title, project.supervisor, project.status, project.type]
      .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Projects</h2>

      {projectNotifications.map((notification) => (
      <Alert 
      key={notification.id} 
      variant={notification.type === 'warning' ? 'default' : notification.type}
    >
    
          <AlertTitle>
            {notification.type === 'warning' ? 'Warning' : notification.type === 'destructive' ? 'Error' : 'Info'}
          </AlertTitle>
          <AlertDescription>{notification.message}</AlertDescription>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDismissNotification(notification.id)}
          >
            Dismiss
          </Button>
        </Alert>
      ))}

      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="title"
                placeholder="Project Title"
                value={newProject.title}
                onChange={handleInputChange}
                required
              />
              <Input
                name="supervisor"
                placeholder="Supervisor"
                value={newProject.supervisor}
                onChange={handleInputChange}
                required
              />
              <Select
                onValueChange={(value) => handleSelectChange('status', value)}
                value={newProject.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => handleSelectChange('type', value)}
                value={newProject.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Research">Research</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="Analysis">Analysis</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Supervisor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.supervisor}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === 'Completed'
                          ? 'success'
                          : project.status === 'In Progress'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.type}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
