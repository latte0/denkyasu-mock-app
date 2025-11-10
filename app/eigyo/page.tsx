'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Header from '@/components/Header';
import { useData } from '@/context/DataContext';

export default function EigyoListPage() {
  const router = useRouter();
  const { eigyoList, masters } = useData();
  const [searchFilters, setSearchFilters] = useState({
    koukokushu: '',
    talent: '',
    status: '',
  });
  const [filteredResults, setFilteredResults] = useState(eigyoList);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    const filtered = eigyoList.filter((item) => {
      const matchKoukokushu = !searchFilters.koukokushu || 
        item.koukokushu.includes(searchFilters.koukokushu);
      const matchTalent = !searchFilters.talent || 
        item.talent.some(t => t.includes(searchFilters.talent));
      const matchStatus = !searchFilters.status || 
        item.status === searchFilters.status;
      
      return matchKoukokushu && matchTalent && matchStatus;
    });
    setFilteredResults(filtered);
    setShowResults(true);
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      '新規作業': '#2196f3',
      'プレゼン中': '#ff9800',
      'プレゼン結果': '#9c27b0',
      '決定': '#4caf50',
      '業務報告': '#009688',
      '保留': '#757575',
      '失注': '#f44336',
    };
    return statusMap[status] || '#757575';
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 10 }}>
      <Header title="営業情報" showBack={true} />
      
      <Container maxWidth="md" sx={{ py: 3 }}>
        {/* Search Form */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              検索条件
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="広告主"
                value={searchFilters.koukokushu}
                onChange={(e) => setSearchFilters({ ...searchFilters, koukokushu: e.target.value })}
              />
              <TextField
                fullWidth
                label="タレント名"
                value={searchFilters.talent}
                onChange={(e) => setSearchFilters({ ...searchFilters, talent: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>ステータス</InputLabel>
                <Select
                  value={searchFilters.status}
                  label="ステータス"
                  onChange={(e) => setSearchFilters({ ...searchFilters, status: e.target.value })}
                >
                  <MenuItem value="">すべて</MenuItem>
                  {masters.status.map((s) => (
                    <MenuItem key={s.code} value={s.name}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                size="large"
              >
                検索
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && (
          <Box>
            <Typography variant="h6" gutterBottom>
              検索結果 ({filteredResults.length}件)
            </Typography>
            <Stack spacing={2}>
              {filteredResults.map((item) => (
                <Card
                  key={item.id}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => router.push(`/eigyo/${item.id}`)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                      <Typography variant="h6" component="div">
                        {item.koukokushu}
                      </Typography>
                      <Chip
                        label={item.status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(item.status),
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.shohinService}
                    </Typography>
                    <Stack spacing={1} sx={{ mt: 1 }}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            タレント
                          </Typography>
                          <Typography variant="body2">
                            {item.talent.join(', ')}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            営業局
                          </Typography>
                          <Typography variant="body2">
                            {item.eigyokyoku}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            契約開始
                          </Typography>
                          <Typography variant="body2">
                            {item.keiyakuKaishiDate}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            確度
                          </Typography>
                          <Typography variant="body2">
                            {item.kakudo}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
              {filteredResults.length === 0 && (
                <Card>
                  <CardContent>
                    <Typography variant="body1" color="text.secondary" align="center">
                      該当する案件が見つかりませんでした
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Box>
        )}
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
        onClick={() => router.push('/eigyo/new')}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

