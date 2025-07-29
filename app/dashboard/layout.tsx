import { ReactNode } from 'react';
import TenantBoundary from '../../components/TenantBoundary';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <TenantBoundary>
      {children}
    </TenantBoundary>
  );
}
