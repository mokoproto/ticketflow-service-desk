import { useState } from "react";

export function SettingsScreen() {
  const [compactMode, setCompactMode] = useState(false);
  const [showClosedTickets, setShowClosedTickets] = useState(true);

  return (
    <div className="settings-grid">
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Информация за системата</h2>
            <p>Основна информация за платформата</p>
          </div>
        </div>
        <dl className="info-list">
          <div>
            <dt>Име</dt>
            <dd>TicketFlow</dd>
          </div>
          <div>
            <dt>Версия</dt>
            <dd>1.0.0</dd>
          </div>
          <div>
            <dt>Тип</dt>
            <dd>Front End приложение</dd>
          </div>
          <div>
            <dt>Данни</dt>
            <dd>Локални TypeScript масиви</dd>
          </div>
          <div>
            <dt>Backend</dt>
            <dd>Не се използва</dd>
          </div>
        </dl>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Настройки на интерфейса</h2>
            <p>Визуални настройки само за текущата сесия</p>
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
              <small>Настройка за бъдещо разширение на филтрите</small>
            </span>
            <input
              checked={showClosedTickets}
              onChange={(event) => setShowClosedTickets(event.target.checked)}
              type="checkbox"
            />
          </label>
        </div>
      </section>

      <section className="panel wide-note">
        <div className="panel-heading">
          <div>
            <h2>Архитектура</h2>
            <p>Проектът е подготвен за лесно разширяване</p>
          </div>
        </div>
        <p className="muted-text">
          Приложението е разделено на TypeScript типове, локални данни, reusable компоненти, отделни екрани и CSS файл.
          Няма реални API заявки, база данни или външна автентикация.
        </p>
      </section>
    </div>
  );
}
