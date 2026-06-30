import { Link } from "react-router-dom";

// Mapeo dinámico de colores de fondo para los círculos de los íconos
const toneClasses = {
  purple: "bg-violet-500/20 text-violet-300",
  violet: "bg-violet-500/20 text-violet-300",
  green: "bg-emerald-500/15 text-emerald-400",
  yellow: "bg-amber-500/15 text-amber-400",
  blue: "bg-sky-500/15 text-sky-400",
  pink: "bg-pink-500/15 text-pink-400",
};

function QuickActions({ actions }) {
  return (
    <section className="mt-8">
      <h2 className="text-xs uppercase tracking-wider text-[#8b87a5] font-extrabold mb-5">
        Accesos rápidos
      </h2>

      {/* Grilla responsiva de accesos: 
          2 columnas en móvil, 3 en tablet (md:) y 6 en pantallas grandes (lg:) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          const bgTone = toneClasses[action.tone] || "bg-slate-800 text-slate-300";

          return (
            <Link
              key={action.id || action.label}
              to={action.path || "#"}
              className="flex flex-col items-center justify-center gap-3 border border-violet-500/20 rounded-[20px] bg-[#111128] text-violet-300 cursor-pointer p-4 min-h-31 sm:min-h-37.5 transition-all hover:-translate-y-1 hover:border-violet-500/50"
            >
              {/* Contenedor circular del ícono */}
              <div className={`w-17.5 h-17.5 flex items-center justify-center rounded-2xl ${bgTone}`}>
                <Icon size={24} />
              </div>
              <span className="text-sm font-medium tracking-wide text-center">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;