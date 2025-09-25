import Login from "./handler/login";
import Register from "./handler/register";
import { useLocation } from "react-router-dom";
import "./auth.css";

function Auth() {
  const { pathname } = useLocation();
  const isRegister = pathname.startsWith("/register");
  return (
    <div className="auth">
      {isRegister ? (
        <div className="auth__handler-register">
          <Register />
        </div>
      ) : (
        <div className="auth__handler-login">
          <Login />
        </div>
      )}
    </div>
  );
}

export default Auth;
