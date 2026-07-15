import { Home, User, Activity, ArrowLeftRight, CreditCard, BarChart3, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar({ isOpen, onClose, isAdmin = false }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (!isOpen) return null; // Si no está abierta, no dibuja nada

  // Determinar si un link de ruta estándar está activo
  const isActive = (path) => location.pathname === path;

  // Determinar si un hash de administración está activo
  const isActiveHash = (hash) => {
    if (location.pathname !== "/admin") return false;
    if (!location.hash && hash === "inicio") return true;
    return location.hash === `#${hash}`;
  };

  // Manejar el scroll automático a las secciones del administrador
  const handleAdminScroll = (id) => {
    onClose(); // Cerrar sidebar en mobile

    if (location.pathname === "/admin") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      // Actualizamos el hash en el navegador
      window.location.hash = id;
    } else {
      navigate(`/admin#${id}`);
    }
  };

  // Clases base para los enlaces del menú
  const linkBaseClass = "w-full text-left bg-transparent border-none text-[#b3b0c2] no-underline text-base font-medium py-3 px-4 rounded-lg flex items-center transition-all duration-200 hover:text-white hover:bg-[#231d38] hover:pl-5 cursor-pointer";
  const linkActiveClass = "text-white bg-violet-600 hover:bg-violet-600 hover:pl-4";

  return (
    <aside className="fixed top-23 left-0 w-65 h-[calc(100vh-92px)] bg-[#13111c] border-r border-[#251d3a] p-6 z-105 flex flex-col animate-[slideIn_0.3s_ease-out]">
      
      {/* Botón para cerrar la sidebar en móviles */}
      <button 
        type="button" 
        onClick={onClose} 
        className="hidden max-md:flex items-center justify-center p-2 text-slate-400 hover:text-white mb-4 self-end cursor-pointer"
      >
        <X size={20} />
      </button>

      <nav className="flex flex-col gap-2">
        {isAdmin ? (
          <>
            {/* Panel Principal */}
            <button 
              type="button"
              onClick={() => handleAdminScroll("inicio")}
              className={`${linkBaseClass} ${isActiveHash("inicio") ? linkActiveClass : ""}`}
            >
              <Home size={18} className="mr-3" /> Panel Principal
            </button>
            
            {/* Gestión de Usuarios */}
            <button 
              type="button"
              onClick={() => handleAdminScroll("usuarios")}
              className={`${linkBaseClass} ${isActiveHash("usuarios") ? linkActiveClass : ""}`}
            >
              <User size={18} className="mr-3" /> Gestión de Usuarios
            </button>
            
            {/* Logs del Sistema */}
            <button 
              type="button"
              onClick={() => handleAdminScroll("logs")}
              className={`${linkBaseClass} ${isActiveHash("logs") ? linkActiveClass : ""}`}
            >
              <Activity size={18} className="mr-3" /> Logs del Sistema
            </button>
          </>
        ) : (
          <>
            {/* Inicio */}
            <Link 
              to="/cliente" 
              onClick={onClose} 
              className={`${linkBaseClass} ${isActive("/cliente") ? linkActiveClass : ""}`}
            >
              <Home size={18} className="mr-3" /> Inicio
            </Link>

            {/* Transferir */}
            <Link 
              to="/transferir" 
              onClick={onClose} 
              className={`${linkBaseClass} ${isActive("/transferir") ? linkActiveClass : ""}`}
            >
              <ArrowLeftRight size={18} className="mr-3" /> Transferir
            </Link>

            {/* Mis Tarjetas */}
            <Link 
              to="/tarjetas" 
              onClick={onClose} 
              className={`${linkBaseClass} ${isActive("/tarjetas") ? linkActiveClass : ""}`}
            >
              <CreditCard size={18} className="mr-3" /> Mis Tarjetas
            </Link>

            {/* Inversiones */}
            <Link 
              to="/inversiones" 
              onClick={onClose} 
              className={`${linkBaseClass} ${isActive("/inversiones") ? linkActiveClass : ""}`}
            >
              <BarChart3 size={18} className="mr-3" /> Inversiones
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;