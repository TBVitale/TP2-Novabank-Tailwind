import { useState } from "react";
import { X, User, Mail, Landmark, FileText, Check } from "lucide-react";
import { useBank } from "../../context/BankContext";

function ProfileModal({ isOpen, onClose }) {
  const { currentUser, updateUserProfile } = useBank();
  
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [dni, setDni] = useState(currentUser?.dni || "");
  const [alias, setAlias] = useState(currentUser?.alias || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isAdmin = currentUser?.role === "admin";

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validar según el rol
    if (isAdmin) {
      if (!name.trim() || !email.trim()) {
        setError("Todos los campos básicos son requeridos.");
        return;
      }
    } else {
      if (!name.trim() || !email.trim() || !dni.trim() || !alias.trim()) {
        setError("Todos los campos básicos son requeridos.");
        return;
      }
    }

    try {
      const updateData = isAdmin ? {
        name: name.trim(),
        email: email.trim().toLowerCase(),
      } : {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        dni: dni.trim(),
        alias: alias.trim().toLowerCase(),
      };

      updateUserProfile(updateData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1000);
    } catch {
      setError("Ocurrió un error al actualizar los datos.");
    }
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      {/* Backdrop con Blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Caja del Modal */}
      <div className="relative w-full max-w-md bg-[#12122b] border border-violet-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-fade-in text-slate-50">
        
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-all cursor-pointer"
          type="button"
          aria-label="Cerrar modal"
        >
          <X size={18} />
        </button>

        {/* Título */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User size={20} className="text-violet-400" />
            Editar mi perfil
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Modificá tus datos personales básicos de facturación y contacto.
          </p>
        </div>

        {/* Mensajes de Alerta */}
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold leading-relaxed">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <Check size={16} /> ¡Perfil actualizado con éxito!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Input Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Nombre Completo
            </label>
            <div className="flex items-center rounded-xl border border-violet-500/20 bg-white/4 px-3.5 py-3 focus-within:border-violet-500 transition-all">
              <User size={16} className="text-violet-400 shrink-0 mr-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre completo"
                className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-slate-600"
              />
            </div>
          </div>

          {/* Input Correo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Correo Electrónico
            </label>
            <div className="flex items-center rounded-xl border border-violet-500/20 bg-white/4 px-3.5 py-3 focus-within:border-violet-500 transition-all">
              <Mail size={16} className="text-violet-400 shrink-0 mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-slate-600"
              />
            </div>
          </div>

          {/* Input DNI (Solo para clientes) */}
          {!isAdmin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Documento Nacional de Identidad (DNI)
              </label>
              <div className="flex items-center rounded-xl border border-violet-500/20 bg-white/4 px-3.5 py-3 focus-within:border-violet-500 transition-all">
                <FileText size={16} className="text-violet-400 shrink-0 mr-3" />
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  placeholder="Número de documento"
                  className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-slate-600"
                />
              </div>
            </div>
          )}

          {/* Input Alias (Solo para clientes) */}
          {!isAdmin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Alias de Cuenta CBU
              </label>
              <div className="flex items-center rounded-xl border border-violet-500/20 bg-white/4 px-3.5 py-3 focus-within:border-violet-500 transition-all">
                <Landmark size={16} className="text-violet-400 shrink-0 mr-3" />
                <input
                  type="text"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="ejemplo.nova.bank"
                  className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-slate-600"
                />
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-linear-to-br from-violet-600 to-purple-500 text-white font-bold text-xs transition-all cursor-pointer hover:brightness-110 active:scale-95 shadow-lg shadow-violet-950/30"
            >
              Guardar cambios
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ProfileModal;
