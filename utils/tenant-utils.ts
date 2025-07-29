import type { NextApiRequest } from 'next';

export function extractTenantFromHost(host: string): string | null {
  if (!host) return null;
  const [sub, ...rest] = host.split('.');
  if (rest.length < 2) return null;
  if (sub === 'www' || sub === 'app' || !sub) return null;
  return sub;
}

export function validateTenantContext(req: NextApiRequest, tenant: string | null): boolean {
  // In reality, you could check against DB or session user. For this, if tenant present, OK.
  if (!tenant) return false;
  // Optionally, check if user allowed under this tenant (omitted for brevity)
  return true;
}
