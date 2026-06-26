import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <h1>Login</h1>
      <LoginForm />
      <p>
      Don't have an account?
      <Link to="/Register">Register</Link>
      </p>
    </>
  );
}

export default Login;