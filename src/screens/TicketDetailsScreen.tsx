import { useState, type FormEvent } from "react";
import { ticketStatuses } from "../data/localData";
import type { Ticket, TicketStatus } from "../types";
import { formatDate, priorityTones, statusTones } from "../utils/ticketStats";

interface TicketDetailsScreenProps {
  ticket?: Ticket;
  onBack: () => void;
  onAddComment: (ticketId: string, message: string) => void;
  onStatusChange: (ticketId: string, status: TicketStatus) => void;
}

export function TicketDetailsScreen({ ticket, onAddComment, onBack, onStatusChange }: TicketDetailsScreenProps) {
  const [message, setMessage] = useState("");

  if (!ticket) {
    return (
      <section className="panel empty-state">
        <h2>Тикетът не е намерен</h2>
        <button className="primary-button" onClick={onBack} type="button">
          Към списъка
        </button>
      </section>
    );
  }

  function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = message.trim();

    if (!text || !ticket) {
      return;
    }

    onAddComment(ticket.id, text);
    setMessage("");
  }

  return (
    <div className="screen-stack">
      <section className="panel details-hero">
        <button className="ghost-button compact" onClick={onBack} type="button">
          ← Назад
        </button>
        <div className="details-title">
          <span>{ticket.id}</span>
          <h2>{ticket.title}</h2>
          <p>{ticket.description}</p>
        </div>
        <div className="details-badges">
          <span className={`priority-pill tone-${priorityTones[ticket.priority]}`}>{ticket.priority}</span>
          <span className={`status-pill tone-${statusTones[ticket.status]}`}>{ticket.status}</span>
        </div>
      </section>

      <section className="details-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>Информация за тикета</h2>
              <p>Основни данни, отговорност и текущ статус</p>
            </div>
          </div>
          <dl className="info-list">
            <div>
              <dt>Категория</dt>
              <dd>{ticket.category}</dd>
            </div>
            <div>
              <dt>Отдел</dt>
              <dd>{ticket.department}</dd>
            </div>
            <div>
              <dt>Заявител</dt>
              <dd>{ticket.requester}</dd>
            </div>
            <div>
              <dt>Отговорник</dt>
              <dd>{ticket.assignee}</dd>
            </div>
            <div>
              <dt>Дата</dt>
              <dd>{formatDate(ticket.createdAt)}</dd>
            </div>
            <div>
              <dt>Средно време</dt>
              <dd>{ticket.averageResolutionHours} ч.</dd>
            </div>
          </dl>

          <label className="status-control">
            Статус
            <select
              className={`status-select tone-${statusTones[ticket.status]}`}
              onChange={(event) => onStatusChange(ticket.id, event.target.value as TicketStatus)}
              value={ticket.status}
            >
              {ticketStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <h2>История</h2>
              <p>Проследяване на действията по заявката</p>
            </div>
          </div>
          <ol className="timeline">
            {ticket.history.map((item) => (
              <li key={item.id}>
                <span />
                <div>
                  <strong>{item.action}</strong>
                  <small>
                    {item.date} · {item.author}
                  </small>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Вътрешна комуникация</h2>
            <p>Коментарите се добавят само към локалните данни в текущата сесия</p>
          </div>
        </div>

        <div className="comments">
          {ticket.comments.length ? (
            ticket.comments.map((comment) => (
              <article className="comment" key={comment.id}>
                <div className="comment-avatar" aria-hidden="true">
                  {comment.author.charAt(0)}
                </div>
                <div>
                  <header>
                    <strong>{comment.author}</strong>
                    <span>{comment.date}</span>
                  </header>
                  <p>{comment.message}</p>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-inline">Все още няма добавени коментари.</div>
          )}
        </div>

        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Добавете вътрешен коментар..."
            rows={4}
            value={message}
          />
          <button className="primary-button" disabled={!message.trim()} type="submit">
            Добави коментар
          </button>
        </form>
      </section>
    </div>
  );
}
