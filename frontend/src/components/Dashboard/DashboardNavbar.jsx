import { useState } from "react";
import { Menu, LogOut, User, X } from "lucide-react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { useBank } from "../../context/BankContext";

function DashboardNavbar({
  userInitials = "FG",
  onToggleSidebar,
  isSidebarOpen,
}) {
  const { logout } = useBank();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-23 flex items-center justify-between border-b border-violet-500/20 bg-[#101025] px-6 sm:px-12 fixed top-0 left-0 w-full z-106">
      
      {/* Botón Menu lateral + Logo */}
      <div className="flex items-center gap-4">
        <button
          className="w-11.5 h-11.5 flex items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-purple-500 text-slate-50 cursor-pointer active:scale-95 transition-transform"
          type="button"
          aria-label="Abrir menu"
          onClick={onToggleSidebar}
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <img src={logo} alt="NovaBank" className="w-35 sm:w-46 h-auto" />
      </div>

      {/* Acciones del Dashboard (Avatar) */}
      <div className="flex items-center gap-4">
        {/* Contenedor del Perfil (Avatar + Menu Desplegable) */}
        <div className="relative">
          <button
            className="w-12.5 h-12.5 sm:w-14.5 sm:h-14.5 rounded-full bg-linear-to-br from-purple-500 to-violet-600 font-extrabold text-sm text-slate-50 cursor-pointer shadow-[0_8px_24px_rgba(124,58,237,0.3)] hover:opacity-90 active:scale-95 transition-all"
            type="button"
            aria-label="Perfil"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            {userInitials}
          </button>

          {/* Menú Desplegable de Perfil */}
          {showProfileMenu && (
            <div className="absolute top-[120%] right-0 bg-[#1e1b2e] border border-[#3b2d54] rounded-lg p-2 min-w-40 flex flex-col gap-1 z-100 shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
              <button 
                type="button"
                onClick={() => {
                  setIsProfileModalOpen(true);
                  setShowProfileMenu(false);
                }}
                className="bg-transparent border-none text-slate-100 py-2 px-3 text-left flex items-center gap-2 cursor-pointer rounded-md w-full text-sm transition-colors hover:bg-[#2d264d]"
              >
                <User size={16} /> Mi perfil
              </button>
        
              <hr className="border-0 border-t border-[#3b2d54] my-1" />
              
              <button 
                type="button" 
                className="bg-transparent border-none py-2 px-3 text-left flex items-center gap-2 cursor-pointer rounded-md w-full text-sm transition-colors text-rose-500 hover:bg-rose-500/10" 
                onClick={handleLogout}
              >
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de edición de perfil */}
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </header>
  );
}

export default DashboardNavbar;