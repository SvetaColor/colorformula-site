
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user');

  const activeUsers = ['vasya123', 'lena456', 'katya789'];

  if (!user || !activeUsers.includes(user)) {
    return NextResponse.json({ access: false, message: 'Подписка неактивна' });
  }

  return NextResponse.json({ access: true, message: 'Доступ разрешён' });
}
