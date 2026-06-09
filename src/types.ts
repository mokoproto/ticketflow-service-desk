export type TicketStatus = "Нов" | "В процес" | "Изчакване" | "Решен" | "Приключен";

export type TicketPriority = "Нисък" | "Среден" | "Висок" | "Критичен";

export type TicketCategory =
  | "ИТ поддръжка"
  | "Администрация"
  | "Човешки ресурси"
  | "Финанси"
  | "Операции";

export type ViewKey =
  | "dashboard"
  | "tickets"
  | "create"
  | "ticket-details"
  | "employees"
  | "analytics"
  | "settings";

export interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  activeTasks: number;
  email: string;
}

export interface TicketComment {
  id: number;
  author: string;
  date: string;
  message: string;
}

export interface TicketHistoryItem {
  id: number;
  date: string;
  action: string;
  author: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignee: string;
  requester: string;
  department: string;
  createdAt: string;
  averageResolutionHours: number;
  comments: TicketComment[];
  history: TicketHistoryItem[];
}

export interface NewTicketForm {
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  assignee: string;
}
