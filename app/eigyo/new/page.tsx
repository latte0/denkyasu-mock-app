'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
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

export default function EigyoNewPage() {
  const router = useRouter();
  const { addEigyo, masters, eigyoList } = useData();
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState<EigyoInfo>({
    id: `E${String(eigyoList.length + 1).padStart(3, '0')}`,
    koukokushu: '',
    eigyokyoku: '',
    setteikyoku1: '',
    setteikyoku2: '',
    shohinService: '',
    status: '新規作業',
    kakudo: '中',
    talent: [],
    johoKokaibiDate: '',
    johoKokaibiSelect1: '',
    johoKokaibiStatus: '',
    keiyakuKaishiDate: '',
    keiyakuKaishiSelect1: '',
    keiyakuKaishiSelect2: '',
    keiyakuShuryoDate: '',
    keiyakuShuryoSelect1: '',
    keiyakuShuryoBunkatsuKeijo: false,
    nouhinbiDate: '',
    nouhinbiSelect1: '',
    nouhinbiSelect2: '',
    himoku: '',
    himokuJikoShou: false,
    himokuTatenSeisaku: false,
    keiyakuryoDentsuToDce: 0,
    keiyakuryoDentsuToDceSelect: '円',
    keiyakuryoDceToJimusho: 0,
    keiyakuryoDceToJimushoCheck: false,
    keiyakuryoDceToJimushoSelect: '円',
    sagakuRieki: 0,
    sagakuRiekiSelect: '円',
    tesuuryoHonsha: 0,
    tesuuryoHonshaSelect: '円',
    tesuuryoDce: 0,
    tesuuryoDceSelect: '円',
    dceSouRieki: 0,
    dceSouRiekiSelect: '円',
    kigyoKanrihi: 0,
    kigyoKanrihiSelect: '円',
    w65: 0,
    w65Select: '円',
    shokaiShutsuenbiDate: '',
    shokaiShutsuenbiSelect1: '',
    shokaiShutsuenbiSelect2: '',
    shokaiShutsuenryoDentsuToDce: '',
    shokaiShutsuenryoDceToJimusho: '',
    kyougouNg: [],
    sonotaBunrui: '',
    kyougouGray: [],
    tantoEigyo: '',
    setteiCd: '',
    tantoCd: '',
    tantoCdText: '',
    tantoCr1: '',
    tantoCr1Text: '',
    tantoCr2: '',
    tantoCr2Text: '',
    tantoCp: '',
    shozokuJimusho: '',
    jimushoTantosha: '',
    shutsuenKanri: '',
    shutsuenKanriTantosha: '',
    dceTantosha1: '',
    dceTantosha1Percent: 0,
    dceTantosha2: '',
    dceTantosha2Percent: 0,
    dceTantosha3: '',
    dceTantosha3Percent: 0,
    dceTantosha4: '',
    dceTantosha4Percent: 0,
    dceEigyoTantosha: '',
    dceKeiyakuTantosha: '',
    gyomuNaiyo: '',
    bunseki: '',
    shutsuenryoTanka1Baitai: '',
    shutsuenryoTanka1Percent: 0,
    shutsuenryoTanka1DentsuToDce: 0,
    shutsuenryoTanka1DceToJimusho: 0,
    shutsuenryoTanka2Baitai: '',
    shutsuenryoTanka2Percent: 0,
    shutsuenryoTanka2DentsuToDce: 0,
    shutsuenryoTanka2DceToJimusho: 0,
    shutsuenryoTanka3Baitai: '',
    shutsuenryoTanka3Percent: 0,
    shutsuenryoTanka3DentsuToDce: 0,
    shutsuenryoTanka3DceToJimusho: 0,
    shutsuenryoTanka4Baitai: '',
    shutsuenryoTanka4Percent: 0,
    shutsuenryoTanka4DentsuToDce: 0,
    shutsuenryoTanka4DceToJimusho: 0,
    shutsuenryoTanka5Baitai: '',
    shutsuenryoTanka5Percent: 0,
    shutsuenryoTanka5DentsuToDce: 0,
    shutsuenryoTanka5DceToJimusho: 0,
  });

  const handleSave = () => {
    if (!formData.koukokushu || !formData.shohinService) {
      alert('広告主と商品・サービスは必須です');
      return;
    }
    addEigyo(formData);
    alert('登録しました');
    router.push('/eigyo');
  };

  const handleFieldChange = (updates: Partial<EigyoInfo>) => {
    setFormData({ ...formData, ...updates });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 10 }}>
      <Header title="営業情報新規作成" showBack={true} />
      
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

