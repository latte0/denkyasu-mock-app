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
  Stack,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Header from '@/components/Header';
import { useData } from '@/context/DataContext';
import { EigyoInfo } from '@/types';
import EigyoBasicInfoSection from '@/components/eigyo/EigyoBasicInfoSection';
import EigyoKingakuSection from '@/components/eigyo/EigyoKingakuSection';
import EigyoShutsuenSection from '@/components/eigyo/EigyoShutsuenSection';
import EigyoEigyoSection from '@/components/eigyo/EigyoEigyoSection';
import EigyoJimushoSection from '@/components/eigyo/EigyoJimushoSection';
import EigyoKanriSection from '@/components/eigyo/EigyoKanriSection';

export default function EigyoDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { getEigyoById, updateEigyo, masters } = useData();
  const [formData, setFormData] = useState<EigyoInfo | null>(null);

  useEffect(() => {
    const data = getEigyoById(id);
    if (data) {
      setFormData(data);
    }
  }, [id, getEigyoById]);

  const handleSave = () => {
    if (formData) {
      updateEigyo(id, formData);
      alert('保存しました');
      router.push('/eigyo');
    }
  };

  const handleFieldChange = (updates: Partial<EigyoInfo>) => {
    if (formData) {
      setFormData({ ...formData, ...updates });
    }
  };

  if (!formData) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Header title="営業情報詳細" showBack={true} />
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Typography>読み込み中...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 10 }}>
      <Header title="営業情報詳細" showBack={true} />
      
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Stack spacing={3}>
          {/* 基本情報 */}
          <Card>
            <CardContent>
              <EigyoBasicInfoSection
                data={formData}
                onChange={handleFieldChange}
                masters={masters}
              />
            </CardContent>
          </Card>

          {/* 金額 */}
          <Card>
            <CardContent>
              <EigyoKingakuSection
                data={formData}
                onChange={handleFieldChange}
              />
            </CardContent>
          </Card>

          {/* 出演情報 */}
          <Card>
            <CardContent>
              <EigyoShutsuenSection
                data={formData}
                onChange={handleFieldChange}
              />
            </CardContent>
          </Card>

          {/* 営業情報 */}
          <Card>
            <CardContent>
              <EigyoEigyoSection
                data={formData}
                onChange={handleFieldChange}
              />
            </CardContent>
          </Card>

          {/* 事務所情報 */}
          <Card>
            <CardContent>
              <EigyoJimushoSection
                data={formData}
                onChange={handleFieldChange}
              />
            </CardContent>
          </Card>

          {/* 社内管理情報 */}
          <Card>
            <CardContent>
              <EigyoKanriSection
                data={formData}
                onChange={handleFieldChange}
                masters={masters}
              />
            </CardContent>
          </Card>
        </Stack>

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

