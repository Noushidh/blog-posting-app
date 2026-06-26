import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import {  useContext, useState } from "react";
import { auth } from "../firebase/firebase";
import { notyf } from "../utils/notyf";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login}=useContext(AuthContext)
  const navigate = useNavigate()

  const validateForm = () => {
    if (!email || !password) {
      notyf.error("Please fill in all fields.");
      return false;
    }

    if (password.length < 6) {
      notyf.error("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    try {
      if (!validateForm()) return;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      login(userCredential.user)
     navigate('/Home')
      notyf.success("login successfull");
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-credential":
          notyf.error(
            "Invalid email or password. If you are a new user, please register first.",
          );
          break;

        case "auth/weak-password":
          notyf.error("Password must be at least 6 characters.");
          break;

        case "auth/invalid-email":
          notyf.error("Please enter a valid email address.");
          break;

        default:
          notyf.error("Login failed. Please try again.");
      }
    }
  };
  return (
    <>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password ..."
      />
      <button onClick={handleLogin}>Login</button>
    </>
  );
}
export default LoginForm;
