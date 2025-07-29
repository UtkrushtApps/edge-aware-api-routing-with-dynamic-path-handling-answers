import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SensitiveWidget = dynamic(() => import('../../widgets/SensitiveAnalyticsWidget'), {
  ssr: false
});
const NonSensitiveWidget = dynamic(() => import('../../widgets/GeneralAnalyticsWidget'), {
  ssr: false
});

import withUserRole from '../../utils/withUserRole';

export const metadata = async () => {
  // Generate unique SEO meta per tenant, using host context
  // In real app, fetch data but here just mock
  // Next.js App Router allows async metadata
  // Note: For Docker-friendliness, avoid outside calls
  return {
    title: 'Tenant Dashboard',
    description: 'Dashboard for the current organization',
  };
};

export default function DashboardPage() {
  // Assume we determine role (in real setups via props/cookies/session)
  const role = withUserRole();
  return (
    <>
      <h1>Tenant Dashboard</h1>
      <Suspense fallback={<div>Loading widgets...</div>}>
        <NonSensitiveWidget />
        {role === 'admin' && <SensitiveWidget />}
      </Suspense>
    </>
  );
}
