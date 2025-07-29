1. **Subdomain (tenant) enforcement via middleware**: Create or update `middleware.ts` at the project root to extract the tenant from the `Host` header for all `/dashboard/*` and `/api/*` requests, blocking or redirecting requests that lack a valid tenant subdomain.

2. **Tenant isolation in layout**: Wrap all dashboard pages in a custom `TenantBoundary` (in `app/dashboard/layout.tsx`) to provide a clear context per tenant and catch component errors.

3. **Tenant context in boundary**: Implement `components/TenantBoundary.tsx` to extract tenant from the browser at runtime, render an error if missing, and wrap children with an error boundary.

4. **Tenant-aware error boundaries**: Implement `components/error-boundary.tsx` as a React error boundary, rendering a fallback UI if child widgets/errors bubble up, preventing blank pages and catching widget/render errors.

5. **Dynamic sensitive widgets**: In `app/dashboard/page.tsx`, use `next/dynamic` and Suspense to load analytics widgets, only loading "sensitive" widgets for authorized users (based on their role), and make SEO metadata generation tenant-aware.

6. **Widget implementation**:
    - `widgets/SensitiveAnalyticsWidget.tsx`: Fetch sensitive analytics data only for admin, show loading/error as needed.
    - `widgets/GeneralAnalyticsWidget.tsx`: Fetch general analytics data for everyone.

7. **Role utility**: Implement `utils/withUserRole.ts` to extract role from a cookie (mocked for this exercise).

8. **API routes - tenant/role checking**: API route files in `pages/api/analytics/*` must extract the tenant from the host and require it for all data access. Sensitive endpoints require role=admin (from cookies). Move host and context checking logic into a utility `utils/tenant-utils.ts` for DRYness.

9. **Error/SEO handling**: App Router dashboard/layout/page uses tenant context to generate unique metadata; error fallbacks ensure errors or bad navigation never cause blank pages.

10. **Missing tenant error route**: Add `app/missing-tenant/page.tsx` for the middleware to redirect if a page/API route is accessed without tenant context.

11. **Docker readiness**: Structure uses only base Next.js APIs, fully SSR/CSR compatible and robust to host rewrites in containers.