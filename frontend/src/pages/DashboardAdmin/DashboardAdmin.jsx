import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBank } from "../../context/BankContext";
import DashboardNavbar from "../../components/Dashboard/DashboardNavbar";
import AdminMetricCard from "../../components/Dashboard/AdminMetricCard";
import PendingApprovals from "../../components/Dashboard/PendingApprovals";
import SystemLogs from "../../components/Dashboard/SystemLogs";
import { dashboardAdminData } from "../../data/mockData";
import Sidebar from "../../components/Dashboard/Sidebar";
import { Users, Shield, Edit, Trash2 } from "lucide-react";

function DashboardAdmin() {
  const { currentUser, users, setUsers } = useBank();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth >= 768);
  const location = useLocation();

  // Sincronizar la sección activa con el hash de la URL
  const hash = location.hash.replace("#", "");
  const activeSection = (hash === "usuarios" || hash === "logs") ? hash : "inicio";

  const admin = currentUser || {
    name: "Admin Nova",
    initials: "AN",
    role: "admin",
  };

  // Estado persistente de las aprobaciones pendientes
  const [pendingApprovals, setPendingApprovals] = useState(() => {
    const saved = localStorage.getItem("novabank_pending_approvals");
    return saved ? JSON.parse(saved) : dashboardAdminData.pendingApprovals;
  });

  useEffect(() => {
    localStorage.setItem("novabank_pending_approvals", JSON.stringify(pendingApprovals));
  }, [pendingApprovals]);

  // Acción: Aprobar el alta de un usuario
  const handleApprove = (user) => {
    const confirmApprove = window.confirm(`¿Aprobar el registro de ${user.name}?`);
    if (!confirmApprove) return;

    // Crear la nueva cuenta de cliente con valores iniciales
    const newUser = {
      id: "cliente-" + Date.now(),
      name: user.name,
      initials: user.name.split(" ").map(n => n[0]).join("").toUpperCase(),
      email: user.email,
      password: user.name.split(" ")[0].toLowerCase() + "123", // Contraseña por defecto
      dni: user.dni.replace(/\./g, ""),
      status: "Cuenta activa",
      role: "client",
      balance: 100000.00, // Regalo de bienvenida
      cbu: "00000031000" + Math.floor(10000000000 + Math.random() * 90000000000),
      alias: user.name.toLowerCase().replace(/\s+/g, ".") + ".nova",
      cardNumber: "4509 " + Array.from({ length: 3 }, () => Math.floor(1000 + Math.random() * 9000)).join(" "),
      cardExpiry: "12/30",
      cards: [
        {
          id: Date.now(),
          type: "Débito NovaBank",
          number: "4509" + Math.floor(100000000000 + Math.random() * 900000000000),
          holder: user.name,
          expires: "12/30",
          cvv: Math.floor(100 + Math.random() * 900).toString(),
          frozen: false
        }
      ],
      contacts: []
    };

    setUsers((prev) => [...prev, newUser]);
    setPendingApprovals((prev) => prev.filter((p) => p.id !== user.id));
    alert(`Usuario ${user.name} aprobado y registrado en el sistema.`);
  };

  // Acción: Rechazar el alta de un usuario
  const handleReject = (user) => {
    const confirmReject = window.confirm(`¿Rechazar y eliminar la solicitud de registro de ${user.name}?`);
    if (confirmReject) {
      setPendingApprovals((prev) => prev.filter((p) => p.id !== user.id));
    }
  };

  // Acción: Ajustar saldo de un cliente
  const handleEditBalance = (userId, currentBalance) => {
    const nextBalanceStr = window.prompt("Ingrese el nuevo saldo para este usuario (ARS):", currentBalance);
    if (nextBalanceStr !== null) {
      const nextBalance = parseFloat(nextBalanceStr);
      if (isNaN(nextBalance) || nextBalance < 0) {
        alert("Por favor ingrese un monto de saldo válido.");
        return;
      }
      setUsers((prevUsers) =>
        prevUsers.map((u) => {
          if (u.id === userId) {
            return { ...u, balance: nextBalance };
          }
          return u;
        })
      );
    }
  };

  // Acción: Eliminar usuario de la base de datos
  const handleDeleteUser = (userId, userName) => {
    const confirm = window.confirm(`¿Está seguro de que desea eliminar a ${userName} de la base de datos? Esta acción es irreversible.`);
    if (confirm) {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
    }
  };

  // Filtrar los usuarios normales (clientes) para mostrarlos en la lista de gestión
  const clients = users.filter((u) => u.role === "client");

  return (
    <main className={`min-h-screen bg-[#070713] text-slate-50 pb-8 pt-23 transition-all duration-300 ${isSidebarOpen ? "md:pl-65" : "md:pl-0"}`}>
      <DashboardNavbar
        userInitials={admin.initials}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isAdmin={true}
      />

      <div className="w-full max-w-305 mx-auto px-4 md:px-8 pt-10">
        
        {/* Cabecera del Administrador */}
        <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[#8b87a5] text-[1.1rem] mb-1.5">Bienvenido de vuelta,</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              {admin.name} <span className="text-2xl">⚙️</span>
            </h1>
          </div>
          
          {/* Badge de Rol Administrador */}
          <span className="inline-flex items-center gap-2.5 rounded-full border border-purple-500/30 bg-purple-500/12 text-purple-300 py-2 px-4 font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
            {admin.role}
          </span>
        </section>

        {/* ================= CONTENIDO DE INICIO (Panel Principal) ================= */}
        {activeSection === "inicio" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            {/* Banner de Bienvenida */}
            <div className="p-6 sm:p-8 rounded-3xl border border-violet-500/20 bg-linear-to-r from-violet-950/40 to-slate-950/40 backdrop-blur-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h2 className="text-lg sm:text-xl font-bold text-white">Panel de Administración de NovaBank</h2>
                <p className="text-sm text-slate-400 max-w-160">
                  Operaciones globales en tiempo real. Gestioná altas de usuarios, balances financieros e historiales de seguridad del sistema desde este panel centralizado.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-violet-600/20 border border-violet-500/20 px-4 py-2.5 text-violet-300 text-sm font-semibold shrink-0">
                <Shield size={18} />
                Sistema protegido
              </div>
            </div>

            {/* Tarjetas de Métricas de Administrador */}
            <AdminMetricCard metrics={dashboardAdminData.metrics} />

            {/* Vista Previa de Pendientes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PendingApprovals 
                approvals={pendingApprovals} 
                onApprove={handleApprove}
                onReject={handleReject}
              />
              <div className="border border-violet-500/20 rounded-3xl bg-[#111128] p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users size={18} className="text-violet-400" />
                    Acceso Rápido a Gestión
                  </h3>
                  <p className="text-sm text-slate-400">
                    Tenés {clients.length} clientes registrados en el sistema. Podés modificar sus saldos o eliminarlos de la base de datos de manera inmediata.
                  </p>
                </div>
                <button
                  onClick={() => window.location.hash = "usuarios"}
                  className="mt-6 w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm cursor-pointer transition-all active:scale-[0.98]"
                >
                  Ir a Gestión de Usuarios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= CONTENIDO DE GESTIÓN DE USUARIOS ================= */}
        {activeSection === "usuarios" && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Aprobaciones Pendientes */}
            <PendingApprovals 
              approvals={pendingApprovals} 
              onApprove={handleApprove}
              onReject={handleReject}
            />

            {/* Tabla de Usuarios Registrados */}
            <section className="border border-violet-500/20 rounded-3xl bg-[#111128] p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Users size={22} className="text-violet-400" />
                  Base de Clientes NovaBank
                </h2>
                <span className="text-xs bg-violet-500/15 text-violet-300 border border-violet-500/20 px-3 py-1.5 rounded-lg font-bold">
                  {clients.length} Usuarios Registrados
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-400/10 text-slate-400 font-semibold">
                      <th className="py-4 px-3">Cliente / DNI</th>
                      <th className="py-4 px-3">Contacto</th>
                      <th className="py-4 px-3">Alias / CBU</th>
                      <th className="py-4 px-3 text-right">Saldo (ARS)</th>
                      <th className="py-4 px-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => {
                      return (
                        <tr key={client.id} className="border-b border-slate-400/5 hover:bg-white/1 transition-all">
                          <td className="py-4 px-3">
                            <div className="font-semibold text-slate-100">{client.name}</div>
                            <div className="text-xs text-slate-500">DNI: {client.dni}</div>
                          </td>
                          <td className="py-4 px-3">
                            <div className="text-slate-300">{client.email}</div>
                          </td>
                          <td className="py-4 px-3 font-mono text-xs">
                            <div className="text-slate-400">{client.alias}</div>
                            <div className="text-slate-500 text-[10px]">{client.cbu}</div>
                          </td>
                          <td className="py-4 px-3 text-right font-semibold text-emerald-400">
                            ${client.balance.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-4 px-3">
                            <div className="flex items-center justify-center gap-2">
                              {/* Ajustar saldo */}
                              <button
                                onClick={() => handleEditBalance(client.id, client.balance)}
                                className="p-2 bg-white/5 border border-white/8 hover:border-violet-500/30 hover:bg-violet-600/15 rounded-lg text-slate-300 hover:text-violet-400 transition-all cursor-pointer"
                                title="Ajustar saldo"
                                type="button"
                              >
                                <Edit size={15} />
                              </button>

                              {/* Eliminar */}
                              <button
                                onClick={() => handleDeleteUser(client.id, client.name)}
                                className="p-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 rounded-lg text-rose-400 transition-all cursor-pointer"
                                title="Eliminar usuario"
                                type="button"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* ================= CONTENIDO DE AUDITORÍA (Logs) ================= */}
        {activeSection === "logs" && (
          <div className="animate-fade-in">
            <SystemLogs logs={dashboardAdminData.systemLogs} />
          </div>
        )}

      </div>
    </main>
  );
}

export default DashboardAdmin;
