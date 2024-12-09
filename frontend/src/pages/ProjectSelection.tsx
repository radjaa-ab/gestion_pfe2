import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import api from './../services/api';
import { PageContainer } from '@/components/PageContainer'

interface Project {
  id: number;
  title: string;
  description: string;
}

interface ProjectSelectionForm {
  selections: { projectId: string; priority: string }[];
}

const ProjectSelection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { control, handleSubmit } = useForm<ProjectSelectionForm>({
    defaultValues: { selections: [{ projectId: '', priority: '' }] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'selections',
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        setProjects(response.data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch projects',
          variant: 'destructive',
        });
      }
    };
    fetchProjects();
  }, [toast]);

  const onSubmit = async (data: ProjectSelectionForm) => {
    setIsSubmitting(true);
    try {
      await api.post('/project-selections', data.selections);
      toast({
        title: 'Success',
        description: 'Project selections submitted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit project selections',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer title="Project Selection">
      <Card>
        <CardHeader>
          <CardTitle>Project Selection</CardTitle>
          <CardDescription>Select your preferred projects in order of priority</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id.toString()}>
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((priority) => (
                      <SelectItem key={priority} value={priority.toString()}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => append({ projectId: '', priority: '' })}>
              Add Selection
            </Button>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Selections'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </PageContainer>
  );
};

export default ProjectSelection;

