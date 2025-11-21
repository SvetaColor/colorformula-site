'use client';

import { useEffect, useState } from 'react';

type Status = 'checking' | 'allowed' | 'denied' | 'noUser';

type Client = {
  id: string;      // ID клиента в ссылке
  name: string;    // Имя клиента
  active: boolean; // Есть ли активная подписка
};

// 💾 Таблица клиентов
const clients: Client[] = [
  { id: 'vasya123', name: 'Вася', active: true },
  { id: 'lena456', name: 'Лена', active: true },
  { id: 'katya789', name: 'Катя', active: true },
  { id: 'anna', name: 'Анна', active: false }, // пример отключённой подписки
];

export default function AccessPage() {
  const [status, setStatus] = useState<Status>('checking');
  const [client, setClient] = useState<Client | null>(null);

  // Состояния для GPT
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Проверяем доступ по ?user=...
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

  async function handleAsk() {
    setError(null);
    setAnswer(null);

    if (!message.trim()) {
      setError('Сначала напишите запрос для помощника.');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Ошибка запроса к GPT');
      }

      const data = await res.json();
      setAnswer(data.reply || 'Пустой ответ от модели.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Произошла ошибка.');
    } finally {
      setLoading(false);
    }
  }

  // Разные состояния доступа

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
        <p>❌ Не указан ID пользователя в ссылке.</p>
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

  // Если статус allowed — показываем GPT-помощника
  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h1>ColorFormula — доступ к помощнику</h1>
      <p>
        ✅ Доступ разрешён для клиента: <b>{client?.name}</b> (ID: {client?.id})
      </p>

      <hr style={{ margin: '1.5rem 0' }} />

      <h2>GPT-помощник колориста</h2>
      <p style={{ marginBottom: '0.5rem' }}>
        Опишите исходные данные: цвет, фон осветления, желаемый результат, историю окрашивания и т.д.
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: 8,
          border: '1px solid #ccc',
          marginBottom: '0.75rem',
          fontFamily: 'inherit',
        }}
        placeholder="Например: клиентка с натуральной базой 6.0, ранее осветлялась до 9 уровня, есть желтизна..."
      />

      <div style={{ marginBottom: '0.75rem' }}>
        <button
          onClick={handleAsk}
          disabled={loading}
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: 999,
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {loading ? 'Запрашиваем GPT…' : 'Отправить запрос'}
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: '0.75rem', color: 'red' }}>
          ⚠️ {error}
        </div>
      )}

      {answer && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: 8,
            border: '1px solid #ddd',
            background: '#fafafa',
            whiteSpace: 'pre-wrap',
          }}
        >
          <b>Ответ помощника:</b>
          <div style={{ marginTop: '0.5rem' }}>{answer}</div>
        </div>
      )}
    </div>
  );
}
