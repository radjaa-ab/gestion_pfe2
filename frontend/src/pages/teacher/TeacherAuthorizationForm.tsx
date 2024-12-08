import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import api from '../../services/api';

interface Student {
  id: number;
  name: string;
  projectTitle: string;
}

const TeacherAuthorizationForm = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [authorizations, setAuthorizations] = useState<{[key: number]: string}>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/teacher/students');
      setStudents(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch students",
        variant: "destructive",
      });
    }
  };

  const handleAuthorization = (studentId: number, value: string) => {
    setAuthorizations(prev => ({ ...prev, [studentId]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.post('/teacher/authorizations', authorizations);
      toast({
        title: "Success",
        description: "Authorizations submitted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit authorizations",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Authorization Form</CardTitle>
      </CardHeader>
      <CardContent>
        {students.map(student => (
          <div key={student.id} className="mb-4">
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p className="text-sm text-gray-500 mb-2">Project: {student.projectTitle}</p>
            <Select onValueChange={(value) => handleAuthorization(student.id, value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select authorization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="authorized">Authorized for Session 1 (June)</SelectItem>
                <SelectItem value="not_authorized">Not Authorized (Session 2 - September)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
        <Button onClick={handleSubmit} className="mt-4">Submit Authorizations</Button>
      </CardContent>
    </Card>
  );
};

export default TeacherAuthorizationForm;

