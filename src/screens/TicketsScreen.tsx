import { useMemo, useState } from "react";
import { ticketPriorities, ticketStatuses } from "../data/localData";
import type { Ticket, TicketPriority, TicketStatus } from "../types";
import { formatDate, priorityTones, statusTones } from "../utils/ticketStats";

interface TicketsScreenProps {
  tickets: Ticket[];
  onCreateTicket: () => void;
  onOpenTicket: (ticketId: string) => void;
  onStatusChange: (ticketId: string, status: TicketStatus) => void;
}

type SortKey = "dateDesc" | "dateAsc" | "priority" | "status" | "title";

const priorityRank: Record<TicketPriority, number> = {
  Критичен: 4,
  Висок: 3,
  Среден: 2,
  Нисък: 1
};

export function TicketsScreen({ tickets, onCreateTicket, onOpenTicket, onStatusChange }: TicketsScreenProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | TicketStatus>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | TicketPriority>("all");
  const [sortKey, setSortKey] = useState<SortKey>("dateDesc");

  const visibleTickets = useMemo(() => {
    return tickets
      .filter((ticket) => {
        const normalizedQuery = query.trim().toLowerCase();
        const matchesQuery =
          !normalizedQuery ||
          ticket.id.toLowerCase().includes(normalizedQuery) ||
          ticket.title.toLowerCase().includes(normalizedQuery) ||
          ticket.assignee.toLowerCase().includes(normalizedQuery);
        const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
        const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;

        return matchesQuery && matchesStatus && matchesPriority;
      })
      .sort((first, second) => {
        if (sortKey === "dateAsc") {
          return Date.parse(first.createdAt) - Date.parse(second.createdAt);
        }
        if (sortKey === "priority") {
          return priorityRank[second.priority] - priorityRank[first.priority];
        }
        if (sortKey === "status") {
          return first.status.localeCompare(second.status, "bg");
        }
        if (sortKey === "title") {
          return first.title.localeCompare(second.title, "bg");
        }
        return Date.parse(second.createdAt) - Date.parse(first.createdAt);
      });
  }, [priorityFilter, query, sortKey, statusFilter, tickets]);

  return (
    <section className="panel">
      <div className="panel-heading split">
        <div>
          <h2>Тикети</h2>
          <p>Преглед, филтриране и управление на служебни заявки</p>
        </div>
        <button className="primary-button" onClick={onCreateTicket} type="button">
          <span aria-hidden="true">+</span>
          Нов тикет
        </button>
      </div>

      <div className="toolbar">
        <label className="search-field">
          <span aria-hidden="true">⌕</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Търсене по ID, заглавие или отговорник"
            type="search"
            value={query}
          />
        </label>

        <select onChange={(event) => setStatusFilter(event.target.value as "all" | TicketStatus)} value={statusFilter}>
          <option value="all">Всички статуси</option>
          {ticketStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          onChange={(event) => setPriorityFilter(event.target.value as "all" | TicketPriority)}
          value={priorityFilter}
        >
          <option value="all">Всички приоритети</option>
          {ticketPriorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>

        <select onChange={(event) => setSortKey(event.target.value as SortKey)} value={sortKey}>
          <option value="dateDesc">Най-нови първо</option>
          <option value="dateAsc">Най-стари първо</option>
          <option value="priority">По приоритет</option>
          <option value="status">По статус</option>
          <option value="title">По заглавие</option>
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Заглавие</th>
              <th>Приоритет</th>
              <th>Статус</th>
              <th>Отговорник</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {visibleTickets.map((ticket) => (
              <tr key={ticket.id} onClick={() => onOpenTicket(ticket.id)}>
                <td>
                  <strong>{ticket.id}</strong>
                </td>
                <td>
                  <button className="link-button" onClick={() => onOpenTicket(ticket.id)} type="button">
                    {ticket.title}
                  </button>
                  <small>{ticket.category}</small>
                </td>
                <td>
                  <span className={`priority-pill tone-${priorityTones[ticket.priority]}`}>{ticket.priority}</span>
                </td>
                <td>
                  <select
                    className={`status-select tone-${statusTones[ticket.status]}`}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(event) => onStatusChange(ticket.id, event.target.value as TicketStatus)}
                    value={ticket.status}
                  >
                    {ticketStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{ticket.assignee}</td>
                <td>{formatDate(ticket.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
