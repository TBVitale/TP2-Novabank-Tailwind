import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login/Login";
import DashboardCliente from "../pages/DashboardCliente/DashboardCliente";
import DashboardAdmin from "../pages/DashboardAdmin/DashboardAdmin";
import Inversiones from "../pages/Inversiones/Inversiones";
import ComprarDolar from "../pages/ComprarDolar/ComprarDolar";
import TarjetasCliente from "../pages/TarjetasCliente/TarjetasCliente";
import Transferir from "../pages/Transferir/Transferir";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cliente",
    element: (
      <ProtectedRoute allowedRole="cliente">
        <DashboardCliente />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRole="admin">
        <DashboardAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inversiones",
    element: (
      <ProtectedRoute allowedRole="cliente">
        <Inversiones />
      </ProtectedRoute>
    ),
  },
  {
    path: "/comprar-dolar",
    element: (
      <ProtectedRoute allowedRole="cliente">
        <ComprarDolar />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tarjetas",
    element: (
      <ProtectedRoute allowedRole="cliente">
        <TarjetasCliente />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transferir",
    element: (
      <ProtectedRoute allowedRole="cliente">
        <Transferir />
      </ProtectedRoute>
    ),
  },
]);