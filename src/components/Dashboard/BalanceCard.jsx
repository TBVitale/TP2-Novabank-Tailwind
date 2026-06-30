import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Mapeo dinámico de colores según la variante de saldo de la base de datos
const variantClasses = {
  income: "text-emerald-400",
  expense: "text-rose-400",
  invested: "text-violet-400",
};

function BalanceCard({ balance, monthlyChange, updatedAt, stats }) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <section className="relative overflow-hidden rounded-[26px] border border-violet-500/30 bg-[radial-gradient(circle_at_90%_20%,rgba(139,92,246,0.28),transparent_28%)] bg-linear-to-br from-[#210542] to-[#111026] shadow-[0_20px_60px_rgba(124,58,237,0.18)]">
      
      {/* Efecto de brillo de fondo */}
      <div className="absolute -top-17.5 -right-10 w-75 h-75 rounded-full bg-violet-500/10 pointer-events-none" />

      {/* Contenedor del balance */}
      <div className="relative p-8 md:p-12">
        <div className="flex justify-between items-center">
          <p className="text-xs uppercase tracking-wider text-[#8b87a5] font-extrabold">Saldo disponible</p>
          <button 
            type="button" 
            className="text-slate-400 hover:text-violet-400 cursor-pointer flex items-center transition-colors"
            onClick={() => setShowBalance(!showBalance)}
            aria-label={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {/* Monto de Saldo */}
        <h2 className="my-3 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-none">
          {showBalance ? balance : "$ ••••••••"}
        </h2>

        {/* Metadatos (Pill de incremento y última actualización) */}
        <div className="flex items-center flex-wrap gap-4 text-sm text-[#8b87a5]">
          <span className="border border-emerald-400/30 rounded-full bg-emerald-500/10 text-emerald-400 py-1.5 px-3.5 font-extrabold">
            {monthlyChange}
          </span>
          <span>{updatedAt}</span>
        </div>

        {/* Grilla de Mini-Estadísticas (Ingresos, Consumos, Inversiones) */}
        <div className="flex flex-col sm:flex-row gap-6 mt-8">
          {stats.map((stat) => (
            <div 
              key={stat.label} 
              className="min-w-37.5 border-b sm:border-b-0 sm:border-r border-violet-500/20 pb-4 sm:pb-0 last:border-none last:pb-0"
            >
              <span className="block text-[10px] text-[#8b87a5] uppercase tracking-wider mb-1">
                {stat.label}
              </span>
              <strong className={`text-xl sm:text-2xl font-bold ${variantClasses[stat.variant] || "text-white"}`}>
                {showBalance ? stat.value : "••••"}
              </strong>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BalanceCard;