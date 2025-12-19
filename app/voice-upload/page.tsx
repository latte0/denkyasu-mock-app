'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Paper,
  TextField,
  Chip,
  LinearProgress,
  Fade,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BusinessIcon from '@mui/icons-material/Business';
import Header from '@/components/Header';

// モック文字起こしデータ（営業シーンを想定）
const mockTranscript = [
  { time: '00:00', text: 'お世話になっております。〇〇株式会社の山田です。' },
  { time: '00:05', text: '本日はタレント起用の件でご連絡いたしました。' },
  { time: '00:12', text: 'はい、お電話ありがとうございます。担当の佐藤です。' },
  { time: '00:18', text: '新商品のCMに関して、タレントさんの起用を検討しておりまして。' },
  { time: '00:28', text: 'なるほど、どのような商品でしょうか？' },
  { time: '00:33', text: '化粧品の新ブランドになります。ターゲットは20代〜30代の女性です。' },
  { time: '00:42', text: '承知しました。ご予算感はいかがでしょうか？' },
  { time: '00:48', text: '契約料として5000万円程度を想定しています。' },
  { time: '00:55', text: '使用期間は1年間、媒体はテレビCMとWEB広告を予定しています。' },
  { time: '01:05', text: 'わかりました。競合NGの範囲はどのようにお考えですか？' },
  { time: '01:12', text: '同業他社、つまり化粧品メーカー全般でお願いしたいです。' },
  { time: '01:20', text: '承知しました。候補のタレントさんはお決まりですか？' },
  { time: '01:28', text: 'はい、第一候補として〇〇さんを考えています。' },
  { time: '01:35', text: '〇〇さんですね。現在のスケジュールを確認いたします。' },
  { time: '01:42', text: '撮影は来年1月頃を予定しています。' },
  { time: '01:48', text: 'かしこまりました。確認して折り返しご連絡いたします。' },
  { time: '01:55', text: 'よろしくお願いいたします。' },
  { time: '02:00', text: 'それでは失礼いたします。' },
];

export default function VoiceUploadPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [editableText, setEditableText] = useState('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    // 音声ファイルかチェック
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/m4a', 'audio/x-m4a'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|m4a)$/i)) {
      alert('対応している音声ファイル形式: mp3, wav, m4a');
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);
    
    // モック処理（2秒後に文字起こし表示）
    setTimeout(() => {
      setIsProcessing(false);
      setShowTranscript(true);
      // 編集用テキストを生成
      const fullText = mockTranscript.map(t => `[${t.time}] ${t.text}`).join('\n');
      setEditableText(fullText);
    }, 2000);
  };

  const handleCreateTask = () => {
    // テキストをBase64エンコードしてURLパラメータに渡す
    const encodedText = encodeURIComponent(btoa(unescape(encodeURIComponent(editableText))));
    router.push(`/eigyo/new?transcript=${encodedText}`);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 4 }}>
      <Header title="音声アップロード" showBack={true} />
      
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Stack spacing={3}>
          {/* アップロードエリア */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                音声ファイルをアップロード
              </Typography>
              
              <Paper
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  border: '2px dashed',
                  borderColor: isDragging ? 'primary.main' : 'grey.400',
                  backgroundColor: isDragging ? 'primary.50' : 'grey.50',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 200,
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'primary.50',
                  },
                }}
                component="label"
              >
                <input
                  type="file"
                  accept=".mp3,.wav,.m4a,audio/*"
                  hidden
                  onChange={handleFileSelect}
                />
                <CloudUploadIcon sx={{ fontSize: 64, color: isDragging ? 'primary.main' : 'grey.500', mb: 2 }} />
                <Typography variant="h6" color={isDragging ? 'primary.main' : 'text.secondary'} gutterBottom>
                  ドラッグ＆ドロップ または クリックして選択
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  対応形式: MP3, WAV, M4A
                </Typography>
              </Paper>
            </CardContent>
          </Card>

          {/* アップロード済みファイル情報 */}
          {uploadedFile && (
            <Fade in={true}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AudioFileIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {uploadedFile.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatFileSize(uploadedFile.size)} • 約2分00秒（モック）
                      </Typography>
                    </Box>
                    <Chip
                      icon={<PlayArrowIcon />}
                      label="再生"
                      variant="outlined"
                      onClick={() => {}}
                      sx={{ cursor: 'pointer' }}
                    />
                  </Box>
                  
                  {isProcessing && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        文字起こし処理中...
                      </Typography>
                      <LinearProgress />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Fade>
          )}

          {/* 文字起こし結果 */}
          {showTranscript && (
            <Fade in={true}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    📝 文字起こし結果
                  </Typography>
                  
                  {/* タイムスタンプ付き表示 */}
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      maxHeight: 400, 
                      overflow: 'auto',
                      backgroundColor: '#fafafa',
                      mb: 3,
                    }}
                  >
                    <Stack spacing={1.5}>
                      {mockTranscript.map((item, index) => (
                        <Box 
                          key={index} 
                          sx={{ 
                            display: 'flex', 
                            gap: 2,
                            '&:hover': {
                              backgroundColor: 'rgba(25, 118, 210, 0.08)',
                              borderRadius: 1,
                            },
                            p: 0.5,
                            transition: 'background-color 0.2s',
                          }}
                        >
                          <Chip
                            label={item.time}
                            size="small"
                            variant="outlined"
                            sx={{ 
                              minWidth: 60,
                              fontFamily: 'monospace',
                              fontSize: '0.75rem',
                            }}
                          />
                          <Typography variant="body2" sx={{ flex: 1, lineHeight: 1.8 }}>
                            {item.text}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>

                  {/* 編集可能テキストエリア */}
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    ✏️ テキスト編集（必要に応じて修正できます）
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    value={editableText}
                    onChange={(e) => setEditableText(e.target.value)}
                    size="small"
                    sx={{
                      '& .MuiInputBase-input': {
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        lineHeight: 1.8,
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Fade>
          )}

          {/* 営業タスク作成ボタン */}
          {showTranscript && (
            <Fade in={true}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<BusinessIcon />}
                onClick={handleCreateTask}
                sx={{
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  },
                }}
              >
                この情報で新規 営業タスクを作成
              </Button>
            </Fade>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

