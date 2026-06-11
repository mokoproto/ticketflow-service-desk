import { useState, type ChangeEvent, type FormEvent } from "react";

interface LoginScreenProps {
  onLogin: (userName: string) => void;
}

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isVisible: boolean;
  onToggle: () => void;
  autoComplete: string;
}

function PasswordField({ label, value, onChange, isVisible, onToggle, autoComplete }: PasswordFieldProps) {
  return (
    <label className="password-field">
      {label}
      <div className="password-wrapper">
        <input
          autoComplete={autoComplete}
          onChange={onChange}
          type={isVisible ? "text" : "password"}
          value={value}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={onToggle}
          aria-pressed={isVisible}
          aria-label={isVisible ? "Скрий паролата" : "Покажи паролата"}
        >
          {isVisible ? "👁️" : "👁"}
        </button>
      </div>
    </label>
  );
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [userName, setUserName] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const [showResetNewPassword, setShowResetNewPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);
  const [notification, setNotification] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin(userName.trim() || "admin");
  }

  function handleResetSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!resetEmail || !resetNewPassword || !resetConfirmPassword) {
      setNotification("Моля, попълнете всички полета.");
      return;
    }

    if (resetNewPassword !== resetConfirmPassword) {
      setNotification("Нова парола и потвърждение трябва да съвпадат.");
      return;
    }

    setNotification(`Заявката за потвърждение за смяна на паролата е изпратена на ${resetEmail}.`);
    setResetEmail("");
    setResetNewPassword("");
    setResetConfirmPassword("");
    setShowResetNewPassword(false);
    setShowResetConfirmPassword(false);

    window.setTimeout(() => {
      setNotification("");
    }, 30000);
  }

  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="login-brand">
          <span>TicketFlow</span>
          <strong>Център за служебни заявки и екипна координация</strong>
        </div>

        <div className="login-graphic-card" aria-label="Работен поток на системата">
          <div className="graphic-topline">
            <span>Service Desk</span>
            <strong>Оперативен преглед</strong>
          </div>

          <svg className="login-graphic" viewBox="0 0 620 360" role="img" aria-label="Графика на работен поток">
            <defs>
              <linearGradient id="screenGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
                <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.94" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <rect className="graphic-window" x="46" y="34" width="528" height="292" rx="18" />
            <rect className="graphic-sidebar" x="70" y="72" width="112" height="216" rx="12" />
            <rect className="graphic-line muted" x="92" y="100" width="66" height="10" rx="5" />
            <rect className="graphic-line muted" x="92" y="132" width="74" height="10" rx="5" />
            <rect className="graphic-line active" x="92" y="164" width="58" height="10" rx="5" />
            <rect className="graphic-line muted" x="92" y="196" width="70" height="10" rx="5" />
            <rect className="graphic-line muted" x="92" y="228" width="52" height="10" rx="5" />
            <rect className="graphic-card primary" x="212" y="76" width="148" height="82" rx="14" />
            <rect className="graphic-card" x="382" y="76" width="138" height="82" rx="14" />
            <rect className="graphic-chart" x="212" y="188" width="308" height="96" rx="14" />
            <path className="graphic-flow" d="M238 252 C282 210, 320 238, 362 204 S438 198, 496 154" />
            <circle className="graphic-dot" cx="238" cy="252" r="7" />
            <circle className="graphic-dot" cx="362" cy="204" r="7" />
            <circle className="graphic-dot" cx="496" cy="154" r="7" />
            <rect className="graphic-small-line" x="238" y="104" width="82" height="10" rx="5" />
            <rect className="graphic-small-line" x="238" y="128" width="52" height="10" rx="5" />
            <rect className="graphic-small-line dark" x="406" y="104" width="74" height="10" rx="5" />
            <rect className="graphic-small-line dark" x="406" y="128" width="46" height="10" rx="5" />
          </svg>
        </div>
      </section>

      <section className="login-panel">
        {notification ? (
          <div className="toast-notification" role="status" aria-live="polite">
            {notification}
          </div>
        ) : null}

        {!showResetForm ? (
          <form className="login-card" onSubmit={handleSubmit}>
            <div>
              <span className="eyebrow">Вътрешен достъп</span>
              <h1>Вход в системата</h1>
              <p>Управлявайте заявки, задачи и вътрешна комуникация от един централизиран работен панел.</p>
            </div>

            <label>
              Потребителско име
              <input
                autoComplete="username"
                onChange={(event) => setUserName(event.target.value)}
                type="text"
                value={userName}
              />
            </label>

            <PasswordField
              label="Парола"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              isVisible={showPassword}
              onToggle={() => setShowPassword((visible) => !visible)}
            />

            <button className="primary-button full-width" type="submit">
              Вход
            </button>
            <button
              type="button"
              className="ghost-button full-width"
              onClick={() => setShowResetForm(true)}
            >
              Забравена парола
            </button>
          </form>
        ) : (
          <form className="login-card" onSubmit={handleResetSubmit}>
            <div>
              <span className="eyebrow">Смяна на парола</span>
              <h1>Нова парола</h1>
              <p>Попълнете имейл и изберете нова парола.</p>
            </div>

            <label>
              Имейл
              <input
                autoComplete="email"
                onChange={(event) => setResetEmail(event.target.value)}
                type="email"
                value={resetEmail}
              />
            </label>

            <PasswordField
              label="Нова парола"
              autoComplete="new-password"
              value={resetNewPassword}
              onChange={(event) => setResetNewPassword(event.target.value)}
              isVisible={showResetNewPassword}
              onToggle={() => setShowResetNewPassword((visible) => !visible)}
            />

            <PasswordField
              label="Потвърди парола"
              autoComplete="new-password"
              value={resetConfirmPassword}
              onChange={(event) => setResetConfirmPassword(event.target.value)}
              isVisible={showResetConfirmPassword}
              onToggle={() => setShowResetConfirmPassword((visible) => !visible)}
            />

            <button className="primary-button full-width" type="submit">
              Изпрати заявка
            </button>
            <button
              type="button"
              className="ghost-button full-width"
              onClick={() => setShowResetForm(false)}
            >
              Връщане към вход
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
