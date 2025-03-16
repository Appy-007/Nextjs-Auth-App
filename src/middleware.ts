import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path=request.nextUrl.pathname
    const isPublicpath= path==='/login' || path ==='/signup' || path ==='/verifyemail' || path==='/forgotPassword' || path === '/resetpassword'
    const token=request.cookies.get('token')?.value || ''

    if(!isPublicpath && !token){
        return NextResponse.redirect(new URL('/login',request.url))
    }
    if(isPublicpath && token){
        return NextResponse.redirect(new URL('/profile',request.url))
    }


  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/profile/:path*',
    '/verifyemail',
    '/forgotPassword',
    '/resetpassword',

  ],
}