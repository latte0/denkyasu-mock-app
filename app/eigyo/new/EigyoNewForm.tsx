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

  // 文字起こしテキストから情報を抽出（モック）
  const extractInfoFromTranscript = (text: string): Partial<EigyoInfo> => {
    // モック: 実際にはAIで解析するが、ここでは音声内容に基づいて固定値を設定
    const extracted: Partial<EigyoInfo> = {};
    
    // 広告主の抽出（モックでは固定値 + テキスト内容から推測）
    if (text.includes('株式会社') || text.includes('お世話になっております')) {
      extracted.koukokushu = '株式会社サンプル化粧品';
    }
    
    // 商品・サービスの抽出
    if (text.includes('化粧品') || text.includes('新ブランド')) {
      extracted.shohinService = '化粧品（新ブランド）20代〜30代女性向け';
    } else if (text.includes('新商品')) {
      extracted.shohinService = '新商品CM';
    }
    
    // 金額の抽出（〇〇万円、〇〇億円など）
    const amountMatch = text.match(/(\d+)(万円|億円)/);
    if (amountMatch) {
      const amount = parseInt(amountMatch[1]);
      const unit = amountMatch[2];
      // 万円単位に変換して円に
      const amountInMan = unit === '億円' ? amount * 10000 : amount;
      extracted.keiyakuryoDentsuToDce = amountInMan * 10000; // 円に変換
    }
    
    // タレント名の抽出（モックでは固定値）
    if (text.includes('タレント') || text.includes('候補')) {
      extracted.talent = ['山田太郎'];
    }
    
    // 競合NGの抽出
    if (text.includes('化粧品メーカー') || text.includes('同業他社')) {
      extracted.kyougouNg = ['化粧品メーカー全般'];
    }
    
    // 使用期間の抽出
    if (text.includes('1年間') || text.includes('年間')) {
      // 契約開始日を今日から、終了日を1年後に設定
      const today = new Date();
      const nextYear = new Date(today);
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      extracted.keiyakuKaishiDate = today.toISOString().split('T')[0];
      extracted.keiyakuShuryoDate = nextYear.toISOString().split('T')[0];
    }
    
    // 撮影予定日の抽出
    if (text.includes('来年1月') || text.includes('1月')) {
      const nextYear = new Date().getFullYear() + 1;
      extracted.shokaiShutsuenbiDate = `${nextYear}-01-15`;
    }
    
    // 媒体の抽出
    if (text.includes('テレビCM') || text.includes('テレビ')) {
      extracted.shutsuenryoTanka1Baitai = 'テレビCM';
    }
    if (text.includes('WEB広告') || text.includes('WEB')) {
      extracted.shutsuenryoTanka2Baitai = 'WEB広告';
    }
    
    return extracted;
  };

  // URLパラメータから文字起こしテキストを取得
  useEffect(() => {
    const transcript = searchParams.get('transcript');
    if (transcript) {
      try {
        const decoded = decodeURIComponent(escape(atob(decodeURIComponent(transcript))));
        setTranscriptText(decoded);
        
        // 文字起こしテキストから情報を抽出して自動入力
        const extractedInfo = extractInfoFromTranscript(decoded);
        
        setFormData(prev => ({
          ...prev,
          ...extractedInfo,
          gyomuNaiyo: decoded, // 元のテキストも業務内容に保存
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
              severity="success" 
              icon={<AudioFileIcon />}
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                ✨ 音声から情報を自動抽出しました
              </Typography>
              <Typography variant="body2" component="div">
                以下のフィールドに自動入力されました：
                <Box component="ul" sx={{ m: 0, pl: 2, mt: 0.5 }}>
                  {formData.koukokushu && <li>広告主: {formData.koukokushu}</li>}
                  {formData.shohinService && <li>商品・サービス: {formData.shohinService}</li>}
                  {formData.talent && formData.talent.length > 0 && <li>タレント: {formData.talent.join(', ')}</li>}
                  {formData.keiyakuryoDentsuToDce > 0 && <li>契約料: {(formData.keiyakuryoDentsuToDce / 10000).toLocaleString()}万円</li>}
                  {formData.kyougouNg && formData.kyougouNg.length > 0 && <li>競合NG: {formData.kyougouNg.join(', ')}</li>}
                  {formData.keiyakuKaishiDate && <li>契約期間: {formData.keiyakuKaishiDate} 〜 {formData.keiyakuShuryoDate}</li>}
                </Box>
                <Box sx={{ mt: 1, fontSize: '0.8rem', color: 'text.secondary' }}>
                  ※ 内容を確認・修正してから保存してください
                </Box>
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

