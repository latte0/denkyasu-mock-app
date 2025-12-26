'use client';

import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MicIcon from '@mui/icons-material/Mic';
import Header from '@/components/Header';

interface MenuItem {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  color: string;
}

const menuItems: MenuItem[] = [
  {
    title: '進捗管理',
    description: '案件の進捗状況を確認・管理します',
    path: '/shinchoku',
    icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
    color: '#1976d2',
  },
  {
    title: 'あたり情報',
    description: 'あたり情報の登録・確認を行います',
    path: '/atari',
    icon: <AssignmentIcon sx={{ fontSize: 48 }} />,
    color: '#2e7d32',
  },
  {
    title: '営業報告',
    description: '営業報告の登録・確認を行います',
    path: '/eigyo',
    icon: <BusinessCenterIcon sx={{ fontSize: 48 }} />,
    color: '#ed6c02',
  },
  {
    title: '音声アップロード',
    description: '音声ファイルをアップロードします',
    path: '/voice-upload',
    icon: <MicIcon sx={{ fontSize: 48 }} />,
    color: '#9c27b0',
  },
];

export default function TopPage() {
  const router = useRouter();

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header title="メインメニュー" showBack={false} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
            機能を選択してください
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {menuItems.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.path}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleMenuClick(item.path)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: `${item.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                      mb: 2,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <CardContent sx={{ textAlign: 'center', p: 0 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: 'bold', mb: 1 }}
                    >
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

