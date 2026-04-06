import { useEffect, useState } from 'react';
import { fetchTransactions } from '../api/transactionService';

export function DebugApi() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This perfectly mimics visiting a real API endpoint!
    fetchTransactions().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', fontFamily: 'monospace' }}>Calling Mock API... (Simulating 500ms network delay)</div>;
  }

  // Renders the data as plain text JSON exactly matching backend behavior
  return (
    <div style={{ padding: '2rem', background: '#0a0a0a', minHeight: '100vh', color: '#00ff00' }}>
      <h2 style={{ color: 'white', marginBottom: '1rem' }}>Debug Mock API Response:</h2>
      <pre style={{ overflowX: 'auto', fontSize: '14px' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
