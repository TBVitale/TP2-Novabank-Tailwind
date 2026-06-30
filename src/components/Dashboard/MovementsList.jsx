import { useState } from "react";
import { BanknoteArrowDown, ShoppingBag, ArrowLeftRight, WalletCards, HelpCircle, X } from "lucide-react";

// Mapeo de íconos según la categoría
const iconMap = {
  salary: BanknoteArrowDown,
  shopping: ShoppingBag,
  transfer: ArrowLeftRight,
  fci: WalletCards,
};

// Mapeo dinámico de colores según el tipo de movimiento
const typeClasses = {
  income: {
    bg: "bg-emerald-500/15 text-emerald-400",
    text: "text-emerald-400",
  },
  expense: {
    bg: "bg-rose-500/15 text-rose-400",
    text: "text-rose-400",
  },
  transfer: {
    bg: "bg-sky-500/15 text-violet-400",
    text: "text-violet-400",
  },
};

function MovementsList({ movements }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mostrar un máximo de 4 movimientos en la tarjeta principal
  const previewMovements = movements.slice(0, 4);

  return (
    <section className="border border-violet-500/20 rounded-3xl bg-[#111128] p-6 sm:p-8">
      
      {/* Cabecera Tarjeta */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-white">Últimos movimientos</h2>
        {movements.length > 4 && (
          <button 
            type="button" 
            onClick={() => setIsModalOpen(true)}
            className="border-0 bg-transparent text-violet-400 hover:text-violet-300 font-extrabold text-sm cursor-pointer transition-colors"
          >
            Ver todos
          </button>
        )}
      </div>

      {/* Lista Principal (Vista Previa de 4 elementos) */}
      <div className="flex flex-col">
        {previewMovements.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">No registrás movimientos aún.</p>
        ) : (
          previewMovements.map((movement, index) => {
            const IconComponent = iconMap[movement.icon] || HelpCircle;
            const colors = typeClasses[movement.type] || {
              bg: "bg-slate-800 text-slate-400",
              text: "text-slate-300",
            };

            return (
              <article 
                className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-slate-400/10 py-4 last:border-none" 
                key={`preview-${movement.title}-${index}`}
              >
                {/* Ícono */}
                <span className={`w-12.5 h-12.5 sm:w-14.5 sm:h-14.5 flex items-center justify-center rounded-2xl shrink-0 ${colors.bg}`}>
                  <IconComponent size={21} />
                </span>

                {/* Info */}
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-100 truncate">
                    {movement.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8b87a5]">
                    {movement.date}
                  </p>
                </div>

                {/* Monto */}
                <strong className={`text-base sm:text-lg font-bold col-start-2 sm:col-start-auto justify-self-start sm:justify-self-end ${colors.text}`}>
                  {movement.amount}
                </strong>
              </article>
            );
          })
        )}
      </div>

      {/* ================= MODAL: HISTORIAL COMPLETO ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsModalOpen(false)} 
          />

          {/* Caja del Modal */}
          <div className="relative w-full max-w-xl bg-[#111128] border border-violet-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-fade-in text-slate-50 flex flex-col max-h-[80vh]">
            
            {/* Botón de cerrar */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-all cursor-pointer"
              type="button"
              aria-label="Cerrar modal"
            >
              <X size={18} />
            </button>

            {/* Cabecera */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Todos los movimientos</h2>
              <p className="text-xs text-[#8b87a5] mt-1">
                Historial completo de tus ingresos y egresos ({movements.length} transacciones)
              </p>
            </div>

            {/* Lista Scrollable */}
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-1 min-h-0 border-t border-b border-slate-400/10">
              {movements.map((movement, index) => {
                const IconComponent = iconMap[movement.icon] || HelpCircle;
                const colors = typeClasses[movement.type] || {
                  bg: "bg-slate-800 text-slate-400",
                  text: "text-slate-300",
                };

                return (
                  <article 
                    className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-slate-400/5 py-4 last:border-none" 
                    key={`modal-${movement.title}-${index}`}
                  >
                    {/* Ícono */}
                    <span className={`w-12.5 h-12.5 sm:w-14.5 sm:h-14.5 flex items-center justify-center rounded-2xl shrink-0 ${colors.bg}`}>
                      <IconComponent size={21} />
                    </span>

                    {/* Info */}
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-slate-100 truncate">
                        {movement.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8b87a5]">
                        {movement.date}
                      </p>
                    </div>

                    {/* Monto */}
                    <strong className={`text-base sm:text-lg font-bold col-start-2 sm:col-start-auto justify-self-start sm:justify-self-end ${colors.text}`}>
                      {movement.amount}
                    </strong>
                  </article>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition-all cursor-pointer hover:brightness-110 active:scale-95 shadow-lg shadow-violet-950/30"
              >
                Cerrar historial
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default MovementsList;