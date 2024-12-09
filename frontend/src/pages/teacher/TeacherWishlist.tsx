import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from '../../services/api';

interface Theme {
  id: number;
  title: string;
  description: string;
  supervisor: string;
  type: string;
}

const TeacherWishlist = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<number[]>([]);
  const [maxSelections, setMaxSelections] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchThemes();
    fetchMaxSelections();
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

  const fetchMaxSelections = async () => {
    try {
      const response = await api.get('/teacher/max-selections');
      setMaxSelections(response.data.maxSelections);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch max selections",
        variant: "destructive",
      });
    }
  };

  const handleThemeSelection = (themeId: number) => {
    setSelectedThemes(prev => {
      if (prev.includes(themeId)) {
        return prev.filter(id => id !== themeId);
      } else if (prev.length < maxSelections) {
        return [...prev, themeId];
      } else {
        toast({
          title: "Selection limit reached",
          description: `You can only select up to ${maxSelections} themes.`,
          variant: "default",
        });
        return prev;
      }
    });
  };

  const handleSubmit = async () => {
    try {
      await api.post('/teacher/wishlist', { selectedThemes });
      toast({
        title: "Success",
        description: "Wishlist submitted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit wishlist",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Wishlist</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">You can select up to {maxSelections} themes.</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Select</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Supervisor</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {themes.map(theme => (
              <TableRow key={theme.id}>
                <TableCell>
                  <Checkbox
                    id={`theme-${theme.id}`}
                    checked={selectedThemes.includes(theme.id)}
                    onCheckedChange={() => handleThemeSelection(theme.id)}
                  />
                </TableCell>
                <TableCell>{theme.title}</TableCell>
                <TableCell>{theme.description}</TableCell>
                <TableCell>{theme.supervisor}</TableCell>
                <TableCell>{theme.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={handleSubmit} className="mt-4">Submit Wishlist</Button>
      </CardContent>
    </Card>
  );
};

export default TeacherWishlist;

