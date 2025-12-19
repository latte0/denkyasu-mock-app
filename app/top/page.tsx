'use client';

import { useRouter } from 'next/navigation';
import {
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import InfoIcon from '@mui/icons-material/Info';
import TimelineIcon from '@mui/icons-material/Timeline';
import MicIcon from '@mui/icons-material/Mic';
import Header from '@/components/Header';

export default function TopPage() {
  const router = useRouter();

  const menuItems = [
    {
      title: '案件情報（営業情報）',
      icon: <BusinessIcon sx={{ fontSize: 48 }} />,
      path: '/eigyo',
      color: '#1976d2',
    },
    {
      title: 'あたり情報',
      icon: <InfoIcon sx={{ fontSize: 48 }} />,
      path: '/atari',
      color: '#2e7d32',
    },
    {
      title: '進捗管理',
      icon: <TimelineIcon sx={{ fontSize: 48 }} />,
      path: '/shinchoku',
      color: '#ed6c02',
    },
    {
      title: '音声アップロード',
      icon: <MicIcon sx={{ fontSize: 48 }} />,
      path: '/voice-upload',
      color: '#9c27b0',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header title="TOP画面" showBack={false} />
      
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            メニュー
          </Typography>
          <Typography variant="body2" color="text.secondary">
            操作したい項目を選択してください
          </Typography>
        </Box>

        <Stack spacing={3}>
          {menuItems.map((item) => (
            <Card
              key={item.path}
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
              onClick={() => router.push(item.path)}
            >
              <CardContent>
                <Button
                  fullWidth
                  sx={{
                    py: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    color: item.color,
                    textTransform: 'none',
                  }}
                >
                  {item.icon}
                  <Typography variant="h6" component="div">
                    {item.title}
                  </Typography>
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}


