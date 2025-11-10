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

export default function AtariNewPage() {
  const router = useRouter();
  const { addAtari, masters, atariList } = useData();
  const [formData, setFormData] = useState<AtariInfo>({
    id: `A${String(atariList.length + 1).padStart(3, '0')}`,
    koukokushu: '',
    shohinService: '',
    talentMei: '',
    kyougohani: '',
    shiyoukikan: '',
    shiyoubaitai: '',
    teijigaku1: 0,
    teijigaku2: 0,
    shokaiShutsuenryo: '',
    shiyochiiki: '',
    teianKahi: '',
    kikakuNaiyo: '',
    memo: '',
    johoTeikyosha: '',
    johoNyuryokubiDate: new Date().toISOString().split('T')[0],
  });

  const handleSave = () => {
    if (!formData.koukokushu || !formData.talentMei) {
      alert('広告主とタレント名は必須です');
      return;
    }
    addAtari(formData);
    alert('登録しました');
    router.push('/atari');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 10 }}>
      <Header title="あたり情報新規作成" showBack={true} />
      
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="広告主"
                required
                value={formData.koukokushu}
                onChange={(e) => setFormData({ ...formData, koukokushu: e.target.value })}
              />
              
              <TextField
                fullWidth
                label="商品・サービス"
                value={formData.shohinService}
                onChange={(e) => setFormData({ ...formData, shohinService: e.target.value })}
              />
              
              <TextField
                fullWidth
                label="タレント名"
                required
                value={formData.talentMei}
                onChange={(e) => setFormData({ ...formData, talentMei: e.target.value })}
              />
              
              <FormControl fullWidth>
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
              
              <FormControl fullWidth>
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
              
              <FormControl fullWidth>
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
              
              <TextField
                fullWidth
                type="number"
                label="提示金額_1"
                value={formData.teijigaku1}
                onChange={(e) => setFormData({ ...formData, teijigaku1: Number(e.target.value) })}
              />
              
              <TextField
                fullWidth
                type="number"
                label="提示金額_2"
                value={formData.teijigaku2}
                onChange={(e) => setFormData({ ...formData, teijigaku2: Number(e.target.value) })}
              />
              
              <FormControl fullWidth>
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
              
              <FormControl fullWidth>
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
              
              <FormControl fullWidth>
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
                multiline
                rows={3}
                label="企画内容"
                value={formData.kikakuNaiyo}
                onChange={(e) => setFormData({ ...formData, kikakuNaiyo: e.target.value })}
              />
              
              <TextField
                fullWidth
                multiline
                rows={2}
                label="メモ"
                value={formData.memo}
                onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
              />
              
              <FormControl fullWidth>
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
                type="date"
                label="情報入力日"
                value={formData.johoNyuryokubiDate}
                onChange={(e) => setFormData({ ...formData, johoNyuryokubiDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
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
            登録
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

