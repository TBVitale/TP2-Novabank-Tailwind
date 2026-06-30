import { Check } from "lucide-react";
import RegisterForm from "./RegisterForm";

function RegisterPanel({ showRegister, setShowRegister }) {
  if (showRegister) {
    return (
      <div className="p-8 lg:p-12 flex flex-col justify-center h-full bg-slate-900/40 animate-fade-in">
        <RegisterForm onCancel={() => setShowRegister(false)} />
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 flex flex-col justify-center h-full bg-violet-950/10">
      <h2 className="text-2xl lg:text-3xl font-extrabold mb-2 text-white">¿No tenés cuenta?</h2>
      <p className="text-sm text-slate-400 mb-6">Creá tu cuenta en segundos y empezá a disfrutar NovaBank.</p>

      <ul className="flex flex-col space-y-3 mb-8">
        <li className="flex items-center gap-3 text-slate-300 text-sm">
          <Check size={18} className="text-violet-500 shrink-0" />
          Apertura 100% online
        </li>
        <li className="flex items-center gap-3 text-slate-300 text-sm">
          <Check size={18} className="text-violet-500 shrink-0" />
          Sin costo de mantenimiento
        </li>
        <li className="flex items-center gap-3 text-slate-300 text-sm">
          <Check size={18} className="text-violet-500 shrink-0" />
          Transferencias ilimitadas
        </li>
        <li className="flex items-center gap-3 text-slate-300 text-sm">
          <Check size={18} className="text-violet-500 shrink-0" />
          Soporte 24/7
        </li>
      </ul>

      <button
        type="button"
        onClick={() => setShowRegister(true)}
        className="w-full py-3 rounded-xl bg-linear-to-br from-violet-600 to-purple-500 text-white font-bold text-center cursor-pointer hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-violet-950/20"
      >
        Registrarme
      </button>
    </div>
  );
}

export default RegisterPanel;