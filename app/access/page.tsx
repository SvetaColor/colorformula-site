'use client';

import React, { useEffect, useState, useRef } from 'react';

type Status = 'checking' | 'allowed' | 'denied' | 'noUser';

type Client = {
  id: string;      // ID клиента в ссылке
  name: string;    // Имя клиента
  active: boolean; // Есть ли активная подписка
};

// 💾 Таблица клиентов
const clients: Client[] = [
  { id: 'Vasya123', name: 'Вася', active: true },
  { id: 'katya789', name: 'Катя', active: true },
  { id: 'anna', name: 'Анна', active: false }, // пример отключённой подписки
];

export default function AccessPage() {
  const [status, setStatus] = useState<Status>('checking');
  const [client, setClient] = useState<Client | null>(null);

  // Состояния для ИИ-помощника
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ref для textarea — чтобы фокусировать при "дописать"
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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
      setError('Сначала напиши запрос для ИИ-помощника.');
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
        throw new Error(data?.error || 'Ошибка запроса к ИИ-помощнику');
      }

      const data = await res.json();
      setAnswer(data.reply || 'Пустой ответ от ИИ-помощника.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Произошла ошибка.');
    } finally {
      setLoading(false);
    }
  }

  function handleFocusForFollowUp() {
    if (textareaRef.current) {
      const el = textareaRef.current;
      el.focus();
      const len = el.value.length;
      el.setSelectionRange(len, len);
    }
  }

  // ——— UI-состояния доступа ———

  if (status === 'checking') {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Страница доступа</h1>
          <p style={styles.subtitle}>Проверяем доступ...</p>
        </div>
      </div>
    );
  }

  if (status === 'noUser') {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Страница доступа</h1>
          <p style={styles.errorText}>
            ❌ Не указан ID пользователя в ссылке. Обратись к администратору за правильной ссылкой.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'denied') {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>Страница доступа</h1>
          <p style={styles.errorText}>
            ❌ Подписка не активна или пользователь не найден.
          </p>
        </div>
      </div>
    );
  }

  // ——— Если статус allowed — показываем ИИ-помощника ———

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>ColorFormula — доступ к ИИ-помощнику</h1>
        <p style={styles.subtitle}>
          ✅ Доступ разрешён для клиента: <b>{client?.name}</b> (ID: {client?.id})
        </p>

        <div style={styles.separator} />

        <h2 style={styles.sectionTitle}>ИИ-помощник колориста</h2>
        <p style={styles.helperText}>
          Чтобы ответ был максимально точным, напиши, пожалуйста: натуральную базу (уровень/фон),
          историю окрашиваний/смывок, % седины и где она расположена, состояние/пористость,
          желаемый результат (УГТ/оттенок/температура), бренд/линейку (если важно).
        </p>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          style={styles.textarea}
          placeholder="Пример: натуральная база 6.0 (тёплый фон), ранее осветлялась до 9 уровня, есть жёлто-оранжевая теплота, волосы пористые, 30% седины по пробору, хотим холодный 9 ряд без затемнения, работаю Estel / Matrix..."
        />

        <div
          style={{
            marginBottom: '0.75rem',
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={handleAsk}
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? 'Запрашиваем ИИ-помощника…' : 'Отправить запрос'}
          </button>

          <button
            type="button"
            onClick={handleFocusForFollowUp}
            style={styles.secondaryButton}
          >
            Дописать / задать ещё вопрос
          </button>
        </div>

        {error && <div style={styles.errorBox}>⚠️ {error}</div>}

        {answer && (
          <div style={styles.answerBox}>
            <b style={{ display: 'block', marginBottom: '0.5rem' }}>
              Ответ ИИ-помощника:
            </b>
            <div>{answer}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ——— Стили в кофейной палитре ———

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    margin: 0,
    padding: '2rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'linear-gradient(135deg, #F7EFE6 0%, #E8DCC8 40%, #D7C2AA 75%, #B79A7D 100%)',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
  },
  card: {
    width: '100%',
    maxWidth: 840,
    backgroundColor: 'rgba(247, 239, 230, 0.96)', // крем-капучино
    borderRadius: 24,
    padding: '1.75rem 1.75rem 2rem',
    boxShadow:
      '0 18px 45px rgba(59, 47, 47, 0.25), 0 0 0 1px rgba(255,255,255,0.4)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(198, 169, 136, 0.6)', // капучино-бордер
  },
  title: {
    fontSize: '1.7rem',
    fontWeight: 700,
    margin: 0,
    marginBottom: '0.25rem',
    letterSpacing: '0.04em',
    color: '#3B2F2F', // горький шоколад
    textTransform: 'uppercase',
  },
  subtitle: {
    margin: 0,
    marginBottom: '1.25rem',
    fontSize: '0.98rem',
    color: '#6A5240', // мягкий кофе
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    margin: 0,
    marginBottom: '0.5rem',
    color: '#3B2F2F',
  },
  helperText: {
    margin: 0,
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
    color: '#7A5E47',
  },
  separator: {
    height: 1,
    background:
      'linear-gradient(90deg, rgba(0,0,0,0) 0%, #D7C2AA 25%, #C6A988 75%, rgba(0,0,0,0) 100%)',
    margin: '1.25rem 0 1.5rem',
  },
  textarea: {
    width: '100%',
    padding: '0.9rem 1rem',
    borderRadius: 14,
    border: '1px solid #C6A988',
    marginBottom: '0.9rem',
    fontFamily: 'inherit',
    fontSize: '0.95rem',
    outline: 'none',
    resize: 'vertical',
    backgroundColor: '#F3E6D6', // латте
    color: '#3B2F2F',
  },
  button: {
    padding: '0.7rem 1.6rem',
    borderRadius: 999,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.95rem',
    background:
      'linear-gradient(135deg, #4A2F24 0%, #6B4330 40%, #C6A988 100%)', // шоколад + капучино
    color: '#fff',
    boxShadow: '0 10px 25px rgba(59, 47, 47, 0.35)',
    transition: 'transform 0.08s ease, box-shadow 0.08s ease, opacity 0.1s',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'default',
    boxShadow: '0 6px 16px rgba(59, 47, 47, 0.25)',
  },
  secondaryButton: {
    padding: '0.7rem 1.2rem',
    borderRadius: 999,
    border: '1px solid #C6A988',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.9rem',
    backgroundColor: 'rgba(243, 230, 214, 0.9)',
    color: '#4A2F24',
  },
  errorText: {
    marginTop: '0.75rem',
    fontSize: '0.98rem',
    color: '#8B3A2A', // тёплый коричнево-красный
  },
  errorBox: {
    marginTop: '0.5rem',
    padding: '0.7rem 0.9rem',
    borderRadius: 12,
    backgroundColor: '#FBE9E2',
    border: '1px solid #E5B5A1',
    color: '#8B3A2A',
    fontSize: '0.9rem',
  },
  answerBox: {
    marginTop: '1rem',
    padding: '1rem 1.1rem',
    borderRadius: 16,
    border: '1px solid #C6A988',
    background:
      'linear-gradient(135deg, #FDF8F2 0%, #F3E4D4 45%, #F7EFE6 100%)',
    fontSize: '0.95rem',
    color: '#3B2F2F',
    whiteSpace: 'pre-wrap',
  },
};








