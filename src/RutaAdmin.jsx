import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const correosAdmin = [
  "aliciasmelero@gmail.com",
  "lapurisimaconchioficial@gmail.com",
];

const RutaAdmin = ({ children }) => {
  const user = getAuth().currentUser;

  if (!user || !correosAdmin.includes(user.email)) {
    return <Navigate to="/portada" replace />;
  }

  return children;
};

export default RutaAdmin;