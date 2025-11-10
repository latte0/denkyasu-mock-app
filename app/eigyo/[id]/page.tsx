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
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    広告主・商品情報
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
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    営業情報
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <FormControl fullWidth size="small">
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
                      <FormControl fullWidth size="small">
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
                      <FormControl sx={{ minWidth: 100 }} size="small">
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
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="設定局１"
                        value={formData.setteikyoku1}
                        onChange={(e) => setFormData({ ...formData, setteikyoku1: e.target.value })}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="設定局２"
                        value={formData.setteikyoku2}
                        onChange={(e) => setFormData({ ...formData, setteikyoku2: e.target.value })}
                      />
                    </Box>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    契約期間
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="date"
                        label="契約開始"
                        value={formData.keiyakuKaishiDate}
                        onChange={(e) => setFormData({ ...formData, keiyakuKaishiDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                      />
                      <Typography>〜</Typography>
                      <TextField
                        fullWidth
                        size="small"
                        type="date"
                        label="契約終了"
                        value={formData.keiyakuShuryoDate}
                        onChange={(e) => setFormData({ ...formData, keiyakuShuryoDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={formData.keiyakuShuryoBunkatsuKeijo}
                            onChange={(e) => setFormData({ ...formData, keiyakuShuryoBunkatsuKeijo: e.target.checked })}
                          />
                        }
                        label="分割計上"
                      />
                    </Box>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      label="納品日"
                      value={formData.nouhinbiDate}
                      onChange={(e) => setFormData({ ...formData, nouhinbiDate: e.target.value })}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    タレント・費目
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                        タレント
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {formData.talent.map((t, idx) => (
                          <Chip key={idx} label={t} size="small" />
                        ))}
                      </Stack>
                    </Box>
                    <FormControl fullWidth size="small">
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
                </Box>
              </Stack>
            </TabPanel>

            {/* 金額 Tab */}
            <TabPanel value={tabValue} index={1}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    契約料
                  </Typography>
                  <Stack spacing={1.5}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="電通 他→DCE"
                      value={formData.keiyakuryoDentsuToDce}
                      onChange={(e) => setFormData({ ...formData, keiyakuryoDentsuToDce: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
                      }}
                      helperText={`${(formData.keiyakuryoDentsuToDce / 10000).toLocaleString()}万円`}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="DCE→事務所 他"
                      value={formData.keiyakuryoDceToJimusho}
                      onChange={(e) => setFormData({ ...formData, keiyakuryoDceToJimusho: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
                      }}
                      helperText={`${(formData.keiyakuryoDceToJimusho / 10000).toLocaleString()}万円`}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="差額利益"
                      value={formData.sagakuRieki}
                      onChange={(e) => setFormData({ ...formData, sagakuRieki: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
                      }}
                      helperText={`${(formData.sagakuRieki / 10000).toLocaleString()}万円`}
                      sx={{ 
                        '& .MuiOutlinedInput-root': { 
                          backgroundColor: 'rgba(76, 175, 80, 0.05)' 
                        }
                      }}
                    />
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    手数料
                  </Typography>
                  <Stack spacing={1.5}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="手数料（本社）"
                      value={formData.tesuuryoHonsha}
                      onChange={(e) => setFormData({ ...formData, tesuuryoHonsha: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
                      }}
                      helperText={`${(formData.tesuuryoHonsha / 10000).toLocaleString()}万円`}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="手数料（DCE）"
                      value={formData.tesuuryoDce}
                      onChange={(e) => setFormData({ ...formData, tesuuryoDce: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
                      }}
                      helperText={`${(formData.tesuuryoDce / 10000).toLocaleString()}万円`}
                    />
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    利益・管理費
                  </Typography>
                  <Stack spacing={1.5}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="DCE総利益"
                      value={formData.dceSouRieki}
                      onChange={(e) => setFormData({ ...formData, dceSouRieki: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
                      }}
                      helperText={`${(formData.dceSouRieki / 10000).toLocaleString()}万円`}
                      sx={{ 
                        '& .MuiOutlinedInput-root': { 
                          backgroundColor: 'rgba(33, 150, 243, 0.05)' 
                        }
                      }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="企業管理費"
                      value={formData.kigyoKanrihi}
                      onChange={(e) => setFormData({ ...formData, kigyoKanrihi: Number(e.target.value) })}
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
                      }}
                      helperText={`${(formData.kigyoKanrihi / 10000).toLocaleString()}万円`}
                    />
                  </Stack>
                </Box>
              </Stack>
            </TabPanel>

            {/* 出演情報 Tab */}
            <TabPanel value={tabValue} index={2}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  label="初回出演日"
                  value={formData.shokaiShutsuenbiDate}
                  onChange={(e) => setFormData({ ...formData, shokaiShutsuenbiDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="その他分類"
                  value={formData.sonotaBunrui}
                  onChange={(e) => setFormData({ ...formData, sonotaBunrui: e.target.value })}
                />
                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    競合NG
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {formData.kyougouNg.length > 0 ? formData.kyougouNg.map((item, idx) => (
                      <Chip key={idx} label={item} size="small" color="error" />
                    )) : <Typography variant="body2" color="text.secondary">なし</Typography>}
                  </Stack>
                </Box>
              </Stack>
            </TabPanel>

            {/* 営業情報 Tab */}
            <TabPanel value={tabValue} index={3}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    営業担当
                  </Typography>
                  <Stack spacing={1.5}>
                    <TextField
                      fullWidth
                      size="small"
                      label="担当営業"
                      value={formData.tantoEigyo}
                      onChange={(e) => setFormData({ ...formData, tantoEigyo: e.target.value })}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="設定CD"
                      value={formData.setteiCd}
                      onChange={(e) => setFormData({ ...formData, setteiCd: e.target.value })}
                    />
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    制作担当
                  </Typography>
                  <Stack spacing={1.5}>
                    <TextField
                      fullWidth
                      size="small"
                      label="担当CD"
                      value={formData.tantoCdText}
                      onChange={(e) => setFormData({ ...formData, tantoCdText: e.target.value })}
                    />
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="担当CR１"
                        value={formData.tantoCr1Text}
                        onChange={(e) => setFormData({ ...formData, tantoCr1Text: e.target.value })}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="担当CR２"
                        value={formData.tantoCr2Text}
                        onChange={(e) => setFormData({ ...formData, tantoCr2Text: e.target.value })}
                      />
                    </Box>
                    <TextField
                      fullWidth
                      size="small"
                      label="担当CP"
                      value={formData.tantoCp}
                      onChange={(e) => setFormData({ ...formData, tantoCp: e.target.value })}
                    />
                  </Stack>
                </Box>
              </Stack>
            </TabPanel>

            {/* 事務所情報 Tab */}
            <TabPanel value={tabValue} index={4}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    所属事務所
                  </Typography>
                  <Stack spacing={1.5}>
                    <TextField
                      fullWidth
                      size="small"
                      label="所属事務所"
                      value={formData.shozokuJimusho}
                      onChange={(e) => setFormData({ ...formData, shozokuJimusho: e.target.value })}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="事務所担当者"
                      value={formData.jimushoTantosha}
                      onChange={(e) => setFormData({ ...formData, jimushoTantosha: e.target.value })}
                    />
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    出演管理
                  </Typography>
                  <Stack spacing={1.5}>
                    <TextField
                      fullWidth
                      size="small"
                      label="出演管理会社"
                      value={formData.shutsuenKanri}
                      onChange={(e) => setFormData({ ...formData, shutsuenKanri: e.target.value })}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="出演管理担当者"
                      value={formData.shutsuenKanriTantosha}
                      onChange={(e) => setFormData({ ...formData, shutsuenKanriTantosha: e.target.value })}
                    />
                  </Stack>
                </Box>
              </Stack>
            </TabPanel>

            {/* 社内管理情報 Tab */}
            <TabPanel value={tabValue} index={5}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    DCE担当者
                  </Typography>
                  <Box sx={{ 
                    border: '1px solid #ddd', 
                    borderRadius: 1, 
                    overflow: 'hidden',
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                          <th style={{ padding: '8px', textAlign: 'left', fontSize: '0.875rem' }}>担当者</th>
                          <th style={{ padding: '8px', textAlign: 'right', width: '80px', fontSize: '0.875rem' }}>割合(%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '8px' }}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={formData.dceTantosha1}
                                onChange={(e) => setFormData({ ...formData, dceTantosha1: e.target.value })}
                                displayEmpty
                              >
                                {masters.dceTantobu.map((item) => (
                                  <MenuItem key={item.code} value={item.name}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </td>
                          <td style={{ padding: '8px' }}>
                            <TextField
                              fullWidth
                              size="small"
                              type="number"
                              value={formData.dceTantosha1Percent}
                              onChange={(e) => setFormData({ ...formData, dceTantosha1Percent: Number(e.target.value) })}
                              InputProps={{ sx: { textAlign: 'right' } }}
                            />
                          </td>
                        </tr>
                        <tr style={{ backgroundColor: '#fafafa' }}>
                          <td style={{ padding: '8px' }}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={formData.dceTantosha2}
                                onChange={(e) => setFormData({ ...formData, dceTantosha2: e.target.value })}
                                displayEmpty
                              >
                                <MenuItem value="">なし</MenuItem>
                                {masters.dceTantobu.map((item) => (
                                  <MenuItem key={item.code} value={item.name}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </td>
                          <td style={{ padding: '8px' }}>
                            <TextField
                              fullWidth
                              size="small"
                              type="number"
                              value={formData.dceTantosha2Percent}
                              onChange={(e) => setFormData({ ...formData, dceTantosha2Percent: Number(e.target.value) })}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px' }}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={formData.dceTantosha3}
                                onChange={(e) => setFormData({ ...formData, dceTantosha3: e.target.value })}
                                displayEmpty
                              >
                                <MenuItem value="">なし</MenuItem>
                                {masters.dceTantobu.map((item) => (
                                  <MenuItem key={item.code} value={item.name}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </td>
                          <td style={{ padding: '8px' }}>
                            <TextField
                              fullWidth
                              size="small"
                              type="number"
                              value={formData.dceTantosha3Percent}
                              onChange={(e) => setFormData({ ...formData, dceTantosha3Percent: Number(e.target.value) })}
                            />
                          </td>
                        </tr>
                        <tr style={{ backgroundColor: '#fafafa' }}>
                          <td style={{ padding: '8px' }}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={formData.dceTantosha4}
                                onChange={(e) => setFormData({ ...formData, dceTantosha4: e.target.value })}
                                displayEmpty
                              >
                                <MenuItem value="">なし</MenuItem>
                                {masters.dceTantobu.map((item) => (
                                  <MenuItem key={item.code} value={item.name}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </td>
                          <td style={{ padding: '8px' }}>
                            <TextField
                              fullWidth
                              size="small"
                              type="number"
                              value={formData.dceTantosha4Percent}
                              onChange={(e) => setFormData({ ...formData, dceTantosha4Percent: Number(e.target.value) })}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    出演料単価
                  </Typography>
                  <Box sx={{ 
                    border: '1px solid #ddd', 
                    borderRadius: 1, 
                    overflow: 'auto',
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                          <th style={{ padding: '8px', textAlign: 'left', minWidth: '100px' }}>媒体</th>
                          <th style={{ padding: '8px', textAlign: 'right', width: '60px' }}>%</th>
                          <th style={{ padding: '8px', textAlign: 'right', minWidth: '100px' }}>電通他→DCE</th>
                          <th style={{ padding: '8px', textAlign: 'right', minWidth: '100px' }}>DCE→事務所他</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { idx: 1, baitai: formData.shutsuenryoTanka1Baitai, percent: formData.shutsuenryoTanka1Percent, dentsu: formData.shutsuenryoTanka1DentsuToDce, jimusho: formData.shutsuenryoTanka1DceToJimusho },
                          { idx: 2, baitai: formData.shutsuenryoTanka2Baitai, percent: formData.shutsuenryoTanka2Percent, dentsu: formData.shutsuenryoTanka2DentsuToDce, jimusho: formData.shutsuenryoTanka2DceToJimusho },
                          { idx: 3, baitai: formData.shutsuenryoTanka3Baitai, percent: formData.shutsuenryoTanka3Percent, dentsu: formData.shutsuenryoTanka3DentsuToDce, jimusho: formData.shutsuenryoTanka3DceToJimusho },
                          { idx: 4, baitai: formData.shutsuenryoTanka4Baitai, percent: formData.shutsuenryoTanka4Percent, dentsu: formData.shutsuenryoTanka4DentsuToDce, jimusho: formData.shutsuenryoTanka4DceToJimusho },
                          { idx: 5, baitai: formData.shutsuenryoTanka5Baitai, percent: formData.shutsuenryoTanka5Percent, dentsu: formData.shutsuenryoTanka5DentsuToDce, jimusho: formData.shutsuenryoTanka5DceToJimusho },
                        ].map((row, i) => (
                          <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                            <td style={{ padding: '8px' }}>
                              <FormControl fullWidth size="small">
                                <Select
                                  value={row.baitai}
                                  onChange={(e) => setFormData({ 
                                    ...formData, 
                                    [`shutsuenryoTanka${row.idx}Baitai`]: e.target.value 
                                  } as any)}
                                  displayEmpty
                                >
                                  <MenuItem value="">なし</MenuItem>
                                  {masters.media.map((item) => (
                                    <MenuItem key={item.code} value={item.name}>
                                      {item.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <TextField
                                fullWidth
                                size="small"
                                type="number"
                                value={row.percent}
                                onChange={(e) => setFormData({ 
                                  ...formData, 
                                  [`shutsuenryoTanka${row.idx}Percent`]: Number(e.target.value) 
                                } as any)}
                                inputProps={{ style: { textAlign: 'right' } }}
                              />
                            </td>
                            <td style={{ padding: '8px' }}>
                              <TextField
                                fullWidth
                                size="small"
                                type="number"
                                value={row.dentsu}
                                onChange={(e) => setFormData({ 
                                  ...formData, 
                                  [`shutsuenryoTanka${row.idx}DentsuToDce`]: Number(e.target.value) 
                                } as any)}
                                inputProps={{ style: { textAlign: 'right' } }}
                              />
                            </td>
                            <td style={{ padding: '8px' }}>
                              <TextField
                                fullWidth
                                size="small"
                                type="number"
                                value={row.jimusho}
                                onChange={(e) => setFormData({ 
                                  ...formData, 
                                  [`shutsuenryoTanka${row.idx}DceToJimusho`]: Number(e.target.value) 
                                } as any)}
                                inputProps={{ style: { textAlign: 'right' } }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                    その他
                  </Typography>
                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      <FormControl fullWidth size="small">
                        <InputLabel>DCE営業担当者</InputLabel>
                        <Select
                          value={formData.dceEigyoTantosha}
                          label="DCE営業担当者"
                          onChange={(e) => setFormData({ ...formData, dceEigyoTantosha: e.target.value })}
                        >
                          {masters.dceTantobu.map((item) => (
                            <MenuItem key={item.code} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth size="small">
                        <InputLabel>DCE契約担当者</InputLabel>
                        <Select
                          value={formData.dceKeiyakuTantosha}
                          label="DCE契約担当者"
                          onChange={(e) => setFormData({ ...formData, dceKeiyakuTantosha: e.target.value })}
                        >
                          {masters.dceTantobu.map((item) => (
                            <MenuItem key={item.code} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={3}
                      label="業務内容"
                      value={formData.gyomuNaiyo}
                      onChange={(e) => setFormData({ ...formData, gyomuNaiyo: e.target.value })}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="文責"
                      value={formData.bunseki}
                      onChange={(e) => setFormData({ ...formData, bunseki: e.target.value })}
                    />
                  </Stack>
                </Box>
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

