'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Header from '@/components/Header';
import { useData } from '@/context/DataContext';
import { AtariInfo } from '@/types';
import AtariFormSection from '@/components/atari/AtariFormSection';

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

  const handleFieldChange = (updates: Partial<AtariInfo>) => {
    if (formData) {
      setFormData({ ...formData, ...updates });
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

