import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Helper to get the tenant from the host (via subdomain)
function extractTenantFromHost(host?: string) {
  if (!host) return null;
  // Assuming domains like tenant1.example.com
  const [sub, ...rest] = host.split('.');
  // For production, check for valid host naming
  if (rest.length < 2) return null;
  // Disallow www/empty or "app" as tenant: could be changed to a list
  if (sub === 'www' || sub === 'app' || !sub) return null;
  return sub;
}

export function middleware(request: NextRequest) {
  const { nextUrl, headers, cookies } = request;
  const host = headers.get('host') ?? '';
  const tenant = extractTenantFromHost(host);
  const dashboardPath = nextUrl.pathname.startsWith('/dashboard');

  // Block all dashboard/data pages if tenant is missing or mismatched
  if (dashboardPath || nextUrl.pathname.startsWith('/api')) {
    // For internal requests (like from browser) tenant is required
    if (!tenant) {
      // Redirect to custom error page (could be /404 or /missing-tenant)
      return NextResponse.redirect(new URL('/missing-tenant', nextUrl));
    }

    // Optionally, validate if tenant exists in system here with a DB/API hit
    // For the exercise, we assume it is valid if it's present
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
