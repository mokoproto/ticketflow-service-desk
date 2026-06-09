import type { ReactNode } from "react";
import type { ViewKey } from "../types";

interface LayoutProps {
  activeView: ViewKey;
  children: ReactNode;
  userName: string;
  onNavigate: (view: ViewKey) => void;
  onLogout: () => void;
}

const navItems: Array<{ key: ViewKey; label: string; icon: string }> = [
  { key: "dashboard", label: "Табло", icon: "□" },
  { key: "tickets", label: "Тикети", icon: "≡" },
  { key: "create", label: "Нов тикет", icon: "+" },
  { key: "employees", label: "Служители", icon: "○" },
  { key: "analytics", label: "Анализи", icon: "▥" },
  { key: "settings", label: "Настройки", icon: "⚙" }
];

export function Layout({ activeView, children, userName, onNavigate, onLogout }: LayoutProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Основна навигация">
        <div className="brand">
          <div className="brand-mark">TF</div>
          <div>
            <strong>TicketFlow</strong>
            <span>Вътрешна система</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = activeView === item.key || (activeView === "ticket-details" && item.key === "tickets");

            return (
              <button
                className={`nav-item ${isActive ? "active" : ""}`}
                key={item.key}
                onClick={() => onNavigate(item.key)}
                type="button"
              >
                <span className="nav-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <span>Корпоративен портал</span>
          <strong>v1.0.0</strong>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">Корпоративна платформа</span>
            <h1>Управление на служебни тикети</h1>
          </div>
          <div className="topbar-actions">
            <div className="user-chip">
              <span className="avatar" aria-hidden="true">
                A
              </span>
              <div>
                <strong>{userName}</strong>
                <span>Администратор</span>
              </div>
            </div>
            <button className="ghost-button" onClick={onLogout} type="button">
              Изход
            </button>
          </div>
        </header>

        <main className="content">{children}</main>
      </div>
    </div>
  );
}
