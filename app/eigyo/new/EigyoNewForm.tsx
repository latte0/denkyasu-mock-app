'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Alert,
  Collapse,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import Header from '@/components/Header';
import { useData } from '@/context/DataContext';
import { EigyoInfo } from '@/types';
import EigyoBasicInfoSection from '@/components/eigyo/EigyoBasicInfoSection';
import EigyoKingakuSection from '@/components/eigyo/EigyoKingakuSection';
import EigyoShutsuenSection from '@/components/eigyo/EigyoShutsuenSection';
import EigyoEigyoSection from '@/components/eigyo/EigyoEigyoSection';
import EigyoJimushoSection from '@/components/eigyo/EigyoJimushoSection';
import EigyoKanriSection from '@/components/eigyo/EigyoKanriSection';

export default function EigyoNewForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addEigyo, masters, eigyoList } = useData();
  const [transcriptText, setTranscriptText] = useState<string | null>(null);
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

  // URLパラメータから文字起こしテキストを取得
  useEffect(() => {
    const transcript = searchParams.get('transcript');
    if (transcript) {
      try {
        const decoded = decodeURIComponent(escape(atob(decodeURIComponent(transcript))));
        setTranscriptText(decoded);
        // 業務内容フィールドに自動入力
        setFormData(prev => ({
          ...prev,
          gyomuNaiyo: decoded,
        }));
      } catch (e) {
        console.error('Failed to decode transcript:', e);
      }
    }
  }, [searchParams]);

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
        <Stack spacing={3}>
          {/* 音声文字起こしからの作成アラート */}
          <Collapse in={!!transcriptText}>
            <Alert 
              severity="info" 
              icon={<AudioFileIcon />}
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                📝 音声文字起こしから作成中
              </Typography>
              <Typography variant="body2">
                文字起こしテキストが「業務内容」に自動入力されています。必要に応じて編集してください。
              </Typography>
            </Alert>
          </Collapse>

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

