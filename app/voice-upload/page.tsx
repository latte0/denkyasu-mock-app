'use client';

import { useState, useCallback, useRef } from 'react';
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
  Alert,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import BusinessIcon from '@mui/icons-material/Business';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Header from '@/components/Header';

// Types for API responses
interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

interface TranscribeResponse {
  text: string;
  segments: TranscriptSegment[];
  duration: number;
}

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

// Format seconds to MM:SS
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function VoiceUploadPage() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [editableText, setEditableText] = useState('');
  const [segments, setSegments] = useState<TranscriptSegment[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState<ExtractedInfo | null>(null);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = async (file: File) => {
    // Reset state
    setError(null);
    setShowTranscript(false);
    setExtractedInfo(null);
    setSegments([]);
    
    // Validate file type
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/m4a', 'audio/x-m4a', 'audio/webm'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|m4a|webm)$/i)) {
      setError('対応している音声ファイル形式: mp3, wav, m4a, webm');
      return;
    }

    // Validate file size (25MB max for OpenAI)
    const maxSize = 25 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('ファイルサイズが大きすぎます。25MB以下のファイルをアップロードしてください。');
      return;
    }

    setUploadedFile(file);
    setIsProcessing(true);
    setProcessingStatus('音声ファイルをアップロード中...');

    // Create audio URL for playback
    const url = URL.createObjectURL(file);
    setAudioUrl(url);

    try {
      // Call transcribe API
      setProcessingStatus('Whisper APIで文字起こし中...');
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '文字起こしに失敗しました');
      }

      const data: TranscribeResponse = await response.json();
      
      setSegments(data.segments);
      setDuration(data.duration);
      
      // Format text with timestamps for editing
      const formattedText = data.segments.length > 0
        ? data.segments.map(seg => `[${formatTime(seg.start)}] ${seg.text}`).join('\n')
        : data.text;
      
      setEditableText(formattedText);
      setShowTranscript(true);
      setProcessingStatus('');
    } catch (err) {
      console.error('Transcription error:', err);
      setError(err instanceof Error ? err.message : '文字起こしに失敗しました');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExtractInfo = async () => {
    if (!editableText.trim()) {
      setError('文字起こしテキストがありません');
      return;
    }

    setIsExtracting(true);
    setError(null);

    try {
      const response = await fetch('/api/extract-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: editableText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '情報抽出に失敗しました');
      }

      const data: ExtractedInfo = await response.json();
      setExtractedInfo(data);
    } catch (err) {
      console.error('Extraction error:', err);
      setError(err instanceof Error ? err.message : '情報抽出に失敗しました');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleCreateTask = () => {
    // Encode both transcript and extracted info
    const dataToPass = {
      transcript: editableText,
      extractedInfo: extractedInfo,
    };
    const encodedData = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(dataToPass)))));
    router.push(`/eigyo/new?voiceData=${encodedData}`);
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', pb: 4 }}>
      <Header title="音声アップロード" showBack={true} />
      
      {/* Hidden audio element for playback */}
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onEnded={() => setIsPlaying(false)}
        />
      )}
      
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Stack spacing={3}>
          {/* Error Alert */}
          {error && (
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

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
                  accept=".mp3,.wav,.m4a,.webm,audio/*"
                  hidden
                  onChange={handleFileSelect}
                />
                <CloudUploadIcon sx={{ fontSize: 64, color: isDragging ? 'primary.main' : 'grey.500', mb: 2 }} />
                <Typography variant="h6" color={isDragging ? 'primary.main' : 'text.secondary'} gutterBottom>
                  ドラッグ＆ドロップ または クリックして選択
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  対応形式: MP3, WAV, M4A, WebM（最大25MB）
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
                        {formatFileSize(uploadedFile.size)}
                        {duration > 0 && ` • ${formatTime(duration)}`}
                      </Typography>
                    </Box>
                    {audioUrl && (
                      <Chip
                        icon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        label={isPlaying ? '一時停止' : '再生'}
                        variant="outlined"
                        onClick={handlePlayPause}
                        sx={{ cursor: 'pointer' }}
                      />
                    )}
                  </Box>
                  
                  {isProcessing && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {processingStatus}
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
                  {segments.length > 0 && (
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        maxHeight: 300, 
                        overflow: 'auto',
                        backgroundColor: '#fafafa',
                        mb: 3,
                      }}
                    >
                      <Stack spacing={1.5}>
                        {segments.map((item, index) => (
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
                              label={formatTime(item.start)}
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
                  )}

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

                  {/* AI情報抽出ボタン */}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={isExtracting ? <CircularProgress size={20} /> : <AutoFixHighIcon />}
                      onClick={handleExtractInfo}
                      disabled={isExtracting}
                      fullWidth
                    >
                      {isExtracting ? 'AIが情報を抽出中...' : 'AIで営業情報を自動抽出'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          )}

          {/* 抽出結果表示 */}
          {extractedInfo && (
            <Fade in={true}>
              <Card sx={{ backgroundColor: '#e3f2fd' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    🤖 AI抽出結果
                    {extractedInfo.confidence && (
                      <Chip 
                        label={`信頼度: ${Math.round(extractedInfo.confidence * 100)}%`}
                        size="small"
                        color={extractedInfo.confidence > 0.7 ? 'success' : 'warning'}
                        sx={{ ml: 2 }}
                      />
                    )}
                  </Typography>
                  
                  <Stack spacing={1}>
                    {extractedInfo.koukokushu && (
                      <Typography variant="body2">
                        <strong>広告主:</strong> {extractedInfo.koukokushu}
                      </Typography>
                    )}
                    {extractedInfo.shohinService && (
                      <Typography variant="body2">
                        <strong>商品・サービス:</strong> {extractedInfo.shohinService}
                      </Typography>
                    )}
                    {extractedInfo.talent && extractedInfo.talent.length > 0 && (
                      <Typography variant="body2">
                        <strong>タレント:</strong> {extractedInfo.talent.join(', ')}
                      </Typography>
                    )}
                    {extractedInfo.keiyakuryoDentsuToDce && (
                      <Typography variant="body2">
                        <strong>予算:</strong> {extractedInfo.keiyakuryoDentsuToDce.toLocaleString()}円
                      </Typography>
                    )}
                    {extractedInfo.shutsuenryoTanka1Baitai && (
                      <Typography variant="body2">
                        <strong>媒体:</strong> {[extractedInfo.shutsuenryoTanka1Baitai, extractedInfo.shutsuenryoTanka2Baitai].filter(Boolean).join(', ')}
                      </Typography>
                    )}
                    {extractedInfo.kyougouNg && extractedInfo.kyougouNg.length > 0 && (
                      <Typography variant="body2">
                        <strong>競合NG:</strong> {extractedInfo.kyougouNg.join(', ')}
                      </Typography>
                    )}
                    {extractedInfo.shokaiShutsuenbiDate && (
                      <Typography variant="body2">
                        <strong>撮影予定:</strong> {extractedInfo.shokaiShutsuenbiDate}
                      </Typography>
                    )}
                    {extractedInfo.summary && (
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: 'text.secondary' }}>
                        {extractedInfo.summary}
                      </Typography>
                    )}
                  </Stack>
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
