import { BarChart, DonutChart } from "../components/Charts";
import { StatCard } from "../components/StatCard";
import type { Ticket } from "../types";
import {
  countTicketsBy,
  formatDate,
  priorityColors,
  priorityTones,
  statusColors,
  statusTones
} from "../utils/ticketStats";

interface DashboardScreenProps {
  tickets: Ticket[];
  onOpenTicket: (ticketId: string) => void;
}

export function DashboardScreen({ tickets, onOpenTicket }: DashboardScreenProps) {
  const activeTickets = tickets.filter((ticket) => !["Решен", "Приключен"].includes(ticket.status));
  const completedTickets = tickets.filter((ticket) => ticket.status === "Приключен");
  const newTickets = tickets.filter((ticket) => ticket.status === "Нов");
  const recentTickets = [...tickets]
    .sort((first, second) => Date.parse(second.createdAt) - Date.parse(first.createdAt))
    .slice(0, 4);

  return (
    <div className="screen-stack">
      <section className="stats-grid">
        <StatCard label="Общо тикети" value={tickets.length} hint="Всички регистрирани заявки" />
        <StatCard label="Активни тикети" value={activeTickets.length} hint="Нов, в процес или изчакване" tone="amber" />
        <StatCard label="Приключени тикети" value={completedTickets.length} hint="Финално затворени заявки" tone="green" />
        <StatCard label="Нови тикети" value={newTickets.length} hint="Очакват първа реакция" tone="red" />
      </section>

      <section className="dashboard-grid">
        <DonutChart data={countTicketsBy(tickets, (ticket) => ticket.status, statusColors)} title="Графика по статуси" />
        <BarChart
          data={countTicketsBy(tickets, (ticket) => ticket.priority, priorityColors)}
          subtitle="Брой тикети според спешност"
          title="Графика по приоритети"
        />
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Последни създадени тикети</h2>
            <p>Най-новите заявки в системата</p>
          </div>
        </div>
        <div className="ticket-list">
          {recentTickets.map((ticket) => (
            <button className="ticket-list-item" key={ticket.id} onClick={() => onOpenTicket(ticket.id)} type="button">
              <span>
                <strong>{ticket.title}</strong>
                <small>
                  {ticket.id} · {ticket.assignee} · {formatDate(ticket.createdAt)}
                </small>
              </span>
              <span className={`status-pill tone-${statusTones[ticket.status]}`}>{ticket.status}</span>
              <span className={`priority-pill tone-${priorityTones[ticket.priority]}`}>{ticket.priority}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
