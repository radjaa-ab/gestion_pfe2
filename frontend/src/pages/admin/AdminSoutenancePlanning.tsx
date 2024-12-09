import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import api from '../../services/api';

interface Soutenance {
  id: number;
  theme: string;
  student: string;
  jury: string[];
  date: string;
  time: string;
  room: string;
}

const AdminSoutenancePlanning = () => {
  const [soutenances, setSoutenances] = useState<Soutenance[]>([]);
  const [editingSoutenance, setEditingSoutenance] = useState<Soutenance | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSoutenances();
  }, []);

  const fetchSoutenances = async () => {
    try {
      // For demonstration purposes, we'll use mock data
      // In a real application, you would fetch this data from your API
      const mockSoutenances: Soutenance[] = [
        { id: 1, theme: "AI in Healthcare", student: "John Doe", jury: ["Dr. Smith", "Prof. Johnson"], date: "2023-07-15", time: "10:00", room: "A101" },
        { id: 2, theme: "Blockchain for Supply Chain", student: "Jane Smith", jury: ["Dr. Brown", "Prof. Davis"], date: "2023-07-16", time: "14:00", room: "B205" },
      ];
      setSoutenances(mockSoutenances);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch soutenances",
        variant: "destructive",
      });
    }
  };

  const handleGenerateCalendar = async () => {
    // In a real application, this would generate the calendar
    toast({
      title: "Success",
      description: "Soutenance calendar generated successfully",
    });
  };

  const handleEditSoutenance = (soutenance: Soutenance) => {
    setEditingSoutenance(soutenance);
  };

  const handleUpdateSoutenance = async (updatedSoutenance: Soutenance) => {
    // In a real application, this would update the soutenance in the backend
    setSoutenances(prev => prev.map(s => s.id === updatedSoutenance.id ? updatedSoutenance : s));
    setEditingSoutenance(null);
    toast({
      title: "Success",
      description: "Soutenance updated successfully",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Soutenance Planning</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGenerateCalendar} className="mb-4">Generate Soutenance Calendar</Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Theme</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Jury</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {soutenances.map(soutenance => (
              <TableRow key={soutenance.id}>
                <TableCell>{soutenance.theme}</TableCell>
                <TableCell>{soutenance.student}</TableCell>
                <TableCell>{soutenance.jury.join(', ')}</TableCell>
                <TableCell>{soutenance.date}</TableCell>
                <TableCell>{soutenance.time}</TableCell>
                <TableCell>{soutenance.room}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => handleEditSoutenance(soutenance)}>Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Soutenance</DialogTitle>
                      </DialogHeader>
                      {editingSoutenance && (
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          handleUpdateSoutenance(editingSoutenance);
                        }}>
                          <Input
                            value={editingSoutenance.date}
                            onChange={(e) => setEditingSoutenance({...editingSoutenance, date: e.target.value})}
                            placeholder="Date"
                            className="mb-2"
                          />
                          <Input
                            value={editingSoutenance.time}
                            onChange={(e) => setEditingSoutenance({...editingSoutenance, time: e.target.value})}
                            placeholder="Time"
                            className="mb-2"
                          />
                          <Input
                            value={editingSoutenance.room}
                            onChange={(e) => setEditingSoutenance({...editingSoutenance, room: e.target.value})}
                            placeholder="Room"
                            className="mb-2"
                          />
                          <Button type="submit">Update</Button>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminSoutenancePlanning;

