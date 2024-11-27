import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function DefenseSchedule() {
  const [defenses, setDefenses] = useState<Defense[]>([]);
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
        description: "Failed to fetch defense schedule",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Defense Schedule</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Defenses</CardTitle>
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

