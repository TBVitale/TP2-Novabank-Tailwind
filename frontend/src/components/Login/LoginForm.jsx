import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBank } from "../../context/BankContext";

function LoginForm() {
  const { login } = useBank();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);

    if (result.success) {
      setError("");
      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/cliente");
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="p-8 lg:p-12 flex flex-col justify-center h-full border-b md:border-b-0 md:border-r border-slate-800/60">
      <h2 className="text-2xl lg:text-3xl font-extrabold mb-1 text-white">Iniciar sesión</h2>
      <p className="text-sm text-slate-400 mb-6">Ingresá a tu cuenta de NovaBank.</p>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {/* Input Email */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Correo electrónico</label>
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 rounded-xl border border-slate-800 bg-slate-950/50 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
            required
          />
        </div>

        {/* Input Contraseña */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Contraseña</label>
          <input
            type="password"
            placeholder="Ingresá tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 rounded-xl border border-slate-800 bg-slate-950/50 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors"
            required
          />
        </div>

        {/* Mensaje de Error */}
        {error && (
          <p className="text-red-500 text-xs font-semibold mt-1">{error}</p>
        )}

        {/* Botón Ingresar */}
        <button
          type="submit"
          className="w-full mt-4 py-3 rounded-xl bg-linear-to-br from-violet-600 to-purple-500 text-white font-bold text-center cursor-pointer hover:opacity-95 active:scale-[0.98] transition-all shadow-md shadow-violet-950/30"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default LoginForm;