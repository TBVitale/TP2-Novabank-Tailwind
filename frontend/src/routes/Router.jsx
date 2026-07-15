import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import DashboardCliente from "../pages/DashboardCliente/DashboardCliente";
import DashboardAdmin from "../pages/DashboardAdmin/DashboardAdmin";
import Inversiones from "../pages/Inversiones/Inversiones";
import ComprarDolar from "../pages/ComprarDolar/ComprarDolar";
import TarjetasCliente from "../pages/TarjetasCliente/TarjetasCliente";
import Transferir from "../pages/Transferir/Transferir";

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
    element: <DashboardCliente />,
  },
  {
    path: "/admin",
    element: <DashboardAdmin />,
  },
  {
    path: "/inversiones",
    element: <Inversiones />,
  },
  {
    path: "/comprar-dolar",
    element: <ComprarDolar />,
  },
  {
    path: "/tarjetas",
    element: <TarjetasCliente />,
  },
  {
    path: "/transferir",
    element: <Transferir />,
  }
]);
