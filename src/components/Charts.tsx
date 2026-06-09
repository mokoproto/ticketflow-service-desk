export interface ChartDatum {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: ChartDatum[];
  title: string;
  subtitle?: string;
}

export function BarChart({ data, title, subtitle }: BarChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <section className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>

      <div className="bar-chart">
        {data.map((item) => (
          <div className="bar-row" key={item.label}>
            <span className="bar-label">{item.label}</span>
            <div className="bar-track" aria-label={`${item.label}: ${item.value}`}>
              <span
                className="bar-fill"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

interface DonutChartProps {
  data: ChartDatum[];
  title: string;
}

export function DonutChart({ data, title }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let offset = 0;

  return (
    <section className="panel donut-panel">
      <div className="panel-heading">
        <div>
          <h2>{title}</h2>
          <p>Разпределение по текущи работни данни</p>
        </div>
      </div>
      <div className="donut-layout">
        <svg className="donut" viewBox="0 0 42 42" role="img" aria-label={title}>
          <circle className="donut-ring" cx="21" cy="21" r="15.915" />
          {data.map((item) => {
            const size = (item.value / total) * 100;
            const segment = (
              <circle
                className="donut-segment"
                cx="21"
                cy="21"
                key={item.label}
                r="15.915"
                stroke={item.color}
                strokeDasharray={`${size} ${100 - size}`}
                strokeDashoffset={25 - offset}
              />
            );
            offset += size;
            return segment;
          })}
          <text className="donut-value" x="21" y="20">
            {total}
          </text>
          <text className="donut-caption" x="21" y="25">
            тикета
          </text>
        </svg>

        <div className="legend">
          {data.map((item) => (
            <div className="legend-item" key={item.label}>
              <span style={{ backgroundColor: item.color }} />
              <strong>{item.label}</strong>
              <em>{item.value}</em>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
