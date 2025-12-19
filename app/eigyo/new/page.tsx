'use client';

import { Suspense } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import Header from '@/components/Header';
import EigyoNewForm from './EigyoNewForm';

function LoadingFallback() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header title="営業情報新規作成" showBack={true} />
      <Container maxWidth="md" sx={{ py: 3, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    </Box>
  );
}

export default function EigyoNewPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <EigyoNewForm />
    </Suspense>
  );
}
