import React from 'react';
import { Box, Typography } from '@mui/material';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

export function PageContainer({ title, children }: PageContainerProps) {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
}

