// Mapeo dinámico de colores de texto para los montos métricos
const valueColors = {
  purple: "text-violet-400",
  green: "text-emerald-400",
  expense: "text-rose-400",
};

function AdminMetricCard({ metrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {metrics.map((metric) => {
        const textColor = valueColors[metric.variant] || "text-white";

        return (
          <div key={metric.id} className="border border-violet-500/20 rounded-3xl bg-[#111128] p-6 sm:p-8 relative">
            <p className="text-xs uppercase tracking-wider text-[#8b87a5] font-extrabold mb-2">
              {metric.label}
            </p>
            <h3 className={`text-3xl sm:text-4xl font-semibold mb-2 ${textColor}`}>
              {metric.value}
            </h3>
            <span className="text-sm text-[#8b87a5]">{metric.change}</span>
          </div>
        );
      })}
    </div>
  );
}

export default AdminMetricCard;