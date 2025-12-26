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

// Extracted info structure matching EigyoInfo fields
export interface ExtractedInfo {
  // 基本情報
  koukokushu?: string;          // 広告主（会社名）
  shohinService?: string;       // 商品・サービス
  talent?: string[];            // タレント名
  
  // 契約情報
  keiyakuryoDentsuToDce?: number;  // 契約料（予算）
  keiyakuKaishiDate?: string;      // 契約開始日
  keiyakuShuryoDate?: string;      // 契約終了日
  
  // 競合情報
  kyougouNg?: string[];         // 競合NG
  
  // 撮影情報
  shokaiShutsuenbiDate?: string;   // 初回出演日/撮影予定日
  
  // 媒体情報
  shutsuenryoTanka1Baitai?: string;  // 使用媒体1
  shutsuenryoTanka2Baitai?: string;  // 使用媒体2
  
  // その他
  gyomuNaiyo?: string;          // 業務内容（元のテキスト）
  summary?: string;             // 要約
  
  // メタ情報
  confidence?: number;          // 抽出の信頼度 (0-1)
}

const EXTRACTION_PROMPT = `
あなたは営業通話の文字起こしから、タレント起用案件に関する情報を抽出するアシスタントです。
以下のJSON形式で情報を抽出してください。見つからない情報はnullとしてください。

抽出する情報:
- koukokushu: 広告主（クライアント企業名）
- shohinService: 商品・サービス名
- talent: タレント名（配列で）
- keiyakuryoDentsuToDce: 契約料/予算（数値、万円単位を円に変換。例: 5000万円 → 50000000）
- keiyakuKaishiDate: 契約開始日（YYYY-MM-DD形式）
- keiyakuShuryoDate: 契約終了日（YYYY-MM-DD形式）
- kyougouNg: 競合NG範囲（配列で）
- shokaiShutsuenbiDate: 撮影予定日/初回出演日（YYYY-MM-DD形式）
- shutsuenryoTanka1Baitai: 使用媒体1（例: テレビCM）
- shutsuenryoTanka2Baitai: 使用媒体2（例: WEB広告）
- summary: 案件の要約（1-2文で）
- confidence: 抽出の信頼度（0-1の数値）

注意事項:
- 日付が「来年1月」のような相対表現の場合は、現在の日付を基準に絶対日付に変換してください
- 金額は必ず円単位の数値に変換してください
- 不明確な情報は無理に抽出せず、nullとしてください
- confidence は情報の確実性に基づいて設定してください

JSONのみを出力してください。説明は不要です。
`;

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured. Please set OPENAI_API_KEY in .env.local' },
        { status: 500 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { transcript } = body;

    if (!transcript || typeof transcript !== 'string') {
      return NextResponse.json(
        { error: 'No transcript provided. Please provide a transcript text.' },
        { status: 400 }
      );
    }

    if (transcript.length > 50000) {
      return NextResponse.json(
        { error: 'Transcript too long. Maximum length is 50,000 characters.' },
        { status: 400 }
      );
    }

    console.log(`🔍 Extracting info from transcript (${transcript.length} chars)`);

    // Get current date for relative date calculations
    const today = new Date();
    const currentDateInfo = `現在の日付: ${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

    // Call OpenAI GPT-4 for extraction
    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: EXTRACTION_PROMPT,
        },
        {
          role: 'user',
          content: `${currentDateInfo}\n\n文字起こしテキスト:\n${transcript}`,
        },
      ],
      temperature: 0.1, // Low temperature for consistent extraction
      response_format: { type: 'json_object' },
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      return NextResponse.json(
        { error: 'No response from AI model' },
        { status: 500 }
      );
    }

    console.log('✅ Extraction completed');

    // Parse the JSON response
    let extractedInfo: ExtractedInfo;
    try {
      extractedInfo = JSON.parse(responseText);
    } catch {
      console.error('Failed to parse AI response:', responseText);
      return NextResponse.json(
        { error: 'Failed to parse extraction results' },
        { status: 500 }
      );
    }

    // Add the original transcript as gyomuNaiyo
    extractedInfo.gyomuNaiyo = transcript;

    return NextResponse.json(extractedInfo);
  } catch (error) {
    console.error('❌ Extraction error:', error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred during extraction' },
      { status: 500 }
    );
  }
}

