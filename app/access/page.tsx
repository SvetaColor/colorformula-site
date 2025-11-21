export default async function AccessPage({ searchParams }: { searchParams: { user?: string } }) {
  const user = searchParams.user;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://colorformula-site.vercel.app'}/api/check?user=${user}`);
  const data = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Страница доступа</h1>
      {data.access ? (
        <p>✅ Доступ разрешён для пользователя: {user}</p>
      ) : (
        <p>❌ Подписка не активна или пользователь не найден</p>
      )}
    </div>
  );
}
