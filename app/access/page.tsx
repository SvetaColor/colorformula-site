
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AccessPage() {
  const searchParams = useSearchParams();
  const user = searchParams.get('user');
  const [status, setStatus] = useState<'checking' | 'allowed' | 'denied'>('checking');

  useEffect(() => {
    async function checkAccess() {
      if (!user) {
        setStatus('denied');
        return;
      }

      const res = await fetch(`/api/check?user=${user}`);
      const data = await res.json();
      setStatus(data.access ? 'allowed' : 'denied');
    }

    checkAccess();
  }, [user]);

  if (status === 'checking') {
    return <p style={{ padding: '2rem' }}>Проверка доступа...</p>;
  }

  if (status === 'denied') {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Нет доступа</h1>
        <p>Ваша подписка неактивна или ID не указан.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Доступ разрешён</h1>
      <p>Добро пожаловать, у вас есть активная подписка.</p>
    </div>
  );
}
