'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Header from '@/components/Header';
import { useData } from '@/context/DataContext';
import { AtariInfo } from '@/types';

export default function AtariDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { getAtariById, updateAtari, masters } = useData();
  const [formData, setFormData] = useState<AtariInfo | null>(null);

  useEffect(() => {
    const data = getAtariById(id);
    if (data) {
      setFormData(data);
    }
  }, [id, getAtariById]);

  const handleSave = () => {
    if (formData) {
      updateAtari(id, formData);
      alert('保存しました');
      router.push('/atari');
    }
  };

  if (!formData) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Header title="あたり情報詳細" showBack={true} />
        <Container maxWidth="md" sx={{ py: 3 }}>
          読み込み中...
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 10 }}>
      <Header title="あたり情報編集" showBack={true} />
      
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Card>
          <CardContent>
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                  基本情報
                </Typography>
                <Stack spacing={1.5}>
                  <TextField
                    fullWidth
                    size="small"
                    label="広告主"
                    value={formData.koukokushu}
                    onChange={(e) => setFormData({ ...formData, koukokushu: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="商品・サービス"
                    value={formData.shohinService}
                    onChange={(e) => setFormData({ ...formData, shohinService: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="タレント名"
                    value={formData.talentMei}
                    onChange={(e) => setFormData({ ...formData, talentMei: e.target.value })}
                  />
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                  使用条件
                </Typography>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>競合範囲</InputLabel>
                      <Select
                        value={formData.kyougohani}
                        label="競合範囲"
                        onChange={(e) => setFormData({ ...formData, kyougohani: e.target.value })}
                      >
                        {masters.kyougohani.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                      <InputLabel>使用期間</InputLabel>
                      <Select
                        value={formData.shiyoukikan}
                        label="使用期間"
                        onChange={(e) => setFormData({ ...formData, shiyoukikan: e.target.value })}
                      >
                        {masters.shiyoukikan.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>使用媒体</InputLabel>
                      <Select
                        value={formData.shiyoubaitai}
                        label="使用媒体"
                        onChange={(e) => setFormData({ ...formData, shiyoubaitai: e.target.value })}
                      >
                        {masters.media.map((item) => (
                          <MenuItem key={item.code} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth size="small">
                      <InputLabel>使用地域</InputLabel>
                      <Select
                        value={formData.shiyochiiki}
                        label="使用地域"
                        onChange={(e) => setFormData({ ...formData, shiyochiiki: e.target.value })}
                      >
                        {masters.shiyochiiki.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                  金額・出演料
                </Typography>
                <Stack spacing={1.5}>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="提示金額_1"
                      value={formData.teijigaku1}
                      onChange={(e) => setFormData({ ...formData, teijigaku1: Number(e.target.value) })}
                      InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography> }}
                      helperText={`${(formData.teijigaku1 / 10000).toLocaleString()}万円`}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="提示金額_2"
                      value={formData.teijigaku2}
                      onChange={(e) => setFormData({ ...formData, teijigaku2: Number(e.target.value) })}
                      InputProps={{ startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography> }}
                      helperText={`${(formData.teijigaku2 / 10000).toLocaleString()}万円`}
                    />
                  </Box>
                  <FormControl fullWidth size="small">
                    <InputLabel>初回出演料</InputLabel>
                    <Select
                      value={formData.shokaiShutsuenryo}
                      label="初回出演料"
                      onChange={(e) => setFormData({ ...formData, shokaiShutsuenryo: e.target.value })}
                    >
                      {masters.shokaiShutsuryoKubun.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                  提案・企画
                </Typography>
                <Stack spacing={1.5}>
                  <FormControl fullWidth size="small">
                    <InputLabel>提案可否</InputLabel>
                    <Select
                      value={formData.teianKahi}
                      label="提案可否"
                      onChange={(e) => setFormData({ ...formData, teianKahi: e.target.value })}
                    >
                      {masters.teianKahi.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={3}
                    label="企画内容"
                    value={formData.kikakuNaiyo}
                    onChange={(e) => setFormData({ ...formData, kikakuNaiyo: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    label="メモ"
                    value={formData.memo}
                    onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                  />
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                  管理情報
                </Typography>
                <Stack spacing={1.5}>
                  <FormControl fullWidth size="small">
                    <InputLabel>情報提供者</InputLabel>
                    <Select
                      value={formData.johoTeikyosha}
                      label="情報提供者"
                      onChange={(e) => setFormData({ ...formData, johoTeikyosha: e.target.value })}
                    >
                      {masters.dceTantobu.map((item) => (
                        <MenuItem key={item.code} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="情報入力日"
                    value={formData.johoNyuryokubiDate}
                    onChange={(e) => setFormData({ ...formData, johoNyuryokubiDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            size="large"
          >
            保存
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => router.back()}
            size="large"
          >
            キャンセル
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

