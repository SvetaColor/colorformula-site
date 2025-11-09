"use client";

export default function Home() {
  const BOT_URL = "https://t.me/ColorformulaSveta_bot";
  const TAPLINK_URL = "https://taplink.cc/svetacolor";
  const PAY_3_DAYS = "https://yoomoney.ru/fundraise/1DR1Q9MCNUT.251105";
  const PAY_1_MONTH = "https://yoomoney.ru/fundraise/1DR1RH5CSP3.251105";
  const PAY_3_MONTHS = "https://yoomoney.ru/fundraise/1DR1SK0V1RS.251105";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(180deg, #faf7ff 0%, #ffffff 100%)",
        color: "#4b2ca6",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: 800,
          letterSpacing: "0.02em",
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        💜 COLORFORMULA
      </h1>

      <p style={{ fontSize: "1.25rem", color: "#5c2ca2", marginTop: "12px" }}>
        Помощник колориста, который подберёт формулу за секунды 🎨
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          marginTop: "28px",
          alignItems: "center",
        }}
      >
        {/* Кнопка Telegram */}
        <a
          href={BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: "#7c3aed",
            color: "white",
            padding: "12px 18px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 700,
            boxShadow: "0 4px 14px rgba(124,58,237,.25)",
            transition: "all 0.2s ease-in-out",
          }}
        >
          🤖 Открыть бота в Telegram
        </a>

        {/* Кнопки оплаты */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <a
            href={PAY_3_DAYS}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#fff",
              color: "#4b2ca6",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "2px solid #e9d5ff",
              textDecoration: "none",
              fontWeight: 700,
              transition: "all 0.2s ease-in-out",
            }}
          >
            💎 3 дня — 99 ₽
          </a>

          <a
            href={PAY_1_MONTH}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#fff",
              color: "#4b2ca6",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "2px solid #e9d5ff",
              textDecoration: "none",
              fontWeight: 700,
              transition: "all 0.2s ease-in-out",
            }}
          >
            💜 1 месяц — 690 ₽
          </a>

          <a
            href={PAY_3_MONTHS}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#fff",
              color: "#4b2ca6",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "2px solid #e9d5ff",
              textDecoration: "none",
              fontWeight: 700,
              transition: "all 0.2s ease-in-out",
            }}
          >
            💫 3 месяца — 1990 ₽
          </a>
        </div>

        {/* Кнопка Taplink */}
        <a
          href={TAPLINK_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: "#ffffff",
            color: "#4b2ca6",
            padding: "10px 18px",
            borderRadius: "10px",
            border: "2px solid #e9d5ff",
            textDecoration: "none",
            fontWeight: 700,
            marginTop: "16px",
          }}
        >
          🌐 Мой Taplink
        </a>
      </div>
    </main>
  );
}
