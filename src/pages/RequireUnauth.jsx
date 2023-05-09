import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Navigate } from "react-router-dom";

const RequireUnauth = ({children, loginButtonRequired}) => {
  const user = useSelector(selectUser);
  if (user) {
    return <Navigate replace to="/dashboard" />;
  }
  return (
    <>
    <Header loginButtonRequired={loginButtonRequired} />
    <main className="container">
      {children}
    </main>
    <Footer />
    </>
  );
}

export default RequireUnauth;