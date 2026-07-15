import { useState } from "react";
// 1. Unificamos los íconos de Lucide en un solo import
import { Shield, Zap, BarChart3, Check } from "lucide-react";
import logo from "../../assets/logo.png";
import LoginForm from "../../components/Login/LoginForm";
import RegisterPanel from "../../components/Login/RegisterPanel";

function Login() {
  // 2. Declaramos el estado para alternar entre login y registro
  const [showRegister, setShowRegister] = useState(false);

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-[0.82fr_1.35fr] gap-12 lg:gap-24 items-center bg-[radial-gradient(circle_at_top_left,#2e1065,#020617_45%)] text-slate-50 py-10 px-6 lg:px-[9%] overflow-x-hidden">
      
      {/* ================= COLUMNA IZQUIERDA (MARCA) ================= */}
      <section className="flex flex-col space-y-8 lg:pr-8">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="NovaBank logo" className="w-56 lg:w-72 h-auto" />
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight lg:leading-none">
          Tu banco, <br />
          siempre <span className="text-violet-500">cerca.</span>
        </h1>

        {/* Descripción */}
        <p className="text-slate-300 text-base lg:text-lg max-w-120 leading-relaxed">
          Gestioná tus cuentas, realizá transferencias y administrá tus
          finanzas de forma segura y simple.
        </p>

        {/* Características */}
        <div className="flex flex-col space-y-5">
          {/* Característica 1 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 shadow-lg shadow-violet-950/30">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-100 mb-1">Seguridad de nivel bancario</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-90">Protegemos tus datos y operaciones con tecnología de punta.</p>
            </div>
          </div>

          {/* Característica 2 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 shadow-lg shadow-violet-950/30">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-100 mb-1">Operaciones en segundos</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-90">Hacé transferencias y pagos de forma rápida y sin complicaciones.</p>
            </div>
          </div>

          {/* Característica 3 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 shadow-lg shadow-violet-950/30">
              <BarChart3 size={24} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-100 mb-1">Control total de tus finanzas</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-90">Visualizá tus movimientos y administrá tus cuentas en un solo lugar.</p>
            </div>
          </div>
        </div>

        {/* Tarjeta de NovaBank */}
        <div className="w-71.25 h-41.25 bg-linear-to-br from-violet-600 to-violet-900 rounded-[1.4rem] p-[1.3rem] flex flex-col justify-between shadow-[0_15px_40px_rgba(124,58,237,0.35)] border border-white/10">
          <div className="w-11.5 h-8.5 rounded-[0.55rem] bg-linear-to-br from-yellow-400 to-yellow-500"></div>

          <p className="text-base tracking-[2.5px] text-white font-mono">
            1234 5678 9012 3456
          </p>

          <div className="flex justify-between items-center text-white/80 text-sm font-mono">
            <span>08/28</span>
            <strong className="tracking-[1px]">NOVABANK</strong>
          </div>
        </div>
      </section>

      {/* ================= COLUMNA DERECHA (FORMULARIOS) ================= */}
      <section className="w-full max-w-260 min-h-140 grid grid-cols-1 md:grid-cols-2 bg-slate-900/80 border border-violet-500/20 rounded-4xl overflow-hidden shadow-2xl shadow-violet-950/20">
        {showRegister ? (
          <>
            {/* Banner publicitario de vuelta al Login */}
            <div className="p-8 lg:p-12 flex flex-col justify-center h-full bg-violet-950/10 border-b md:border-b-0 md:border-r border-slate-800/60">
              <h2 className="text-2xl lg:text-3xl font-extrabold mb-2 text-white">¿Ya tenés cuenta?</h2>
              <p className="text-sm text-slate-400 mb-6">Ingresá con tus datos para volver a operar en NovaBank.</p>
              
              <ul className="flex flex-col space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check size={18} className="text-violet-500 shrink-0" />
                  Acceso seguro
                </li>
                <li className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check size={18} className="text-violet-500 shrink-0" />
                  Control total de tus cuentas
                </li>
                <li className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check size={18} className="text-violet-500 shrink-0" />
                  Historial de operaciones
                </li>
                <li className="flex items-center gap-3 text-slate-300 text-sm">
                  <Check size={18} className="text-violet-500 shrink-0" />
                  Soporte 24/7
                </li>
              </ul>

              <button
                type="button"
                onClick={() => setShowRegister(false)}
                className="w-full py-3 rounded-xl bg-linear-to-br from-violet-600 to-purple-500 text-white font-bold text-center cursor-pointer hover:opacity-95 active:scale-[0.98] transition-all shadow-lg shadow-violet-950/20"
              >
                Iniciar sesión
              </button>
            </div>
            
            {/* Formulario de registro */}
            <RegisterPanel showRegister={showRegister} setShowRegister={setShowRegister} />
          </>
        ) : (
          <>
            {/* Formulario normal de Login */}
            <LoginForm />
            
            {/* Banner publicitario de "Registrarme" */}
            <RegisterPanel showRegister={showRegister} setShowRegister={setShowRegister} />
          </>
        )}
      </section>
    </main>
  );
}

export default Login;