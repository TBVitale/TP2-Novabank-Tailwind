// Mapeo dinámico de colores para los círculos de las inversiones
const toneClasses = {
  purple: "bg-violet-400",
  green: "bg-emerald-400",
  yellow: "bg-amber-400",
};

function InvestmentsList({ investments }) {
  return (
    <section className="border border-violet-500/20 rounded-3xl bg-[#111128] p-6 sm:p-8 self-start">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-6">
        Inversiones activas
      </h2>

      <div className="grid gap-0">
        {investments.map((investment) => {
          const dotColor = toneClasses[investment.tone] || "bg-slate-500";

          return (
            <div 
              className="grid grid-cols-[16px_1fr] sm:grid-cols-[16px_1fr_auto] items-center gap-4 text-violet-300 min-h-18 border-b border-slate-400/10 py-4 last:border-none" 
              key={investment.name}
            >
              {/* Círculo indicador de color */}
              <span className={`w-3.25 h-3.25 rounded-full shrink-0 ${dotColor}`} />
              
              {/* Nombre de la inversión */}
              <p className="m-0 font-bold text-slate-100 text-sm sm:text-base">
                {investment.name}
              </p>
              
              {/* Monto invertido */}
              <strong className="text-sm sm:text-lg font-bold text-violet-300 col-start-2 sm:col-start-auto justify-self-start sm:justify-self-end">
                {investment.value}
              </strong>
            </div>
          )})}
      </div>
    </section>
  );
}

export default InvestmentsList;