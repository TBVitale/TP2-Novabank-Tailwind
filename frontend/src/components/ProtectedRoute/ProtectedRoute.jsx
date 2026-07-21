import { Navigate } from "react-router-dom";
import { useBank } from "../../context/BankContext";

function ProtectedRoute({ children, allowedRole }) {
  const { currentUser } = useBank();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const normalizedRole =
    currentUser.role === "client" ? "cliente" : currentUser.role;

  if (allowedRole && normalizedRole !== allowedRole) {
    return (
      <Navigate
        to={normalizedRole === "admin" ? "/admin" : "/cliente"}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;