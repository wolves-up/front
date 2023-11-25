import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import HeaderAuth from "../components/HeaderAuth/HeaderAuth";

const RequireAuth = ({children}) => {
  const user = localStorage.getItem('access_token');
  if (!user) {
    return <Navigate replace to="/login" />;
  }
  return (
    <div className="container flex-wrapper">
      <NavBar />
      <div className="page-content">
        <HeaderAuth />
        {children}
      </div>
    </div>
  );
}

export default RequireAuth;