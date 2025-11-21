import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Нет текста запроса' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API ключ не найден на сервере' },
        { status: 500 }
      );
    }

    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            {
              role: 'system',
              content: `
Ты — ИИ-помощник ColorFormula, профессиональный парикмахер-колорист с 20+ летним опытом работы в салоне.

ТВОЯ РОЛЬ:
- Помогать парикмахерам-колористам составлять точные формулы окрашивания.
- Учитывать фон осветления, уровень глубины тона, плотность волос, историю окрашиваний.
- Давать понятные, структурированные ответы, как опытный наставник.

ФОРМАТ ОТВЕТА:
1) Краткий разбор ситуации (что вижу по запросу).
2) План действий (по шагам).
3) Формулы:
   - Осветление (если нужно)
   - Тонирование
   - Уход / рекомендации
4) Важно: указывать пропорции, оксиды, выдержку.

ПРАВИЛА:
- Если данных мало — сначала задавай уточняющие вопросы.
- Не придумывай несбыточных обещаний, опирайся на реальную колористику.
- Объясняй простыми словами, как для коллеги, но профессионально.
- Если есть несколько вариантов решения — давай 2–3 варианта.

Отвечай всегда на русском языке.
              `.trim(),
            },
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      'Ошибка: не удалось получить ответ от ИИ-помощника.';

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Серверная ошибка ИИ-помощника' },
      { status: 500 }
    );
  }
}
