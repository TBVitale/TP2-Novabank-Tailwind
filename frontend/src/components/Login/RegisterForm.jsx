import { useState } from "react";
import { Check } from "lucide-react";
import { useBank } from "../../context/BankContext";

function RegisterForm({ onCancel }) {
  const { register } = useBank();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

const handleRegister = async (e) => {
    e.preventDefault();
   const result = await register({ name, email, dni, password });

    if (result.success) {
      setError("");
      setIsRegistered(true);
      setTimeout(() => {
        setIsRegistered(false);
        onCancel(); // Vuelve a la pantalla de login
      }, 2000);
    } else {
      setError(result.error);
    }
  };

  if (isRegistered) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400">
          <Check size={32} />
        </div>
        <h3 className="text-xl font-bold text-white">¡Cuenta creada con éxito!</h3>
        <p className="text-sm text-slate-400">Redirigiéndote al inicio de sesión...</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl lg:text-3xl font-extrabold mb-1 text-white">Crear cuenta</h2>
      <p className="text-sm text-slate-400 mb-6">Completá tus datos para abrir tu cuenta NovaBank.</p>

      <form onSubmit={handleRegister} className="flex flex-col space-y-3">
        {/* Nombre Completo */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Nombre completo</label>
          <input
            type="text"
            placeholder="Juan Pérez"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-2 px-3 rounded-lg border border-slate-800 bg-slate-950/50 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 text-sm transition-colors"
            required
          />
        </div>

        {/* Correo Electrónico */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Correo electrónico</label>
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-2 px-3 rounded-lg border border-slate-800 bg-slate-950/50 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 text-sm transition-colors"
            required
          />
        </div>

        {/* DNI */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">DNI</label>
          <input
            type="text"
            placeholder="12345678"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="w-full py-2 px-3 rounded-lg border border-slate-800 bg-slate-950/50 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 text-sm transition-colors"
            required
          />
        </div>

        {/* Contraseña */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Contraseña</label>
          <input
            type="password"
            placeholder="Creá una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2 px-3 rounded-lg border border-slate-800 bg-slate-950/50 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 text-sm transition-colors"
            required
          />
        </div>

        {/* Mensaje de Error */}
        {error && (
          <p className="text-red-500 text-xs font-semibold mt-1">{error}</p>
        )}

        <button
          type="submit"
          className="w-full mt-3 py-2.5 rounded-lg bg-linear-to-br from-violet-600 to-purple-500 text-white font-bold text-center text-sm cursor-pointer hover:opacity-95 transition-all shadow-md shadow-violet-950/20"
        >
          Crear cuenta
        </button>
      </form>

      <button
        type="button"
        onClick={onCancel}
        className="w-full mt-2 py-2 rounded-lg bg-transparent border border-slate-800 text-slate-300 font-medium text-center text-sm cursor-pointer hover:bg-slate-800/30 transition-all"
      >
        Ya tengo cuenta
      </button>
    </>
  );
}

export default RegisterForm;