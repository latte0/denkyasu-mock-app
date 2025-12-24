'use client';

import { useRouter } from 'next/navigation';
import {
  Container,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import TimelineIcon from '@mui/icons-material/Timeline';
import Header from '@/components/Header';

const menuItems = [
  {
    title: '営業情報',
    description: '案件の営業情報を管理',
    icon: BusinessCenterIcon,
    path: '/eigyo',
    color: '#1976d2',
  },
  {
    title: 'あたり情報',
    description: 'タレントのあたり情報を管理',
    icon: PersonSearchIcon,
    path: '/atari',
    color: '#388e3c',
  },
  {
    title: '進捗管理',
    description: '案件の進捗状況を管理',
    icon: TimelineIcon,
    path: '/shinchoku',
    color: '#f57c00',
  },
];

export default function TopPage() {
  const router = useRouter();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header title="TOP" />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          メニュー
        </Typography>
        <Grid container spacing={3}>
          {menuItems.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.path}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => router.push(item.path)}
                  sx={{ height: '100%', p: 2 }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        backgroundColor: item.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <item.icon sx={{ fontSize: 32, color: 'white' }} />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

