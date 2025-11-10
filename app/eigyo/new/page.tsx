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
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Stack,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Header from '@/components/Header';
import { useData } from '@/context/DataContext';
import { EigyoInfo } from '@/types';

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
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="広告主"
                  required
                  value={formData.koukokushu}
                  onChange={(e) => setFormData({ ...formData, koukokushu: e.target.value })}
                />
                <FormControl fullWidth>
                  <InputLabel>営業局</InputLabel>
                  <Select
                    value={formData.eigyokyoku}
                    label="営業局"
                    onChange={(e) => setFormData({ ...formData, eigyokyoku: e.target.value })}
                  >
                    {masters.eigyokyoku.map((item) => (
                      <MenuItem key={item.code} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="商品・サービス"
                  required
                  value={formData.shohinService}
                  onChange={(e) => setFormData({ ...formData, shohinService: e.target.value })}
                />
                <FormControl fullWidth>
                  <InputLabel>ステータス</InputLabel>
                  <Select
                    value={formData.status}
                    label="ステータス"
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    {masters.status.map((item) => (
                      <MenuItem key={item.code} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>確度</InputLabel>
                  <Select
                    value={formData.kakudo}
                    label="確度"
                    onChange={(e) => setFormData({ ...formData, kakudo: e.target.value })}
                  >
                    {masters.kakudo.map((item) => (
                      <MenuItem key={item.code} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  type="date"
                  label="契約開始"
                  value={formData.keiyakuKaishiDate}
                  onChange={(e) => setFormData({ ...formData, keiyakuKaishiDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  type="date"
                  label="契約終了"
                  value={formData.keiyakuShuryoDate}
                  onChange={(e) => setFormData({ ...formData, keiyakuShuryoDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  type="date"
                  label="納品日"
                  value={formData.nouhinbiDate}
                  onChange={(e) => setFormData({ ...formData, nouhinbiDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth>
                  <InputLabel>費目</InputLabel>
                  <Select
                    value={formData.himoku}
                    label="費目"
                    onChange={(e) => setFormData({ ...formData, himoku: e.target.value })}
                  >
                    {masters.himoku.map((item) => (
                      <MenuItem key={item.code} value={item.name}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </TabPanel>

            {/* 金額 Tab */}
            <TabPanel value={tabValue} index={1}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  type="number"
                  label="契約料（電通 他→DCE）"
                  value={formData.keiyakuryoDentsuToDce}
                  onChange={(e) => setFormData({ ...formData, keiyakuryoDentsuToDce: Number(e.target.value) })}
                />
                <TextField
                  fullWidth
                  type="number"
                  label="契約料（DCE→事務所 他）"
                  value={formData.keiyakuryoDceToJimusho}
                  onChange={(e) => setFormData({ ...formData, keiyakuryoDceToJimusho: Number(e.target.value) })}
                />
                <TextField
                  fullWidth
                  type="number"
                  label="手数料（本社）"
                  value={formData.tesuuryoHonsha}
                  onChange={(e) => setFormData({ ...formData, tesuuryoHonsha: Number(e.target.value) })}
                />
                <TextField
                  fullWidth
                  type="number"
                  label="手数料（DCE）"
                  value={formData.tesuuryoDce}
                  onChange={(e) => setFormData({ ...formData, tesuuryoDce: Number(e.target.value) })}
                />
              </Stack>
            </TabPanel>

            {/* 出演情報 Tab */}
            <TabPanel value={tabValue} index={2}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  type="date"
                  label="初回出演日"
                  value={formData.shokaiShutsuenbiDate}
                  onChange={(e) => setFormData({ ...formData, shokaiShutsuenbiDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="その他分類"
                  value={formData.sonotaBunrui}
                  onChange={(e) => setFormData({ ...formData, sonotaBunrui: e.target.value })}
                />
              </Stack>
            </TabPanel>

            {/* 営業情報 Tab */}
            <TabPanel value={tabValue} index={3}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="担当営業"
                  value={formData.tantoEigyo}
                  onChange={(e) => setFormData({ ...formData, tantoEigyo: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="担当CD"
                  value={formData.tantoCdText}
                  onChange={(e) => setFormData({ ...formData, tantoCdText: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="担当CP"
                  value={formData.tantoCp}
                  onChange={(e) => setFormData({ ...formData, tantoCp: e.target.value })}
                />
              </Stack>
            </TabPanel>

            {/* 事務所情報 Tab */}
            <TabPanel value={tabValue} index={4}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="所属事務所"
                  value={formData.shozokuJimusho}
                  onChange={(e) => setFormData({ ...formData, shozokuJimusho: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="事務所担当者"
                  value={formData.jimushoTantosha}
                  onChange={(e) => setFormData({ ...formData, jimushoTantosha: e.target.value })}
                />
              </Stack>
            </TabPanel>

            {/* 社内管理情報 Tab */}
            <TabPanel value={tabValue} index={5}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControl sx={{ flex: 2 }}>
                    <InputLabel>DCE担当者_1</InputLabel>
                    <Select
                      value={formData.dceTantosha1}
                      label="DCE担当者_1"
                      onChange={(e) => setFormData({ ...formData, dceTantosha1: e.target.value })}
                    >
                      {masters.dceTantobu.map((item) => (
                        <MenuItem key={item.code} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      type="number"
                      label="%"
                      value={formData.dceTantosha1Percent}
                      onChange={(e) => setFormData({ ...formData, dceTantosha1Percent: Number(e.target.value) })}
                    />
                  </Box>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="業務内容"
                  value={formData.gyomuNaiyo}
                  onChange={(e) => setFormData({ ...formData, gyomuNaiyo: e.target.value })}
                />
              </Stack>
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

