import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <h1>Register</h1>
      <RegisterForm />
      
      <Link to="/">Login</Link>
    </>
  );
}

export default Register;