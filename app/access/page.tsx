export default function AccessPage() {
  const hasSubscription = true; // Временно: true = доступ есть, false = нет

  if (!hasSubscription) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Нет доступа</h1>
        <p>Ваша подписка неактивна. Обновите подписку, чтобы получить доступ.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Доступ разрешён</h1>
      <p>Здесь появится информация для клиентов с активной подпиской.</p>
    </div>
  );
}
