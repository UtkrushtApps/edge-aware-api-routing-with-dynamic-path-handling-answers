import { useEffect, useState } from 'react';
import withUserRole from '../utils/withUserRole';

export default function SensitiveAnalyticsWidget() {
  const [data, setData] = useState<any>(null);
  const role = withUserRole();

  useEffect(() => {
    if (role !== 'admin') {
      setData(null);
      return;
    }
    // Fetch admin analytics data
    fetch('/api/analytics/sensitive')
      .then(res => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, [role]);

  if (role !== 'admin') return <div>No access to this widget.</div>;
  if (!data) return <div>Loading sensitive analytics...</div>;

  return <div>Secret Revenue: {data.revenue}</div>;
}
