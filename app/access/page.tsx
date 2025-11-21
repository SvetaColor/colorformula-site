'use client';

import { useEffect, useState } from 'react';

type Status = 'checking' | 'allowed' | 'denied' | 'noUser';

const activeUsers = ['vasya123', 'lena456', 'katya789'];

export default function AccessPage() {
  const [status, setStatus] = useState<Status>('checking');
  const [user, setUser] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Код выполняется только в браузере
    const params = new URLSearchParams(window.location.search);
    const u = params.get('user') || undefined;
    setUser(u);

    if (!u) {
      setStatus('noUser');
      return;
    }

    if (activeUsers.includes(u)) {
      setStatus('allowed');
    } else {
      setStatus('denied');
    }
  }, []);

  if (status === 'checking') {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Страница доступа</h1>
        <p>Проверяем доступ...</p>
      </div>
    );
  }

  if (status === 'noUser') {
    return (
      <div style={{ padding: '2рем' }}>
        <h1>Страница доступа</h1>
        <p>❌ Не указан ID пользователя в ссылке. Обратись к администратору за правильной ссылкой.</p>
      </div>
    );
  }

  if (status === 'denied') {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Страница доступа</h1>
        <p>❌ Подписка не активна или пользователь не найден.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Страница доступа</h1>
      <p>✅ Доступ разрешён для пользователя: {user}</p>
    </div>
  );
}
