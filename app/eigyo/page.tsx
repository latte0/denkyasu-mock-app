'use client';

import { useState, useMemo } from 'react';
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
  Pagination,
  Collapse,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import Header from '@/components/Header';
import { useData } from '@/context/DataContext';

const ITEMS_PER_PAGE = 10;

export default function EigyoListPage() {
  const router = useRouter();
  const { eigyoList, masters } = useData();
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    koukokushu: '',
    talent: '',
    status: '',
  });

  const filteredResults = useMemo(() => {
    return eigyoList.filter((item) => {
      const matchKoukokushu = !searchFilters.koukokushu || 
        item.koukokushu.includes(searchFilters.koukokushu);
      const matchTalent = !searchFilters.talent || 
        item.talent.some(t => t.includes(searchFilters.talent));
      const matchStatus = !searchFilters.status || 
        item.status === searchFilters.status;
      
      return matchKoukokushu && matchTalent && matchStatus;
    });
  }, [eigyoList, searchFilters]);

  const paginatedResults = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredResults, page]);

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = () => {
    setPage(1); // Reset to first page when filters change
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
        {/* Filter Toggle */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            営業情報一覧 ({filteredResults.length}件)
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(!showFilters)}
          >
            絞り込み
          </Button>
        </Box>

        {/* Search Form */}
        <Collapse in={showFilters}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Stack spacing={1.5}>
                <TextField
                  fullWidth
                  size="small"
                  label="広告主"
                  value={searchFilters.koukokushu}
                  onChange={(e) => {
                    setSearchFilters({ ...searchFilters, koukokushu: e.target.value });
                    handleFilterChange();
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="タレント名"
                  value={searchFilters.talent}
                  onChange={(e) => {
                    setSearchFilters({ ...searchFilters, talent: e.target.value });
                    handleFilterChange();
                  }}
                />
                <FormControl fullWidth size="small">
                  <InputLabel>ステータス</InputLabel>
                  <Select
                    value={searchFilters.status}
                    label="ステータス"
                    onChange={(e) => {
                      setSearchFilters({ ...searchFilters, status: e.target.value });
                      handleFilterChange();
                    }}
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
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setSearchFilters({ koukokushu: '', talent: '', status: '' });
                    setPage(1);
                  }}
                >
                  クリア
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Collapse>

        {/* Results */}
        <Stack spacing={2}>
          {paginatedResults.map((item) => (
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
            </Stack>

            {/* Pagination */}
            {filteredResults.length > 0 && totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}

            {filteredResults.length === 0 && (
              <Card>
                <CardContent>
                  <Typography variant="body1" color="text.secondary" align="center">
                    該当する案件が見つかりませんでした
                  </Typography>
                </CardContent>
              </Card>
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

