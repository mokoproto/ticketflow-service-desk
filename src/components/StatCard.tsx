interface StatCardProps {
  label: string;
  value: string | number;
  hint: string;
  tone?: "blue" | "green" | "amber" | "red";
}

export function StatCard({ label, value, hint, tone = "blue" }: StatCardProps) {
  return (
    <article className={`stat-card tone-${tone}`}>
      <div className="stat-icon" aria-hidden="true">
        {tone === "green" ? "✓" : tone === "amber" ? "!" : tone === "red" ? "↑" : "•"}
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{hint}</small>
      </div>
    </article>
  );
}
