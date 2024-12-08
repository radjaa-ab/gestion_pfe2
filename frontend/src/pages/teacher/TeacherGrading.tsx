import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import api from '../../services/api';

interface Soutenance {
  id: number;
  theme: string;
  student: string;
  date: string;
}

interface Grade {
  soutenanceId: number;
  grade: number;
  comments: string;
}

const TeacherGrading = () => {
  const [soutenances, setSoutenances] = useState<Soutenance[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchSoutenances();
  }, []);

  const fetchSoutenances = async () => {
    try {
      const response = await api.get('/teacher/soutenances');
      setSoutenances(response.data);
      setGrades(response.data.map((s: Soutenance) => ({ soutenanceId: s.id, grade: 0, comments: '' })));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch soutenances",
        variant: "destructive",
      });
    }
  };

  const handleGradeChange = (soutenanceId: number, value: string) => {
    setGrades(prev => prev.map(g => 
      g.soutenanceId === soutenanceId ? { ...g, grade: Number(value) } : g
    ));
  };

  const handleCommentsChange = (soutenanceId: number, value: string) => {
    setGrades(prev => prev.map(g => 
      g.soutenanceId === soutenanceId ? { ...g, comments: value } : g
    ));
  };

  const handleSubmit = async () => {
    try {
      await api.post('/teacher/grades', grades);
      toast({
        title: "Success",
        description: "Grades submitted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit grades",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Soutenances</CardTitle>
      </CardHeader>
      <CardContent>
        {soutenances.map(soutenance => (
          <div key={soutenance.id} className="mb-4">
            <h3 className="text-lg font-semibold">{soutenance.theme}</h3>
            <p className="text-sm text-gray-500 mb-2">Student: {soutenance.student} | Date: {soutenance.date}</p>
            <Input
              type="number"
              placeholder="Grade"
              value={grades.find(g => g.soutenanceId === soutenance.id)?.grade || ''}
              onChange={(e) => handleGradeChange(soutenance.id, e.target.value)}
              className="mb-2"
            />
            <Textarea
              placeholder="Comments"
              value={grades.find(g => g.soutenanceId === soutenance.id)?.comments || ''}
              onChange={(e) => handleCommentsChange(soutenance.id, e.target.value)}
              className="mb-2"
            />
          </div>
        ))}
        <Button onClick={handleSubmit} className="mt-4">Submit Grades</Button>
      </CardContent>
    </Card>
  );
};

export default TeacherGrading;

