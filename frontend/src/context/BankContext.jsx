/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { USERS, TRANSACTIONS } from "../data/mockData";

const BankContext = createContext();

export function BankProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("novabank_users");
    if (!saved) {
      const initializedUsers = USERS.map(u => {
        if (u.id === "cliente-1") {
          return {
            ...u,
            contacts: [
              {
                id: "contacto-1",
                name: "Martina Ruiz",
                alias: "martina.nova.bank",
                cbu: "0000003100098765432109",
                bank: "NovaBank",
                reference: "Martina facultad",
                isFavorite: true
              }
            ]
          };
        }
        return { ...u, contacts: [] };
      });
      return initializedUsers;
    }
    return JSON.parse(saved);
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("novabank_transactions");
    return saved ? JSON.parse(saved) : TRANSACTIONS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("novabank_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("novabank_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("novabank_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("novabank_current_user", JSON.stringify(currentUser));
  }, [currentUser]);

  // ================= AUTENTICACIÓN =================
  const login = (email, password) => {
    const user = users.find(
      (u) => u.email === email.toLowerCase().trim() && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return { success: true, user };
    }
    return { success: false, error: "Correo electrónico o contraseña incorrectos." };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = ({ name, email, dni, password }) => {
    const normalizedEmail = email.toLowerCase().trim();
    if (users.some((u) => u.email === normalizedEmail)) {
      return { success: false, error: "El correo ya está registrado." };
    }

    const newUser = {
      id: "cliente-" + Date.now(),
      name,
      initials: name.split(" ").map(n => n[0]).join("").toUpperCase(),
      email: normalizedEmail,
      password,
      dni,
      status: "Cuenta activa",
      role: "client",
      balance: 100000.00,
      cbu: "00000031000" + Math.floor(10000000000 + Math.random() * 90000000000),
      alias: name.toLowerCase().replace(/\s+/g, ".") + ".nova",
      cardNumber: "4509 " + Array.from({ length: 3 }, () => Math.floor(1000 + Math.random() * 9000)).join(" "),
      cardExpiry: "12/30",
      cards: [
        {
          id: Date.now(),
          type: "Débito NovaBank",
          number: "4509" + Math.floor(100000000000 + Math.random() * 900000000000),
          holder: name,
          expires: "12/30",
          cvv: Math.floor(100 + Math.random() * 900).toString(),
          frozen: false
        }
      ],
      contacts: []
    };

    setUsers((prev) => [...prev, newUser]);
    return { success: true };
  };

  // ================= OPERACIONES BANCARIAS =================
  const transfer = (destCbuOrAlias, amount, message = "") => {
    const amountNum = Number(amount);
    const target = destCbuOrAlias.trim().toLowerCase();

    const receiver = users.find(
      (u) => u.cbu === target || u.alias.toLowerCase() === target
    );

    if (!receiver) return { success: false, error: "Destinatario no encontrado." };
    if (currentUser.id === receiver.id) return { success: false, error: "No podés transferirte a vos mismo." };
    if (currentUser.balance < amountNum) return { success: false, error: "Saldo insuficiente." };

    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.id === currentUser.id) return { ...u, balance: u.balance - amountNum };
        if (u.id === receiver.id) return { ...u, balance: u.balance + amountNum };
        return u;
      })
    );

    setCurrentUser((prev) => ({ ...prev, balance: prev.balance - amountNum }));

    const newTx = {
      id: "t-" + Date.now(),
      userId: currentUser.id,
      type: "transfer",
      title: `Transferencia a ${receiver.name}`,
      amount: `-$${amountNum.toLocaleString("es-AR")}`,
      date: "Hoy, " + new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
      icon: "transfer",
      message: message.trim()
    };

    setTransactions((prev) => [newTx, ...prev]);
    return { success: true, recipient: receiver };
  };

  // ================= INVERSIONES =================
  const createInvestment = (tipo, monto) => {
    const amountNum = Number(monto);

    if (!currentUser) return { success: false, error: "No hay usuario activo." };
    if (!tipo) return { success: false, error: "Seleccioná un tipo de inversión." };
    if (!amountNum || amountNum <= 0) return { success: false, error: "El monto debe ser mayor a cero." };
    if (currentUser.balance < amountNum) return { success: false, error: "Saldo insuficiente." };

    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id ? { ...u, balance: u.balance - amountNum } : u
      )
    );
    setCurrentUser((prev) => ({ ...prev, balance: prev.balance - amountNum }));

    const labels = {
      "plazo-fijo": "Plazo fijo UVA",
      "fondo-comun": "Fondo común de inversión",
      "dolar-mep": "Dólar MEP",
      "acciones": "Acciones",
    };

    const newTx = {
      id: "t-" + Date.now(),
      userId: currentUser.id,
      type: "investment",
      title: `Inversión: ${labels[tipo] || tipo}`,
      amount: `-$${amountNum.toLocaleString("es-AR")}`,
      date: "Hoy, " + new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
      icon: "investment",
      message: ""
    };

    setTransactions((prev) => [newTx, ...prev]);
    return { success: true };
  };

  // ================= TARJETAS =================
  const updateClientCards = (clientId, newCards) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.id === clientId) return { ...u, cards: newCards };
        return u;
      })
    );
    if (currentUser.id === clientId) {
      setCurrentUser((prev) => ({ ...prev, cards: newCards }));
    }
  };

  // ================= CONTACTOS =================
  const addContact = (contactData) => {
    const updatedContacts = [...(currentUser.contacts || []), {
      id: "contacto-" + Date.now(),
      ...contactData,
      isFavorite: false
    }];
    setUsers(prevUsers => prevUsers.map(u => {
      if (u.id === currentUser.id) return { ...u, contacts: updatedContacts };
      return u;
    }));
    setCurrentUser(prev => ({ ...prev, contacts: updatedContacts }));
  };

  const removeContact = (contactId) => {
    const updatedContacts = (currentUser.contacts || []).filter(c => c.id !== contactId);
    setUsers(prevUsers => prevUsers.map(u => {
      if (u.id === currentUser.id) return { ...u, contacts: updatedContacts };
      return u;
    }));
    setCurrentUser(prev => ({ ...prev, contacts: updatedContacts }));
  };

  const toggleFavoriteContact = (contactId) => {
    const updatedContacts = (currentUser.contacts || []).map(c => {
      if (c.id === contactId) return { ...c, isFavorite: !c.isFavorite };
      return c;
    });
    setUsers(prevUsers => prevUsers.map(u => {
      if (u.id === currentUser.id) return { ...u, contacts: updatedContacts };
      return u;
    }));
    setCurrentUser(prev => ({ ...prev, contacts: updatedContacts }));
  };

  const updateContactReference = (contactId, reference) => {
    const updatedContacts = (currentUser.contacts || []).map(c => {
      if (c.id === contactId) return { ...c, reference };
      return c;
    });
    setUsers(prevUsers => prevUsers.map(u => {
      if (u.id === currentUser.id) return { ...u, contacts: updatedContacts };
      return u;
    }));
    setCurrentUser(prev => ({ ...prev, contacts: updatedContacts }));
  };

  const updateUserProfile = (updatedData) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => {
        if (u.id === currentUser.id) {
          const initials = updatedData.name
            ? updatedData.name.split(" ").map(n => n[0]).join("").toUpperCase()
            : u.initials;
          return { ...u, ...updatedData, initials };
        }
        return u;
      })
    );
    setCurrentUser((prev) => {
      if (!prev) return null;
      const initials = updatedData.name
        ? updatedData.name.split(" ").map(n => n[0]).join("").toUpperCase()
        : prev.initials;
      return { ...prev, ...updatedData, initials };
    });
  };

  return (
    <BankContext.Provider
      value={{
        currentUser,
        users,
        transactions,
        login,
        logout,
        register,
        transfer,
        createInvestment,
        updateClientCards,
        addContact,
        removeContact,
        toggleFavoriteContact,
        updateContactReference,
        updateUserProfile,
        setUsers
      }}
    >
      {children}
    </BankContext.Provider>
  );
}

export const useBank = () => useContext(BankContext);