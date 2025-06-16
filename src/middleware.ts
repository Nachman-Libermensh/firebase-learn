// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // אפשר כאן לבדוק חתימה אם אתה משתמש ב-Firebase Admin
  return NextResponse.next();
}

// אילו נתיבים להגן עליהם
export const config = {
  matcher: ['/'], // למשל כל מה שקשור לדשבורד
};
