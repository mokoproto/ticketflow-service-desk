import type { ChartDatum } from "../components/Charts";
import type { Ticket, TicketPriority, TicketStatus } from "../types";

export const statusColors: Record<TicketStatus, string> = {
  Нов: "#2563eb",
  "В процес": "#0891b2",
  Изчакване: "#d97706",
  Решен: "#16a34a",
  Приключен: "#475569"
};

export const priorityColors: Record<TicketPriority, string> = {
  Нисък: "#64748b",
  Среден: "#2563eb",
  Висок: "#d97706",
  Критичен: "#dc2626"
};

export const statusTones: Record<TicketStatus, string> = {
  Нов: "blue",
  "В процес": "cyan",
  Изчакване: "amber",
  Решен: "green",
  Приключен: "slate"
};

export const priorityTones: Record<TicketPriority, string> = {
  Нисък: "slate",
  Среден: "blue",
  Висок: "amber",
  Критичен: "red"
};

export function countTicketsBy<T extends string>(
  tickets: Ticket[],
  selector: (ticket: Ticket) => T,
  colors?: Partial<Record<T, string>>
): ChartDatum[] {
  const map = tickets.reduce<Record<string, number>>((acc, ticket) => {
    const key = selector(ticket);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(map).map(([label, value]) => ({
    label,
    value,
    color: colors?.[label as T] ?? "#1d4ed8"
  }));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("bg-BG", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

export function nowStamp() {
  return new Intl.DateTimeFormat("bg-BG", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}
