import { Shield, AlertTriangle, Cpu, UserCheck } from "lucide-react";

const logIconMap = {
  security: Shield,
  error: AlertTriangle,
  system: Cpu,
  user: UserCheck,
};

const statusClasses = {
  success: {
    bg: "bg-emerald-500/15 text-emerald-400",
    text: "text-emerald-400",
  },
  critical: {
    bg: "bg-rose-500/15 text-rose-400",
    text: "text-rose-400",
  },
  info: {
    bg: "bg-sky-500/15 text-sky-400",
    text: "text-sky-400",
  },
};

function SystemLogs({ logs }) {
  return (
    <section className="border border-violet-500/20 rounded-3xl bg-[#111128] p-6 sm:p-8">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-6">Logs e Historial del Sistema</h2>
      
      <div className="flex flex-col">
        {logs.map((log) => {
          const LogIcon = logIconMap[log.type] || Shield;
          const status = statusClasses[log.status] || {
            bg: "bg-slate-800 text-slate-400",
            text: "text-slate-300",
          };
          
          return (
            <article 
              className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-slate-400/10 py-4 last:border-none" 
              key={log.id}
            >
              {/* Icono del Log con fondo dinámico */}
              <span className={`w-12.5 h-12.5 sm:w-14.5 sm:h-14.5 flex items-center justify-center rounded-2xl shrink-0 ${status.bg}`}>
                <LogIcon size={21} />
              </span>
              
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-100">{log.action}</h3>
                <p className="text-xs sm:text-sm text-[#8b87a5]">{log.time}</p>
              </div>
              
              {/* Texto de Estado */}
              <strong className={`text-xs sm:text-sm font-bold col-start-2 sm:col-start-auto justify-self-start sm:justify-self-end ${status.text}`}>
                {log.status.toUpperCase()}
              </strong>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default SystemLogs;