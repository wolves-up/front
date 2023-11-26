import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import HeaderAuth from "../components/HeaderAuth/HeaderAuth";
import { Navigate } from "react-router-dom";

const RequireUnauth = ({ children, loginButtonRequired }) => {
  const user = localStorage.getItem("access_token");
  if (user) {
    return <Navigate replace to="/news" />;
  }
  return (
    <>
      <Header loginButtonRequired={loginButtonRequired} />
      <main className="container">{children}</main>
    </>
  );
};

export default RequireUnauth;
