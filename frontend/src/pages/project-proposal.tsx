import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import api from './../lib/api';

interface ProjectProposalForm {
  title: string;
  description: string;
}

const ProjectProposal: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<ProjectProposalForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: ProjectProposalForm) => {
    setIsSubmitting(true);
    try {
      await api.post('/projects', data);
      toast({
        title: 'Success',
        description: 'Project proposal submitted successfully',
      });
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit project proposal',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Proposal</CardTitle>
        <CardDescription>Submit a new project proposal</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title">Project Title</label>
            <Input id="title" {...register('title', { required: true })} />
          </div>
          <div className="space-y-2">
            <label htmlFor="description">Project Description</label>
            <Textarea id="description" {...register('description', { required: true })} />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProjectProposal;

