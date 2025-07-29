import type { NextApiRequest, NextApiResponse } from 'next';
import { extractTenantFromHost, validateTenantContext } from '../../../utils/tenant-utils';

function getUserRole(req: NextApiRequest) {
  // For this exercise: cookie 'role=admin' gives admin
  const m = req.headers.cookie?.match(/role=([^;]+)/);
  return m ? m[1] : 'user';
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const tenant = extractTenantFromHost(req.headers.host || '');
  if (!validateTenantContext(req, tenant)) {
    res.status(403).json({ error: 'Invalid tenant context' });
    return;
  }
  if (getUserRole(req) !== 'admin') {
    res.status(403).json({ error: 'Forbidden: admin only' });
    return;
  }
  res.json({ revenue: '$10,000' });
}
