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
  Tabs,
  Tab,
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function EigyoDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { getEigyoById, updateEigyo, masters } = useData();
  const [tabValue, setTabValue] = useState(0);
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
        <Card>
          <CardContent>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs
                value={tabValue}
                onChange={(_, newValue) => setTabValue(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="基本情報" />
                <Tab label="金額" />
                <Tab label="出演情報" />
                <Tab label="営業情報" />
                <Tab label="事務所情報" />
                <Tab label="社内管理情報" />
              </Tabs>
            </Box>

            {/* 基本情報 Tab */}
            <TabPanel value={tabValue} index={0}>
              <EigyoBasicInfoSection
                data={formData}
                onChange={handleFieldChange}
                masters={masters}
              />
            </TabPanel>

            {/* 金額 Tab */}
            <TabPanel value={tabValue} index={1}>
              <EigyoKingakuSection
                data={formData}
                onChange={handleFieldChange}
              />
            </TabPanel>

            {/* 出演情報 Tab */}
            <TabPanel value={tabValue} index={2}>
              <EigyoShutsuenSection
                data={formData}
                onChange={handleFieldChange}
              />
            </TabPanel>

            {/* 営業情報 Tab */}
            <TabPanel value={tabValue} index={3}>
              <EigyoEigyoSection
                data={formData}
                onChange={handleFieldChange}
              />
            </TabPanel>

            {/* 事務所情報 Tab */}
            <TabPanel value={tabValue} index={4}>
              <EigyoJimushoSection
                data={formData}
                onChange={handleFieldChange}
              />
            </TabPanel>

            {/* 社内管理情報 Tab */}
            <TabPanel value={tabValue} index={5}>
              <EigyoKanriSection
                data={formData}
                onChange={handleFieldChange}
                masters={masters}
              />
            </TabPanel>
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

