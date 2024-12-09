import React, { useState } from 'react';
import { importUsers } from '../services/api';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function ImportUsers() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to import.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await importUsers(file);
      toast({
        title: "Users imported successfully",
        description: "The CSV file has been processed and users have been imported.",
      });
    } catch (error) {
      toast({
        title: "Import failed",
        description: "There was an error importing users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Import Users</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="file" accept=".csv" onChange={handleFileChange} />
          <Button type="submit" disabled={isLoading || !file}>
            {isLoading ? 'Importing...' : 'Import Users'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

