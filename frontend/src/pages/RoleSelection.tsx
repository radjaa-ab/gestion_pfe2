import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/PageContainer'

const RoleSelection: React.FC = () => {
  return (
    <PageContainer title="Select Your Role">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Select Your Role</CardTitle>
          <CardDescription>Choose a role to access the PFE Management System</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button asChild>
            <Link to="/admin">Admin</Link>
          </Button>
          <Button asChild>
            <Link to="/teacher">Teacher</Link>
          </Button>
          <Button asChild>
            <Link to="/student">Student</Link>
          </Button>
          <Button asChild>
            <Link to="/company">Company</Link>
          </Button>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default RoleSelection;

