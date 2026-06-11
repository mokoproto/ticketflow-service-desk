import { useState } from "react";

export function SettingsScreen() {
  const [compactMode, setCompactMode] = useState(false);
  const [showClosedTickets, setShowClosedTickets] = useState(true);
  const [profileUsername] = useState("admin");
  const [profileFirstName, setProfileFirstName] = useState("Иван");
  const [profileLastName, setProfileLastName] = useState("Петров");
  const [profileEmail, setProfileEmail] = useState("ivan.petrov@example.com");
  const [profileRole] = useState("Администратор");
  const [profileDepartment] = useState("ИТ поддръжка");
  const [profileLanguage, setProfileLanguage] = useState("Български");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [rememberSettings, setRememberSettings] = useState(true);
  const [autoLogin, setAutoLogin] = useState(false);
  const [timezone, setTimezone] = useState("Europe/Sofia");
  const [saveMessage, setSaveMessage] = useState("");

  function handleSaveSettings() {
    setSaveMessage("Промените са запазени успешно.");
    window.setTimeout(() => setSaveMessage(""), 3000);
  }

  return (
    <div className="settings-grid">
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Профил</h2>
            <p>Лични данни и работни детайли за вашия акаунт.</p>
          </div>
        </div>
        <div className="settings-list">
          <label>
            Потребителско име
            <input disabled value={profileUsername} type="text" />
          </label>
          <label>
            Име
            <input value={profileFirstName} onChange={(event) => setProfileFirstName(event.target.value)} type="text" />
          </label>
          <label>
            Фамилия
            <input value={profileLastName} onChange={(event) => setProfileLastName(event.target.value)} type="text" />
          </label>
          <label>
            Имейл
            <input value={profileEmail} onChange={(event) => setProfileEmail(event.target.value)} type="email" />
          </label>
          <label>
            Език
            <select value={profileLanguage} onChange={(event) => setProfileLanguage(event.target.value)}>
              <option>Български</option>
              <option>Английски</option>
            </select>
          </label>
          <label>
            Роля
            <input disabled value={profileRole} type="text" />
          </label>
          <label>
            Отдел
            <input disabled value={profileDepartment} type="text" />
          </label>
          <label>
            Часова зона
            <select value={timezone} onChange={(event) => setTimezone(event.target.value)}>
              <option value="Europe/Sofia">Europe/Sofia</option>
              <option value="Europe/London">Europe/London</option>
              <option value="Europe/Berlin">Europe/Berlin</option>
              <option value="Asia/Istanbul">Asia/Istanbul</option>
            </select>
          </label>
          <label className="toggle-row">
            <span>
              <strong>Запомни настройките</strong>
              <small>Запази избора като предпочитани настройки.</small>
            </span>
            <input
              checked={rememberSettings}
              onChange={(event) => setRememberSettings(event.target.checked)}
              type="checkbox"
            />
          </label>
          <button type="button" className="primary-button full-width" onClick={handleSaveSettings}>
            Запази профил
          </button>
          {saveMessage ? <p className="toast-notification">{saveMessage}</p> : null}
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Сигурност и известия</h2>
            <p>Задайте предпочитания за уведомления и достъп.</p>
          </div>
        </div>
        <div className="settings-list">
          <label className="toggle-row">
            <span>
              <strong>Е-mail известия</strong>
              <small>Получавайте системни известия и напомняния.</small>
            </span>
            <input
              checked={notificationsEnabled}
              onChange={(event) => setNotificationsEnabled(event.target.checked)}
              type="checkbox"
            />
          </label>
          <label className="toggle-row">
            <span>
              <strong>Push известия</strong>
              <small>Получавай известия директно на устройството си.</small>
            </span>
            <input
              checked={pushNotifications}
              onChange={(event) => setPushNotifications(event.target.checked)}
              type="checkbox"
            />
          </label>
          <label className="toggle-row">
            <span>
              <strong>Седмичен отчет</strong>
              <small>Автоматично изпращане на обобщение за задачите.</small>
            </span>
            <input
              checked={weeklyReport}
              onChange={(event) => setWeeklyReport(event.target.checked)}
              type="checkbox"
            />
          </label>
          <label className="toggle-row">
            <span>
              <strong>Запомни ме</strong>
              <small>Остани в системата при следващо влизане.</small>
            </span>
            <input checked={autoLogin} onChange={(event) => setAutoLogin(event.target.checked)} type="checkbox" />
          </label>
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Настройки на интерфейса</h2>
            <p>Визуални настройки за текущата сесия</p>
          </div>
        </div>
        <div className="settings-list">
          <label className="toggle-row">
            <span>
              <strong>Компактен режим</strong>
              <small>По-плътни разстояния в работните екрани</small>
            </span>
            <input checked={compactMode} onChange={(event) => setCompactMode(event.target.checked)} type="checkbox" />
          </label>

          <label className="toggle-row">
            <span>
              <strong>Показване на приключени тикети</strong>
              <small>Настройка за бъдеще филтриране</small>
            </span>
            <input
              checked={showClosedTickets}
              onChange={(event) => setShowClosedTickets(event.target.checked)}
              type="checkbox"
            />
          </label>
        </div>
      </section>
    </div>
  );
}
