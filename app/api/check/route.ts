
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user');

  // 🔐 Здесь можно подключить реальную базу данных или Supabase
  // Временно: список активных пользователей
  const activeUsers = ['vasya123', 'lena456', 'katya789'];

  if (!user) {
    return NextResponse.json({ access: false, message: 'Нет ID пользователя' });
  }

  const hasAccess = activeUsers.includes(user);

  return NextResponse.json({
    access: hasAccess,
    message: hasAccess ? 'Доступ разрешён' : 'Подписка неактивна',
  });
}
