/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { USERS, TRANSACTIONS } from "../data/mockData";

const BankContext = createContext();

const API_URL = "http://localhost:8888/api/auth";

const normalizeUser = (usuario) => ({
  ...usuario,
  name: usuario.nombre ?? usuario.name,
  role:
    usuario.rol === "client"
      ? "cliente"
      : usuario.rol ?? usuario.role,
  balance: Number(usuario.saldo ?? usuario.balance ?? 0),
  status: usuario.estado ?? usuario.status,
});

export function BankProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("novabank_users");

    if (saved) {
      return JSON.parse(saved);
    }

    return USERS.map((user) => {
      if (user.id === "cliente-1") {
        return {
          ...user,
          contacts: [
            {
              id: "contacto-1",
              name: "Martina Ruiz",
              alias: "martina.nova.bank",
              cbu: "0000003100098765432109",
              bank: "NovaBank",
              reference: "Martina facultad",
              isFavorite: true,
            },
          ],
        };
      }

      return {
        ...user,
        contacts: [],
      };
    });
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
    localStorage.setItem(
      "novabank_transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "novabank_current_user",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("novabank_current_user");
    }
  }, [currentUser]);

  // ================= AUTENTICACIÓN =================

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          contrasena: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "No se pudo iniciar sesión.",
        };
      }

      const user = normalizeUser(data.usuario);

      localStorage.setItem("novabank_token", data.token);
      setCurrentUser(user);

      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error("Error de login:", error);

      return {
        success: false,
        error: "No se pudo conectar con el servidor.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("novabank_token");
    localStorage.removeItem("novabank_current_user");
    setCurrentUser(null);
  };

  const register = async ({ name, email, dni, password }) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name.trim(),
          email: email.toLowerCase().trim(),
          dni: dni.trim(),
          contrasena: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "No se pudo crear la cuenta.",
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error de registro:", error);

      return {
        success: false,
        error: "No se pudo conectar con el servidor.",
      };
    }
  };

  // ================= OPERACIONES BANCARIAS =================

  const transfer = (destCbuOrAlias, amount, message = "") => {
    if (!currentUser) {
      return {
        success: false,
        error: "No hay un usuario autenticado.",
      };
    }

    const amountNum = Number(amount);
    const target = destCbuOrAlias.trim().toLowerCase();

    const receiver = users.find(
      (user) =>
        user.cbu === target ||
        user.alias?.toLowerCase() === target
    );

    if (!receiver) {
      return {
        success: false,
        error: "Destinatario no encontrado.",
      };
    }

    if (currentUser.id === receiver.id) {
      return {
        success: false,
        error: "No podés transferirte a vos mismo.",
      };
    }

    if (currentUser.balance < amountNum) {
      return {
        success: false,
        error: "Saldo insuficiente.",
      };
    }

    setUsers((previousUsers) =>
      previousUsers.map((user) => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            balance: user.balance - amountNum,
          };
        }

        if (user.id === receiver.id) {
          return {
            ...user,
            balance: user.balance + amountNum,
          };
        }

        return user;
      })
    );

    setCurrentUser((previousUser) => ({
      ...previousUser,
      balance: previousUser.balance - amountNum,
    }));

    const newTransaction = {
      id: `t-${Date.now()}`,
      userId: currentUser.id,
      type: "transfer",
      title: `Transferencia a ${receiver.name}`,
      amount: `-$${amountNum.toLocaleString("es-AR")}`,
      date:
        "Hoy, " +
        new Date().toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      icon: "transfer",
      message: message.trim(),
    };

    setTransactions((previousTransactions) => [
      newTransaction,
      ...previousTransactions,
    ]);

    return {
      success: true,
      recipient: receiver,
    };
  };

  // ================= INVERSIONES =================

  const createInvestment = (type, amount) => {
    const amountNum = Number(amount);

    if (!currentUser) {
      return {
        success: false,
        error: "No hay usuario activo.",
      };
    }

    if (!type) {
      return {
        success: false,
        error: "Seleccioná un tipo de inversión.",
      };
    }

    if (!amountNum || amountNum <= 0) {
      return {
        success: false,
        error: "El monto debe ser mayor a cero.",
      };
    }

    if (currentUser.balance < amountNum) {
      return {
        success: false,
        error: "Saldo insuficiente.",
      };
    }

    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === currentUser.id
          ? {
              ...user,
              balance: user.balance - amountNum,
            }
          : user
      )
    );

    setCurrentUser((previousUser) => ({
      ...previousUser,
      balance: previousUser.balance - amountNum,
    }));

    const labels = {
      "plazo-fijo": "Plazo fijo UVA",
      "fondo-comun": "Fondo común de inversión",
      "dolar-mep": "Dólar MEP",
      acciones: "Acciones",
    };

    const newTransaction = {
      id: `t-${Date.now()}`,
      userId: currentUser.id,
      type: "investment",
      title: `Inversión: ${labels[type] || type}`,
      amount: `-$${amountNum.toLocaleString("es-AR")}`,
      date:
        "Hoy, " +
        new Date().toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      icon: "investment",
      message: "",
    };

    setTransactions((previousTransactions) => [
      newTransaction,
      ...previousTransactions,
    ]);

    return {
      success: true,
    };
  };

  // ================= TARJETAS =================

  const updateClientCards = (clientId, newCards) => {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === clientId
          ? {
              ...user,
              cards: newCards,
            }
          : user
      )
    );

    if (currentUser?.id === clientId) {
      setCurrentUser((previousUser) => ({
        ...previousUser,
        cards: newCards,
      }));
    }
  };

  // ================= CONTACTOS =================

  const addContact = (contactData) => {
    if (!currentUser) return;

    const updatedContacts = [
      ...(currentUser.contacts || []),
      {
        id: `contacto-${Date.now()}`,
        ...contactData,
        isFavorite: false,
      },
    ];

    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === currentUser.id
          ? {
              ...user,
              contacts: updatedContacts,
            }
          : user
      )
    );

    setCurrentUser((previousUser) => ({
      ...previousUser,
      contacts: updatedContacts,
    }));
  };

  const removeContact = (contactId) => {
    if (!currentUser) return;

    const updatedContacts = (currentUser.contacts || []).filter(
      (contact) => contact.id !== contactId
    );

    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === currentUser.id
          ? {
              ...user,
              contacts: updatedContacts,
            }
          : user
      )
    );

    setCurrentUser((previousUser) => ({
      ...previousUser,
      contacts: updatedContacts,
    }));
  };

  const toggleFavoriteContact = (contactId) => {
    if (!currentUser) return;

    const updatedContacts = (currentUser.contacts || []).map((contact) =>
      contact.id === contactId
        ? {
            ...contact,
            isFavorite: !contact.isFavorite,
          }
        : contact
    );

    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === currentUser.id
          ? {
              ...user,
              contacts: updatedContacts,
            }
          : user
      )
    );

    setCurrentUser((previousUser) => ({
      ...previousUser,
      contacts: updatedContacts,
    }));
  };

  const updateContactReference = (contactId, reference) => {
    if (!currentUser) return;

    const updatedContacts = (currentUser.contacts || []).map((contact) =>
      contact.id === contactId
        ? {
            ...contact,
            reference,
          }
        : contact
    );

    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === currentUser.id
          ? {
              ...user,
              contacts: updatedContacts,
            }
          : user
      )
    );

    setCurrentUser((previousUser) => ({
      ...previousUser,
      contacts: updatedContacts,
    }));
  };

  // ================= PERFIL =================

  const updateUserProfile = (updatedData) => {
    if (!currentUser) return;

    setUsers((previousUsers) =>
      previousUsers.map((user) => {
        if (user.id !== currentUser.id) {
          return user;
        }

        const initials = updatedData.name
          ? updatedData.name
              .split(" ")
              .map((namePart) => namePart[0])
              .join("")
              .toUpperCase()
          : user.initials;

        return {
          ...user,
          ...updatedData,
          initials,
        };
      })
    );

    setCurrentUser((previousUser) => {
      if (!previousUser) return null;

      const initials = updatedData.name
        ? updatedData.name
            .split(" ")
            .map((namePart) => namePart[0])
            .join("")
            .toUpperCase()
        : previousUser.initials;

      return {
        ...previousUser,
        ...updatedData,
        initials,
      };
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
        setUsers,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}

export const useBank = () => useContext(BankContext);