import type { NextApiRequest, NextApiResponse } from 'next';
import { extractTenantFromHost, validateTenantContext } from '../../../utils/tenant-utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const tenant = extractTenantFromHost(req.headers.host || '');
  if (!validateTenantContext(req, tenant)) {
    res.status(403).json({ error: 'Invalid tenant context' });
    return;
  }
  // Just fake some data
  res.json({ usersToday: 145 });
}
