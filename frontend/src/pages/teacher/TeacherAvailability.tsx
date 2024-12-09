import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import api from '../../services/api';

interface Availability {
  date: string;
  available: boolean;
}

const TeacherAvailability = () => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    try {
      const response = await api.get('/teacher/availabilities');
      setAvailabilities(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch availabilities",
        variant: "destructive",
      });
    }
  };

  const handleAvailabilityChange = (date: string) => {
    setAvailabilities(prev => prev.map(a => 
      a.date === date ? { ...a, available: !a.available } : a
    ));
  };

  const handleSubmit = async () => {
    try {
      await api.post('/teacher/availabilities', availabilities);
      toast({
        title: "Success",
        description: "Availabilities submitted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit availabilities",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Your Availability</CardTitle>
      </CardHeader>
      <CardContent>
        {availabilities.map(availability => (
          <div key={availability.date} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={`availability-${availability.date}`}
              checked={availability.available}
              onCheckedChange={() => handleAvailabilityChange(availability.date)}
            />
            <label
              htmlFor={`availability-${availability.date}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {availability.date}
            </label>
          </div>
        ))}
        <Button onClick={handleSubmit} className="mt-4">Submit Availabilities</Button>
      </CardContent>
    </Card>
  );
};

export default TeacherAvailability;

