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
              content:
                'Ты — профессиональный парикмахер-колорист с 20+ летним опытом. Помогаешь мастерам составлять формулы окрашивания по правилам колористики.',
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
      'Ошибка: не удалось получить ответ от модели';

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Серверная ошибка' },
      { status: 500 }
    );
  }
}

