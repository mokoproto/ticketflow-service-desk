import { BarChart } from "../components/Charts";
import { StatCard } from "../components/StatCard";
import type { Ticket } from "../types";
import { countTicketsBy, priorityColors, statusColors } from "../utils/ticketStats";

interface AnalyticsScreenProps {
  tickets: Ticket[];
}

export function AnalyticsScreen({ tickets }: AnalyticsScreenProps) {
  const averageResolution =
    tickets.reduce((sum, ticket) => sum + ticket.averageResolutionHours, 0) / Math.max(tickets.length, 1);
  const activeDepartments = new Set(tickets.map((ticket) => ticket.department)).size;
  const criticalTickets = tickets.filter((ticket) => ticket.priority === "Критичен").length;

  return (
    <div className="screen-stack">
      <section className="stats-grid">
        <StatCard label="Средно време" value={`${averageResolution.toFixed(1)} ч.`} hint="Средна стойност" />
        <StatCard label="Отдели" value={activeDepartments} hint="С тикети в системата" tone="green" />
        <StatCard label="Критични" value={criticalTickets} hint="Нуждаят се от внимание" tone="red" />
        <StatCard label="Обем" value={tickets.length} hint="Общо обработвани заявки" tone="amber" />
      </section>

      <section className="analytics-grid">
        <BarChart
          data={countTicketsBy(tickets, (ticket) => ticket.status, statusColors)}
          subtitle="Контрол на работния поток"
          title="Тикети по статус"
        />
        <BarChart
          data={countTicketsBy(tickets, (ticket) => ticket.department)}
          subtitle="Натоварване по организационни звена"
          title="Тикети по отдел"
        />
        <BarChart
          data={countTicketsBy(tickets, (ticket) => ticket.priority, priorityColors)}
          subtitle="Оценка на спешност и риск"
          title="Тикети по приоритет"
        />
        <section className="panel metric-panel">
          <div className="panel-heading">
            <div>
              <h2>Средно време за изпълнение</h2>
              <p>Управленски показател за ефективност</p>
            </div>
          </div>
          <div className="large-metric">
            <strong>{averageResolution.toFixed(1)}</strong>
            <span>часа</span>
          </div>
          <div className="metric-scale">
            <span style={{ width: `${Math.min((averageResolution / 48) * 100, 100)}%` }} />
          </div>
          <p className="muted-text">Изчислено върху времената за обработка в локалните данни.</p>
        </section>
      </section>
    </div>
  );
}
