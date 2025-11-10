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
  Chip,
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
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="広告主"
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
                  label="設定局１"
                  value={formData.setteikyoku1}
                  onChange={(e) => setFormData({ ...formData, setteikyoku1: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="設定局２"
                  value={formData.setteikyoku2}
                  onChange={(e) => setFormData({ ...formData, setteikyoku2: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="商品・サービス"
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
                <Box>
                  <Typography variant="caption" color="text.secondary" gutterBottom>
                    タレント
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {formData.talent.map((t, idx) => (
                      <Chip key={idx} label={t} size="small" />
                    ))}
                  </Stack>
                </Box>
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.keiyakuShuryoBunkatsuKeijo}
                      onChange={(e) => setFormData({ ...formData, keiyakuShuryoBunkatsuKeijo: e.target.checked })}
                    />
                  }
                  label="契約終了_分割計上"
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
                  label="差額利益"
                  value={formData.sagakuRieki}
                  onChange={(e) => setFormData({ ...formData, sagakuRieki: Number(e.target.value) })}
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
                <TextField
                  fullWidth
                  type="number"
                  label="DCE総利益"
                  value={formData.dceSouRieki}
                  onChange={(e) => setFormData({ ...formData, dceSouRieki: Number(e.target.value) })}
                />
                <TextField
                  fullWidth
                  type="number"
                  label="企業管理費"
                  value={formData.kigyoKanrihi}
                  onChange={(e) => setFormData({ ...formData, kigyoKanrihi: Number(e.target.value) })}
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
                <Box>
                  <Typography variant="caption" color="text.secondary" gutterBottom>
                    競合NG
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {formData.kyougouNg.map((item, idx) => (
                      <Chip key={idx} label={item} size="small" color="error" />
                    ))}
                  </Stack>
                </Box>
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
                  label="設定CD"
                  value={formData.setteiCd}
                  onChange={(e) => setFormData({ ...formData, setteiCd: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="担当CD"
                  value={formData.tantoCdText}
                  onChange={(e) => setFormData({ ...formData, tantoCdText: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="担当CR１"
                  value={formData.tantoCr1Text}
                  onChange={(e) => setFormData({ ...formData, tantoCr1Text: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="担当CR２"
                  value={formData.tantoCr2Text}
                  onChange={(e) => setFormData({ ...formData, tantoCr2Text: e.target.value })}
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
                <TextField
                  fullWidth
                  label="出演管理"
                  value={formData.shutsuenKanri}
                  onChange={(e) => setFormData({ ...formData, shutsuenKanri: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="出演管理担当者"
                  value={formData.shutsuenKanriTantosha}
                  onChange={(e) => setFormData({ ...formData, shutsuenKanriTantosha: e.target.value })}
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
                  <TextField
                    sx={{ flex: 1 }}
                    type="number"
                    label="%"
                    value={formData.dceTantosha1Percent}
                    onChange={(e) => setFormData({ ...formData, dceTantosha1Percent: Number(e.target.value) })}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControl sx={{ flex: 2 }}>
                    <InputLabel>DCE担当者_2</InputLabel>
                    <Select
                      value={formData.dceTantosha2}
                      label="DCE担当者_2"
                      onChange={(e) => setFormData({ ...formData, dceTantosha2: e.target.value })}
                    >
                      <MenuItem value="">なし</MenuItem>
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
                      value={formData.dceTantosha2Percent}
                      onChange={(e) => setFormData({ ...formData, dceTantosha2Percent: Number(e.target.value) })}
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
                <TextField
                  fullWidth
                  label="文責"
                  value={formData.bunseki}
                  onChange={(e) => setFormData({ ...formData, bunseki: e.target.value })}
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

