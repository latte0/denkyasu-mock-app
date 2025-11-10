'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Header from '@/components/Header';
import { useData } from '@/context/DataContext';
import { AtariInfo } from '@/types';
import AtariFormSection from '@/components/atari/AtariFormSection';

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

  const handleFieldChange = (updates: Partial<AtariInfo>) => {
    setFormData({ ...formData, ...updates });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 10 }}>
      <Header title="あたり情報新規作成" showBack={true} />
      
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Card>
          <CardContent>
            <AtariFormSection
              data={formData}
              onChange={handleFieldChange}
              masters={masters}
            />
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

