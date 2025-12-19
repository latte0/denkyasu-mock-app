import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ローカル環境など、ENABLE_BASIC_AUTH が true でなければスキップ
  if (process.env.ENABLE_BASIC_AUTH !== 'true') {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  const encoded = authHeader.split(' ')[1];
  const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
  const [user, password] = decoded.split(':');

  if (user !== process.env.BASIC_AUTH_USER || password !== process.env.BASIC_AUTH_PASSWORD) {
    return new NextResponse('Invalid credentials', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

