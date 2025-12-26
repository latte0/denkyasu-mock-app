import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Lazy-initialize OpenAI client to avoid build-time errors
let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
  }
  return openaiClient;
}

// Supported audio formats
const SUPPORTED_FORMATS = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/m4a', 'audio/x-m4a', 'audio/webm'];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB (OpenAI limit)

export interface TranscribeResponse {
  text: string;
  segments: Array<{
    start: number;
    end: number;
    text: string;
  }>;
  duration: number;
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please set OPENAI_API_KEY in .env.local' },
        { status: 500 }
      );
    }

    // Parse the multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided. Please upload an audio file.' },
        { status: 400 }
      );
    }

    // Validate file type
    const isValidType = SUPPORTED_FORMATS.includes(file.type) || 
                        file.name.match(/\.(mp3|wav|m4a|webm)$/i);
    if (!isValidType) {
      return NextResponse.json(
        { error: `Unsupported file format: ${file.type}. Supported formats: mp3, wav, m4a, webm` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    console.log(`📤 Transcribing file: ${file.name} (${(file.size / 1024).toFixed(1)}KB)`);

    // Call OpenAI Whisper API with verbose JSON for segments
    const openai = getOpenAI();
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      language: 'ja', // Japanese
      response_format: 'verbose_json',
      timestamp_granularities: ['segment'],
    });

    console.log('✅ Transcription completed');

    // Format the response
    const response: TranscribeResponse = {
      text: transcription.text,
      segments: (transcription.segments || []).map((seg) => ({
        start: seg.start,
        end: seg.end,
        text: seg.text,
      })),
      duration: transcription.duration || 0,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Transcription error:', error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred during transcription' },
      { status: 500 }
    );
  }
}

