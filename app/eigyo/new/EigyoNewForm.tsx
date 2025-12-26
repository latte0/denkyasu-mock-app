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
  CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Header from '@/components/Header';
import { useData } from '@/context/DataContext';
import { EigyoInfo } from '@/types';
import EigyoBasicInfoSection from '@/components/eigyo/EigyoBasicInfoSection';
import EigyoKingakuSection from '@/components/eigyo/EigyoKingakuSection';
import EigyoShutsuenSection from '@/components/eigyo/EigyoShutsuenSection';
import EigyoEigyoSection from '@/components/eigyo/EigyoEigyoSection';
import EigyoJimushoSection from '@/components/eigyo/EigyoJimushoSection';
import EigyoKanriSection from '@/components/eigyo/EigyoKanriSection';

// Type for AI-extracted info from voice upload
interface ExtractedInfo {
  koukokushu?: string;
  shohinService?: string;
  talent?: string[];
  keiyakuryoDentsuToDce?: number;
  keiyakuKaishiDate?: string;
  keiyakuShuryoDate?: string;
  kyougouNg?: string[];
  shokaiShutsuenbiDate?: string;
  shutsuenryoTanka1Baitai?: string;
  shutsuenryoTanka2Baitai?: string;
  gyomuNaiyo?: string;
  summary?: string;
  confidence?: number;
}

// Voice data structure passed from voice-upload page
interface VoiceData {
  transcript: string;
  extractedInfo: ExtractedInfo | null;
}

export default function EigyoNewForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addEigyo, masters, eigyoList } = useData();
  const [transcriptText, setTranscriptText] = useState<string | null>(null);
  const [aiExtracted, setAiExtracted] = useState<ExtractedInfo | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
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

  // Legacy: 文字起こしテキストから情報を抽出（モック - 旧パラメータ用）
  const extractInfoFromTranscript = (text: string): Partial<EigyoInfo> => {
    const extracted: Partial<EigyoInfo> = {};
    
    if (text.includes('株式会社') || text.includes('お世話になっております')) {
      extracted.koukokushu = '株式会社サンプル化粧品';
    }
    
    if (text.includes('化粧品') || text.includes('新ブランド')) {
      extracted.shohinService = '化粧品（新ブランド）20代〜30代女性向け';
    } else if (text.includes('新商品')) {
      extracted.shohinService = '新商品CM';
    }
    
    const amountMatch = text.match(/(\d+)(万円|億円)/);
    if (amountMatch) {
      const amount = parseInt(amountMatch[1]);
      const unit = amountMatch[2];
      const amountInMan = unit === '億円' ? amount * 10000 : amount;
      extracted.keiyakuryoDentsuToDce = amountInMan * 10000;
    }
    
    if (text.includes('タレント') || text.includes('候補')) {
      extracted.talent = ['山田太郎'];
    }
    
    if (text.includes('化粧品メーカー') || text.includes('同業他社')) {
      extracted.kyougouNg = ['化粧品メーカー全般'];
    }
    
    if (text.includes('1年間') || text.includes('年間')) {
      const today = new Date();
      const nextYear = new Date(today);
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      extracted.keiyakuKaishiDate = today.toISOString().split('T')[0];
      extracted.keiyakuShuryoDate = nextYear.toISOString().split('T')[0];
    }
    
    if (text.includes('来年1月') || text.includes('1月')) {
      const nextYear = new Date().getFullYear() + 1;
      extracted.shokaiShutsuenbiDate = `${nextYear}-01-15`;
    }
    
    if (text.includes('テレビCM') || text.includes('テレビ')) {
      extracted.shutsuenryoTanka1Baitai = 'テレビCM';
    }
    if (text.includes('WEB広告') || text.includes('WEB')) {
      extracted.shutsuenryoTanka2Baitai = 'WEB広告';
    }
    
    return extracted;
  };

  // Convert AI extracted info to EigyoInfo partial
  const convertExtractedInfoToFormData = (info: ExtractedInfo): Partial<EigyoInfo> => {
    const converted: Partial<EigyoInfo> = {};
    
    if (info.koukokushu) converted.koukokushu = info.koukokushu;
    if (info.shohinService) converted.shohinService = info.shohinService;
    if (info.talent && info.talent.length > 0) converted.talent = info.talent;
    if (info.keiyakuryoDentsuToDce) converted.keiyakuryoDentsuToDce = info.keiyakuryoDentsuToDce;
    if (info.keiyakuKaishiDate) converted.keiyakuKaishiDate = info.keiyakuKaishiDate;
    if (info.keiyakuShuryoDate) converted.keiyakuShuryoDate = info.keiyakuShuryoDate;
    if (info.kyougouNg && info.kyougouNg.length > 0) converted.kyougouNg = info.kyougouNg;
    if (info.shokaiShutsuenbiDate) converted.shokaiShutsuenbiDate = info.shokaiShutsuenbiDate;
    if (info.shutsuenryoTanka1Baitai) converted.shutsuenryoTanka1Baitai = info.shutsuenryoTanka1Baitai;
    if (info.shutsuenryoTanka2Baitai) converted.shutsuenryoTanka2Baitai = info.shutsuenryoTanka2Baitai;
    if (info.gyomuNaiyo) converted.gyomuNaiyo = info.gyomuNaiyo;
    
    return converted;
  };

  // URLパラメータから音声データまたは文字起こしテキストを取得
  useEffect(() => {
    if (isInitialized) return;
    
    // New format: voiceData (contains both transcript and AI-extracted info)
    const voiceDataParam = searchParams.get('voiceData');
    if (voiceDataParam) {
      try {
        const decoded = decodeURIComponent(escape(atob(decodeURIComponent(voiceDataParam))));
        const voiceData: VoiceData = JSON.parse(decoded);
        
        setTranscriptText(voiceData.transcript);
        
        if (voiceData.extractedInfo) {
          setAiExtracted(voiceData.extractedInfo);
          const formUpdates = convertExtractedInfoToFormData(voiceData.extractedInfo);
          
          setFormData(prev => ({
            ...prev,
            ...formUpdates,
            gyomuNaiyo: voiceData.transcript, // Save original transcript
          }));
        } else {
          // No AI extraction, use legacy method
          const extractedInfo = extractInfoFromTranscript(voiceData.transcript);
          setFormData(prev => ({
            ...prev,
            ...extractedInfo,
            gyomuNaiyo: voiceData.transcript,
          }));
        }
        setIsInitialized(true);
        return;
      } catch (e) {
        console.error('Failed to decode voiceData:', e);
      }
    }
    
    // Legacy format: transcript (plain text only)
    const transcript = searchParams.get('transcript');
    if (transcript) {
      try {
        const decoded = decodeURIComponent(escape(atob(decodeURIComponent(transcript))));
        setTranscriptText(decoded);
        
        const extractedInfo = extractInfoFromTranscript(decoded);
        
        setFormData(prev => ({
          ...prev,
          ...extractedInfo,
          gyomuNaiyo: decoded,
        }));
        setIsInitialized(true);
      } catch (e) {
        console.error('Failed to decode transcript:', e);
        setIsInitialized(true);
      }
    } else {
      setIsInitialized(true);
    }
  }, [searchParams, isInitialized]);

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

  // Wait for initialization if voice data param exists
  const hasVoiceParam = searchParams.get('voiceData') || searchParams.get('transcript');
  if (hasVoiceParam && !isInitialized) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Header title="営業情報新規作成" showBack={true} />
        <Container maxWidth="md" sx={{ py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress />
          <Typography>音声データを解析中...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 10 }}>
      <Header title="営業情報新規作成" showBack={true} />
      
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Stack spacing={3}>
          {/* AI抽出結果アラート（新形式） */}
          <Collapse in={!!aiExtracted}>
            <Alert 
              severity="info" 
              icon={<SmartToyIcon />}
              sx={{ mb: 2, backgroundColor: '#e3f2fd' }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                🤖 AIが音声から情報を自動抽出しました
                {aiExtracted?.confidence && (
                  <Box component="span" sx={{ ml: 1, color: aiExtracted.confidence > 0.7 ? 'success.main' : 'warning.main' }}>
                    (信頼度: {Math.round(aiExtracted.confidence * 100)}%)
                  </Box>
                )}
              </Typography>
              <Typography variant="body2" component="div">
                以下のフィールドに自動入力されました：
                <Box component="ul" sx={{ m: 0, pl: 2, mt: 0.5 }}>
                  {formData.koukokushu && <li><strong>広告主:</strong> {formData.koukokushu}</li>}
                  {formData.shohinService && <li><strong>商品・サービス:</strong> {formData.shohinService}</li>}
                  {formData.talent && formData.talent.length > 0 && <li><strong>タレント:</strong> {formData.talent.join(', ')}</li>}
                  {formData.keiyakuryoDentsuToDce > 0 && <li><strong>契約料:</strong> {formData.keiyakuryoDentsuToDce.toLocaleString()}円</li>}
                  {formData.kyougouNg && formData.kyougouNg.length > 0 && <li><strong>競合NG:</strong> {formData.kyougouNg.join(', ')}</li>}
                  {formData.keiyakuKaishiDate && <li><strong>契約期間:</strong> {formData.keiyakuKaishiDate} 〜 {formData.keiyakuShuryoDate}</li>}
                  {formData.shokaiShutsuenbiDate && <li><strong>撮影予定:</strong> {formData.shokaiShutsuenbiDate}</li>}
                  {(formData.shutsuenryoTanka1Baitai || formData.shutsuenryoTanka2Baitai) && (
                    <li><strong>媒体:</strong> {[formData.shutsuenryoTanka1Baitai, formData.shutsuenryoTanka2Baitai].filter(Boolean).join(', ')}</li>
                  )}
                </Box>
                {aiExtracted?.summary && (
                  <Box sx={{ mt: 1, fontStyle: 'italic', color: 'text.secondary' }}>
                    💡 {aiExtracted.summary}
                  </Box>
                )}
                <Box sx={{ mt: 1, fontSize: '0.8rem', color: 'text.secondary' }}>
                  ※ 内容を確認・修正してから保存してください
                </Box>
              </Typography>
            </Alert>
          </Collapse>

          {/* 旧形式：音声文字起こしからの作成アラート */}
          <Collapse in={!!transcriptText && !aiExtracted}>
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
