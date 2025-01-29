"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function TextAreaSkeleton() {
  return (
    <Box sx={{ width: 150 }}>
     <Skeleton animation="wave" />
      <Skeleton animation="pulse" />
      <Skeleton animation="wave" />
    </Box>
  );
}