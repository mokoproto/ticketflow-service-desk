import type { Employee, Ticket } from "../types";

interface EmployeesScreenProps {
  employees: Employee[];
  tickets: Ticket[];
}

export function EmployeesScreen({ employees, tickets }: EmployeesScreenProps) {
  function activeTasksFor(employeeName: string) {
    return tickets.filter((ticket) => ticket.assignee === employeeName && ticket.status !== "Приключен").length;
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>Служители</h2>
          <p>Екип и текущо натоварване по активни задачи</p>
        </div>
      </div>

      <div className="employee-grid">
        {employees.map((employee) => (
          <article className="employee-card" key={employee.id}>
            <div className="employee-avatar" aria-hidden="true">
              {employee.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <div>
              <h3>{employee.name}</h3>
              <p>{employee.email}</p>
            </div>
            <dl>
              <div>
                <dt>Отдел</dt>
                <dd>{employee.department}</dd>
              </div>
              <div>
                <dt>Длъжност</dt>
                <dd>{employee.position}</dd>
              </div>
              <div>
                <dt>Активни задачи</dt>
                <dd>{activeTasksFor(employee.name) || employee.activeTasks}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
