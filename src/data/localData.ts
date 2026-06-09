import type { Employee, Ticket, TicketCategory, TicketPriority, TicketStatus } from "../types";

export const ticketStatuses: TicketStatus[] = ["Нов", "В процес", "Изчакване", "Решен", "Приключен"];

export const ticketPriorities: TicketPriority[] = ["Нисък", "Среден", "Висок", "Критичен"];

export const ticketCategories: TicketCategory[] = [
  "ИТ поддръжка",
  "Администрация",
  "Човешки ресурси",
  "Финанси",
  "Операции"
];

export const employees: Employee[] = [
  {
    id: 1,
    name: "Иван Петров",
    department: "ИТ отдел",
    position: "Системен администратор",
    activeTasks: 4,
    email: "ivan.petrov@company.local"
  },
  {
    id: 2,
    name: "Георги Иванов",
    department: "Операции",
    position: "Координатор процеси",
    activeTasks: 3,
    email: "georgi.ivanov@company.local"
  },
  {
    id: 3,
    name: "Мария Николова",
    department: "Финанси",
    position: "Финансов анализатор",
    activeTasks: 2,
    email: "maria.nikolova@company.local"
  },
  {
    id: 4,
    name: "Десислава Георгиева",
    department: "Човешки ресурси",
    position: "HR специалист",
    activeTasks: 1,
    email: "desislava.georgieva@company.local"
  }
];

// Централизиран локален набор от данни за работните екрани.
export const initialTickets: Ticket[] = [
  {
    id: "TCK-1001",
    title: "Неуспешен достъп до вътрешния портал",
    description:
      "Служител от финансовия отдел не може да влезе във вътрешния портал след смяна на паролата.",
    category: "ИТ поддръжка",
    priority: "Висок",
    status: "В процес",
    assignee: "Иван Петров",
    requester: "Мария Николова",
    department: "Финанси",
    createdAt: "2026-05-30",
    averageResolutionHours: 12,
    comments: [
      {
        id: 1,
        author: "Мария Николова",
        date: "2026-05-30 09:15",
        message: "Проблемът възникна след задължителната смяна на паролата."
      },
      {
        id: 2,
        author: "Иван Петров",
        date: "2026-05-30 10:05",
        message: "Проверявам синхронизацията на потребителския профил."
      }
    ],
    history: [
      { id: 1, date: "2026-05-30 09:15", action: "Тикетът е създаден", author: "Мария Николова" },
      { id: 2, date: "2026-05-30 09:40", action: "Назначен отговорник", author: "Система" },
      { id: 3, date: "2026-05-30 10:00", action: "Статусът е променен на В процес", author: "Иван Петров" }
    ]
  },
  {
    id: "TCK-1002",
    title: "Заявка за нов служебен лаптоп",
    description: "Нов служител в отдел Операции има нужда от подготвен лаптоп и достъп до основните системи.",
    category: "Администрация",
    priority: "Среден",
    status: "Нов",
    assignee: "Георги Иванов",
    requester: "Десислава Георгиева",
    department: "Човешки ресурси",
    createdAt: "2026-06-01",
    averageResolutionHours: 20,
    comments: [
      {
        id: 1,
        author: "Десислава Георгиева",
        date: "2026-06-01 11:20",
        message: "Служителят започва работа от понеделник."
      }
    ],
    history: [
      { id: 1, date: "2026-06-01 11:20", action: "Тикетът е създаден", author: "Десислава Георгиева" }
    ]
  },
  {
    id: "TCK-1003",
    title: "Грешка при експортиране на месечен отчет",
    description: "При експортиране на отчет за разходи системата връща празен CSV файл.",
    category: "Финанси",
    priority: "Критичен",
    status: "Изчакване",
    assignee: "Мария Николова",
    requester: "Георги Иванов",
    department: "Операции",
    createdAt: "2026-05-28",
    averageResolutionHours: 36,
    comments: [
      {
        id: 1,
        author: "Георги Иванов",
        date: "2026-05-28 16:30",
        message: "Отчетът е необходим за управленската среща."
      },
      {
        id: 2,
        author: "Мария Николова",
        date: "2026-05-29 08:45",
        message: "Изчаквам потвърждение за периода и филтрите в отчета."
      }
    ],
    history: [
      { id: 1, date: "2026-05-28 16:30", action: "Тикетът е създаден", author: "Георги Иванов" },
      { id: 2, date: "2026-05-29 08:40", action: "Статусът е променен на Изчакване", author: "Мария Николова" }
    ]
  },
  {
    id: "TCK-1004",
    title: "Актуализация на вътрешна процедура",
    description: "Необходимо е да се обнови инструкцията за подаване на заявки за командировки.",
    category: "Човешки ресурси",
    priority: "Нисък",
    status: "Решен",
    assignee: "Десислава Георгиева",
    requester: "Иван Петров",
    department: "ИТ отдел",
    createdAt: "2026-05-22",
    averageResolutionHours: 18,
    comments: [
      {
        id: 1,
        author: "Десислава Георгиева",
        date: "2026-05-23 13:10",
        message: "Процедурата е актуализирана и изпратена за преглед."
      }
    ],
    history: [
      { id: 1, date: "2026-05-22 14:10", action: "Тикетът е създаден", author: "Иван Петров" },
      { id: 2, date: "2026-05-23 13:05", action: "Статусът е променен на Решен", author: "Десислава Георгиева" }
    ]
  },
  {
    id: "TCK-1005",
    title: "Оптимизация на график за смени",
    description: "Да се прегледа натоварването на екипа и да се предложи промяна в графика за следващия месец.",
    category: "Операции",
    priority: "Среден",
    status: "Приключен",
    assignee: "Георги Иванов",
    requester: "Десислава Георгиева",
    department: "Операции",
    createdAt: "2026-05-16",
    averageResolutionHours: 28,
    comments: [
      {
        id: 1,
        author: "Георги Иванов",
        date: "2026-05-18 17:00",
        message: "Графикът е потвърден от ръководителя на екипа."
      }
    ],
    history: [
      { id: 1, date: "2026-05-16 10:00", action: "Тикетът е създаден", author: "Десислава Георгиева" },
      { id: 2, date: "2026-05-18 16:50", action: "Статусът е променен на Приключен", author: "Георги Иванов" }
    ]
  },
  {
    id: "TCK-1006",
    title: "Липсващ достъп до споделена папка",
    description: "Екипът по операции няма достъп до обновените шаблони за вътрешни заявки.",
    category: "ИТ поддръжка",
    priority: "Висок",
    status: "Нов",
    assignee: "Иван Петров",
    requester: "Георги Иванов",
    department: "Операции",
    createdAt: "2026-06-03",
    averageResolutionHours: 9,
    comments: [],
    history: [
      { id: 1, date: "2026-06-03 09:05", action: "Тикетът е създаден", author: "Георги Иванов" }
    ]
  }
];
