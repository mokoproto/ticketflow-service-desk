import { useMemo, useState } from "react";
import { Layout } from "./components/Layout";
import { employees, initialTickets } from "./data/localData";
import { AnalyticsScreen } from "./screens/AnalyticsScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { EmployeesScreen } from "./screens/EmployeesScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { TicketCreateScreen } from "./screens/TicketCreateScreen";
import { TicketDetailsScreen } from "./screens/TicketDetailsScreen";
import { TicketsScreen } from "./screens/TicketsScreen";
import type { NewTicketForm, Ticket, TicketStatus, ViewKey } from "./types";
import { nowStamp } from "./utils/ticketStats";

function nextTicketId(tickets: Ticket[]) {
  const highestId = tickets.reduce((max, ticket) => {
    const numericPart = Number(ticket.id.replace("TCK-", ""));
    return Number.isFinite(numericPart) ? Math.max(max, numericPart) : max;
  }, 1000);

  return `TCK-${highestId + 1}`;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("admin");
  const [activeView, setActiveView] = useState<ViewKey>("dashboard");
  const [selectedTicketId, setSelectedTicketId] = useState<string>(initialTickets[0]?.id ?? "");
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  const selectedTicket = useMemo(
    () => tickets.find((ticket) => ticket.id === selectedTicketId),
    [selectedTicketId, tickets]
  );

  function handleLogin(name: string) {
    setUserName(name);
    setIsLoggedIn(true);
    setActiveView("dashboard");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setActiveView("dashboard");
  }

  function handleNavigate(view: ViewKey) {
    setActiveView(view);
  }

  function handleOpenTicket(ticketId: string) {
    setSelectedTicketId(ticketId);
    setActiveView("ticket-details");
  }

  function handleCreateTicket(form: NewTicketForm) {
    const assignee = employees.find((employee) => employee.name === form.assignee);
    const newTicket: Ticket = {
      id: nextTicketId(tickets),
      title: form.title,
      description: form.description,
      category: form.category,
      priority: form.priority,
      status: "Нов",
      assignee: form.assignee,
      requester: userName,
      department: assignee?.department ?? "Общ отдел",
      createdAt: new Date().toISOString().slice(0, 10),
      averageResolutionHours: 16,
      comments: [],
      history: [
        {
          id: 1,
          action: "Тикетът е създаден",
          author: userName,
          date: nowStamp()
        }
      ]
    };

    setTickets((current) => [newTicket, ...current]);
    setSelectedTicketId(newTicket.id);
    setActiveView("ticket-details");
  }

  function handleStatusChange(ticketId: string, status: TicketStatus) {
    setTickets((current) =>
      current.map((ticket) => {
        if (ticket.id !== ticketId || ticket.status === status) {
          return ticket;
        }

        return {
          ...ticket,
          status,
          history: [
            ...ticket.history,
            {
              id: ticket.history.length + 1,
              action: `Статусът е променен на ${status}`,
              author: userName,
              date: nowStamp()
            }
          ]
        };
      })
    );
  }

  function handleAddComment(ticketId: string, message: string) {
    setTickets((current) =>
      current.map((ticket) => {
        if (ticket.id !== ticketId) {
          return ticket;
        }

        return {
          ...ticket,
          comments: [
            ...ticket.comments,
            {
              id: ticket.comments.length + 1,
              author: userName,
              date: nowStamp(),
              message
            }
          ],
          history: [
            ...ticket.history,
            {
              id: ticket.history.length + 1,
              action: "Добавен е вътрешен коментар",
              author: userName,
              date: nowStamp()
            }
          ]
        };
      })
    );
  }

  function renderActiveScreen() {
    switch (activeView) {
      case "tickets":
        return (
          <TicketsScreen
            onCreateTicket={() => setActiveView("create")}
            onOpenTicket={handleOpenTicket}
            onStatusChange={handleStatusChange}
            tickets={tickets}
          />
        );
      case "create":
        return <TicketCreateScreen onCancel={() => setActiveView("tickets")} onSubmit={handleCreateTicket} />;
      case "ticket-details":
        return (
          <TicketDetailsScreen
            onAddComment={handleAddComment}
            onBack={() => setActiveView("tickets")}
            onStatusChange={handleStatusChange}
            ticket={selectedTicket}
          />
        );
      case "employees":
        return <EmployeesScreen employees={employees} tickets={tickets} />;
      case "analytics":
        return <AnalyticsScreen tickets={tickets} />;
      case "settings":
        return <SettingsScreen />;
      case "dashboard":
      default:
        return <DashboardScreen onOpenTicket={handleOpenTicket} tickets={tickets} />;
    }
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <Layout activeView={activeView} onLogout={handleLogout} onNavigate={handleNavigate} userName={userName}>
      {renderActiveScreen()}
    </Layout>
  );
}
