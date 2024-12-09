import React from 'react';
import { ImportUsers } from '@/components/ImportUsers';

export default function UserManagement() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <ImportUsers />
    </div>
  );
}

