import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import api from '../../services/api';

interface Teacher {
  id: number;
  name: string;
  grade: string;
  recruitmentDate: string;
}

interface Theme {
  id: number;
  title: string;
  jury: Teacher[];
}

const AdminJuryManagement = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [maxSelections, setMaxSelections] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchThemes();
    fetchTeachers();
  }, []);

  const fetchThemes = async () => {
    try {
      const response = await api.get('/themes');
      setThemes(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch themes",
        variant: "destructive",
      });
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/teachers');
      setTeachers(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch teachers",
        variant: "destructive",
      });
    }
  };

  const handleMaxSelectionsChange = (value: string) => {
    setMaxSelections(Number(value));
  };

  const handleAutomaticAssignment = async () => {
    try {
      await api.post('/admin/automatic-jury-assignment', { maxSelections });
      fetchThemes(); // Refresh themes after assignment
      toast({
        title: "Success",
        description: "Jury assigned automatically",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign jury automatically",
        variant: "destructive",
      });
    }
  };

  const handleDownloadRecap = async () => {
    try {
      const response = await api.get('/admin/jury-recap', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'jury-recap.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download recap",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jury Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label htmlFor="maxSelections" className="block text-sm font-medium text-gray-700">
            Max Selections per Teacher
          </label>
          <Input
            type="number"
            id="maxSelections"
            value={maxSelections}
            onChange={(e) => handleMaxSelectionsChange(e.target.value)}
            className="mt-1"
          />
        </div>
        <Button onClick={handleAutomaticAssignment} className="mb-4">Automatic Jury Assignment</Button>
        <Button onClick={handleDownloadRecap} className="mb-4 ml-2">Download Recap</Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Theme</TableHead>
              <TableHead>Supervisor</TableHead>
              <TableHead>Examiner</TableHead>
              <TableHead>President</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {themes.map(theme => (
              <TableRow key={theme.id}>
                <TableCell>{theme.title}</TableCell>
                {theme.jury.map((member, index) => (
                  <TableCell key={index}>{member.name}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminJuryManagement;

