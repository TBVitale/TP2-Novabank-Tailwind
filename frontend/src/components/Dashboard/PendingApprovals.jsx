import { Check, X } from "lucide-react";

function PendingApprovals({ approvals = [], onApprove, onReject }) {
  return (
    <section className="border border-violet-500/20 rounded-3xl bg-[#111128] p-6 sm:p-8">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-6">
        Usuarios pendientes de aprobación
      </h2>
      
      <div className="flex flex-col">
        {approvals.length === 0 ? (
          <p className="text-slate-500 text-sm py-4 text-center">No hay solicitudes de aprobación pendientes.</p>
        ) : (
          approvals.map((user) => (
            <article className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-slate-400/10 py-4 last:border-none" key={user.id}>
              <div>
                <h3 className="text-base font-semibold text-slate-100">{user.name}</h3>
                <p className="mt-0.5 mb-1 text-xs sm:text-sm text-[#8b87a5]">
                  DNI: {user.dni} • {user.email}
                </p>
                <span className="text-[11px] sm:text-xs text-slate-500">Registrado: {user.date}</span>
              </div>
              
              {/* Botones de acción (Aprobar / Rechazar) */}
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => onApprove && onApprove(user)}
                  className="border-0 p-2 rounded-lg cursor-pointer bg-emerald-500/15 text-emerald-400 hover:scale-105 active:scale-95 transition-all"
                  aria-label="Aprobar usuario"
                >
                  <Check size={18} />
                </button>
                <button 
                  type="button" 
                  onClick={() => onReject && onReject(user)}
                  className="border-0 p-2 rounded-lg cursor-pointer bg-rose-500/15 text-rose-400 hover:scale-105 active:scale-95 transition-all"
                  aria-label="Rechazar usuario"
                >
                  <X size={18} />
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default PendingApprovals;