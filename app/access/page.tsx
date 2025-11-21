'use client';

import { useEffect, useState } from 'react';

type Status = 'checking' | 'allowed' | 'denied' | 'noUser';

type Client = {
  id: string;      // ID клиента для ссылки (?user=...)
  name: string;    // Имя клиента (для тебя, можно по-русски)
  active: boolean; // true — подписка активна, false — отключена
};

// 💾 "Таблица" клиентов
const clients: Client[] = [
  { id: 'vasya123', name: 'Вася', active: true },
  { id: 'lena456', name: 'Лена', active: true },
  { id: 'katya789', name: 'Катя', active: true },
  { id: 'anna', name: 'Анна', active: true },
];

export default function AccessPage() {
  const [status, setStatus] = useState<Status>('checking');
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user');

    if (!user) {
      setStatus('noUser');
      return;
    }

    const found = clients.find((c) => c.id === user);

    if (!found) {
      setClient(null);
      setStatus('denied');
      return;
    }

    setClient(found);

    if (found.active) {
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
      <div style={{ padding: '2rem' }}>
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
      <p>✅ Доступ разрешён для клиента: {client?.name} (ID: {client?.id})</p>
    </div>
  );
}


