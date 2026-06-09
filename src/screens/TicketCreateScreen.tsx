import { useState, type FormEvent } from "react";
import { employees, ticketCategories, ticketPriorities } from "../data/localData";
import type { NewTicketForm, TicketCategory, TicketPriority } from "../types";

interface TicketCreateScreenProps {
  onCancel: () => void;
  onSubmit: (ticket: NewTicketForm) => void;
}

const defaultForm: NewTicketForm = {
  title: "",
  description: "",
  category: "ИТ поддръжка",
  priority: "Среден",
  assignee: "Иван Петров"
};

export function TicketCreateScreen({ onCancel, onSubmit }: TicketCreateScreenProps) {
  const [form, setForm] = useState<NewTicketForm>(defaultForm);
  const [showValidation, setShowValidation] = useState(false);

  function updateField<Key extends keyof NewTicketForm>(key: Key, value: NewTicketForm[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      setShowValidation(true);
      return;
    }

    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim()
    });
  }

  return (
    <section className="panel form-panel">
      <div className="panel-heading">
        <div>
          <h2>Създаване на нов тикет</h2>
          <p>Формата регистрира заявката в текущата работна сесия</p>
        </div>
      </div>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <label className="wide">
          Заглавие
          <input
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Проблем с достъп до вътрешна система"
            type="text"
            value={form.title}
          />
          {showValidation && !form.title.trim() ? <small className="field-error">Въведете заглавие.</small> : null}
        </label>

        <label className="wide">
          Описание
          <textarea
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Опишете проблема, засегнатия процес и очакваното действие."
            rows={6}
            value={form.description}
          />
          {showValidation && !form.description.trim() ? (
            <small className="field-error">Въведете описание на тикета.</small>
          ) : null}
        </label>

        <label>
          Категория
          <select
            onChange={(event) => updateField("category", event.target.value as TicketCategory)}
            value={form.category}
          >
            {ticketCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Приоритет
          <select
            onChange={(event) => updateField("priority", event.target.value as TicketPriority)}
            value={form.priority}
          >
            {ticketPriorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <label>
          Отговорник
          <select onChange={(event) => updateField("assignee", event.target.value)} value={form.assignee}>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
        </label>

        <div className="form-actions wide">
          <button className="ghost-button" onClick={onCancel} type="button">
            Отказ
          </button>
          <button className="primary-button" type="submit">
            Запис
          </button>
        </div>
      </form>
    </section>
  );
}
