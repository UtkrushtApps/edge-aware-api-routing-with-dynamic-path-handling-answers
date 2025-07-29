import { ReactNode, useMemo } from 'react';
import ErrorBoundary from './error-boundary';

function getTenantFromHostname(): string | null {
  if (typeof window === 'undefined') return null;
  const [tenant] = window.location.hostname.split('.');
  // Ignore non-tenant values (for this exercise, just basic check)
  if (!tenant || tenant === 'www' || tenant === 'app') return null;
  return tenant;
}

// A boundary to provide tenant context and catch any errors
export default function TenantBoundary({ children }: { children: ReactNode }) {
  const tenant = useMemo(getTenantFromHostname, []);

  if (!tenant) {
    return <div>Tenant context missing or invalid</div>;
  }
  return (
    <ErrorBoundary>
      {/* Could provide tenant context here with React Context if needed */}
      {children}
    </ErrorBoundary>
  );
}
