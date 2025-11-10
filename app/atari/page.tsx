'use client';

import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Fab,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Header from '@/components/Header';
import { useData } from '@/context/DataContext';

export default function AtariListPage() {
  const router = useRouter();
  const { atariList } = useData();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 10 }}>
      <Header title="あたり情報" showBack={true} />
      
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h6" gutterBottom>
          あたり情報一覧 ({atariList.length}件)
        </Typography>
        
        <Stack spacing={2}>
          {atariList.map((item) => (
            <Card
              key={item.id}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 4,
                },
              }}
              onClick={() => router.push(`/atari/${item.id}`)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                  <Typography variant="h6" component="div">
                    {item.koukokushu}
                  </Typography>
                  <Chip
                    label={item.teianKahi}
                    size="small"
                    color={item.teianKahi === '可' ? 'success' : item.teianKahi === '不可' ? 'error' : 'warning'}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.shohinService}
                </Typography>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        タレント名
                      </Typography>
                      <Typography variant="body2">
                        {item.talentMei}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        使用媒体
                      </Typography>
                      <Typography variant="body2">
                        {item.shiyoubaitai}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        使用期間
                      </Typography>
                      <Typography variant="body2">
                        {item.shiyoukikan}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        提示金額
                      </Typography>
                      <Typography variant="body2">
                        ¥{item.teijigaku1.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      企画内容
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {item.kikakuNaiyo}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
        onClick={() => router.push('/atari/new')}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

