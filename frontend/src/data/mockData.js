import {
  ArrowLeftRight,
  BadgeDollarSign,
  CreditCard,
  Landmark,
} from "lucide-react";

export const USERS = [
  {
    id: "cliente-1",
    name: "Federico García",
    initials: "FG",
    email: "cliente@novabank.com",
    password: "cliente123",
    dni: "12345678",
    status: "Cuenta activa",
    role: "client",
    balance: 1248370.50,
    cbu: "0000003100012345678901",
    alias: "fede.nova.bank",
    cardNumber: "4509 1234 1234 3456",
    cardExpiry: "08/28",
    cards: [
      {
        id: 1,
        type: "Débito NovaBank",
        number: "4509123412343456",
        holder: "Federico García",
        expires: "08/28",
        cvv: "583",
        frozen: false,
      },
      {
        id: 2,
        type: "Crédito NovaBank",
        number: "5364123498761122",
        holder: "Federico García",
        expires: "11/29",
        cvv: "214",
        frozen: false,
      }
    ]
  },
  {
    id: "cliente-2",
    name: "Martina Ruiz",
    initials: "MR",
    email: "martina@novabank.com",
    password: "martina123",
    dni: "87654321",
    status: "Cuenta activa",
    role: "client",
    balance: 485000.00,
    cbu: "0000003100098765432109",
    alias: "martina.nova.bank",
    cardNumber: "4509 7777 1111 2222",
    cardExpiry: "05/28",
    cards: [
      {
        id: 3,
        type: "Débito NovaBank",
        number: "4509777711112222",
        holder: "Martina Ruiz",
        expires: "05/28",
        cvv: "739",
        frozen: false,
      }
    ]
  },
  {
    id: "cliente-3",
    name: "Nicolás Pérez",
    initials: "NP",
    email: "nicolas@novabank.com",
    password: "nicolas123",
    dni: "44455566",
    status: "Cuenta activa",
    role: "client",
    balance: 350000.00,
    cbu: "0000003100044455566677",
    alias: "nicolas.nova.bank",
    cardNumber: "4509 8888 3333 4444",
    cardExpiry: "02/29",
    cards: [
      {
        id: 4,
        type: "Débito NovaBank",
        number: "4509888833334444",
        holder: "Nicolás Pérez",
        expires: "02/29",
        cvv: "462",
        frozen: false,
      },
      {
        id: 5,
        type: "Crédito NovaBank",
        number: "5364555566667777",
        holder: "Nicolás Pérez",
        expires: "09/30",
        cvv: "905",
        frozen: false,
      }
    ]
  },

  {
  id: "cliente-4",
  name: "Sofía Rodríguez",
  initials: "SR",
  email: "sofia@novabank.com",
  password: "sofia123",
  dni: "40111222",
  status: "Cuenta activa",
  role: "client",
  balance: 720000.00,
  cbu: "0000003100072011122233",
  alias: "sofia.rodriguez.nova",
  cardNumber: "4509 5555 6666 7777",
  cardExpiry: "07/29",
  cards: []
},
{
  id: "cliente-5",
  name: "Tomás Benítez",
  initials: "TB",
  email: "tomas@novabank.com",
  password: "tomas123",
  dni: "39222333",
  status: "Cuenta activa",
  role: "client",
  balance: 915000.00,
  cbu: "0000003100091522233344",
  alias: "tomas.benitez.nova",
  cardNumber: "4509 9999 2222 1111",
  cardExpiry: "10/30",
  cards: []
},
  {
    id: "admin-1",
    name: "Admin Nova",
    initials: "AN",
    email: "admin@novabank.com",
    password: "adminpassword",
    role: "admin"
  }
];

export const TRANSACTIONS = [
  {
    id: "t1",
    userId: "cliente-1",
    type: "transfer",
    title: "Transferencia a Martina",
    amount: "-$20.000",
    date: "10 jun, 11:05",
    icon: "transfer"
  },
  {
    id: "t2",
    userId: "cliente-1",
    type: "income",
    title: "Acreditación sueldo",
    amount: "+$85.000",
    date: "Hoy, 09:14",
    icon: "salary"
  },
  {
    id: "t3",
    userId: "cliente-1",
    type: "expense",
    title: "Mercado Libre",
    amount: "-$12.490",
    date: "Ayer, 18:52",
    icon: "shopping"
  }
];

export const AUDIT_LOGS = [
  {
    id: "log1",
    adminName: "Admin Nova",
    action: "Bloqueo de cuenta temporal",
    targetUser: "Pedro Domínguez",
    time: "2026-06-19T10:00:00Z",
    status: "critical",
    type: "security"
  },
  {
    id: "log2",
    adminName: "Admin Nova",
    action: "Aprobación de límite crediticio",
    targetUser: "Sofía Rodríguez",
    time: "2026-06-19T11:45:00Z",
    status: "success",
    type: "user"
  }
];

export const dashboardAdminData = {
  metrics: [
    {
      id: "m1",
      label: "Usuarios Totales",
      value: "14.250",
      change: "+12% esta semana",
      variant: "purple",
    },
    {
      id: "m2",
      label: "Transacciones Hoy",
      value: "$ 4.830.200",
      change: "En tiempo real",
      variant: "green",
    },
    {
      id: "m3",
      label: "Alertas del Sistema",
      value: "2",
      change: "Requieren atención",
      variant: "expense",
    },
  ],
  pendingApprovals: [
    {
      id: "u1",
      name: "Tobias Benjamin Vitale",
      dni: "45.123.456",
      date: "Hoy, 18:24",
      email: "tobias@correo.com",
    },
    {
      id: "u2",
      name: "Martín Edgardo Gómez",
      dni: "38.987.654",
      date: "Ayer, 11:05",
      email: "martin.gomez@correo.com",
    },
    {
      id: "u3",
      name: "Lucía Fernández",
      dni: "42.345.890",
      date: "10 jun, 09:15",
      email: "lucia.f@correo.com",
    },
  ],
  systemLogs: [
    {
      id: "l1",
      action: "Usuario TVitales cambió contraseña",
      time: "Hace 5 min",
      type: "security",
      status: "success",
    },
    {
      id: "l2",
      action: "Error de conexión en BD Nodo Norte",
      time: "Hace 22 min",
      type: "error",
      status: "critical",
    },
    {
      id: "l3",
      action: "Respaldo de seguridad completado",
      time: "Hoy, 04:00",
      type: "system",
      status: "success",
    },
    {
      id: "l4",
      action: "Nueva solicitud de alta de cuenta",
      time: "Ayer, 23:14",
      type: "user",
      status: "info",
    },
  ],
};

export const dashboardData = {
  monthlyChange: "+$14.200 este mes",
  updatedAt: "Actualizado hace 2 min",
  stats: [
    { label: "Ingresos", value: "+$85.000", variant: "income" },
    { label: "Gastos", value: "-$70.800", variant: "expense" },
    { label: "Invertido", value: "$320.000", variant: "invested" },
  ],
  quickActions: [
    { label: "Inversiones", icon: Landmark, tone: "purple", path: "/inversiones" },
    { label: "Comprar dólar", icon: BadgeDollarSign, tone: "green", path: "/comprar-dolar" },
    { label: "Tarjetas", icon: CreditCard, tone: "yellow", path: "/tarjetas" },
    { label: "Transferir", icon: ArrowLeftRight, tone: "blue", path: "/transferir" },
  ],
  investments: [
    { name: "FCI Conservador", value: "$200.000", tone: "purple" },
    { name: "Dólar MEP", value: "USD 120", tone: "green" },
    { name: "Plazo fijo", value: "$120.000", tone: "yellow" },
  ],
};
