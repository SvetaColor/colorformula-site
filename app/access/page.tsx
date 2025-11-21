export const dynamic = 'force-dynamic';

type SearchParams = {
  user?: string | string[];
};

export default function AccessPage({ searchParams }: { searchParams: SearchParams }) {
  const rawUser = searchParams.user;
  const user = Array.isArray(rawUser) ? rawUser[0] : rawUser;

  const activeUsers = ['vasya123', 'lena456', 'katya789'];

  const hasAccess = !!user && activeUsers.includes(user);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Страница доступа</h1>

      {!user && (
        <p>❌ Не указан ID пользователя в ссылке. Обратись к администратору за правильной ссылкой.</p>
      )}

      {user && hasAccess && (
        <p>✅ Доступ разрешён для пользователя: {user}</p>
      )}

      {user && !hasAccess && (
        <p>❌ Подписка не активна или пользователь не найден.</p>
      )}
    </div>
  );
}
