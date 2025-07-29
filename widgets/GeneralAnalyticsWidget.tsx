import { useEffect, useState } from 'react';

export default function GeneralAnalyticsWidget() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch('/api/analytics/general')
      .then(res => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  if (!data) return <div>Loading analytics...</div>;
  return <div>Users Today: {data.usersToday}</div>;
}
