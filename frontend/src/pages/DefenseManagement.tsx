import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import api from '../services/api';

interface Defense {
  id: number;
  projectTitle: string;
  student: string;
  supervisor: string;
  date: string;
  time: string;
  room: string;
}

export default function DefenseManagement() {
  const [defenses, setDefenses] = useState<Defense[]>([]);
  const [newDefense, setNewDefense] = useState<Omit<Defense, 'id'>>({
    projectTitle: '',
    student: '',
    supervisor: '',
    date: '',
    time: '',
    room: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchDefenses();
  }, []);

  const fetchDefenses = async () => {
    try {
      const response = await api.get('/defenses');
      setDefenses(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch defenses",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDefense(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/defenses', newDefense);
      toast({
        title: "Success",
        description: "Defense scheduled successfully",
      });
      fetchDefenses();
      setNewDefense({
        projectTitle: '',
        student: '',
        supervisor: '',
        date: '',
        time: '',
        room: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule defense",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Defense Management</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Schedule New Defense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="projectTitle"
              placeholder="Project Title"
              value={newDefense.projectTitle}
              onChange={handleInputChange}
              required
            />
            <Input
              name="student"
              placeholder="Student Name"
              value={newDefense.student}
              onChange={handleInputChange}
              required
            />
            <Input
              name="supervisor"
              placeholder="Supervisor Name"
              value={newDefense.supervisor}
              onChange={handleInputChange}
              required
            />
            <Input
              name="date"
              type="date"
              value={newDefense.date}
              onChange={handleInputChange}
              required
            />
            <Input
              name="time"
              type="time"
              value={newDefense.time}
              onChange={handleInputChange}
              required
            />
            <Input
              name="room"
              placeholder="Room"
              value={newDefense.room}
              onChange={handleInputChange}
              required
            />
            <Button type="submit">Schedule Defense</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Defenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Title</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Supervisor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Room</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {defenses.map((defense) => (
                <TableRow key={defense.id}>
                  <TableCell>{defense.projectTitle}</TableCell>
                  <TableCell>{defense.student}</TableCell>
                  <TableCell>{defense.supervisor}</TableCell>
                  <TableCell>{defense.date}</TableCell>
                  <TableCell>{defense.time}</TableCell>
                  <TableCell>{defense.room}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

