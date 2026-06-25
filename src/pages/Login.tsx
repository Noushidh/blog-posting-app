import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase";
import { notyf } from "../utils/notyf";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleRegister = async () => {
    try {
      if (!validateForm()) return;
      await createUserWithEmailAndPassword(auth, email, password);
      notyf.success("register successfull");
    } catch (error: any) {
      console.log(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          notyf.error("This email is already registered.");
          break;
        case "auth/invalid-email":
          notyf.error("Please enter a valid email address");
          break;
        case "auth/weak-password":
          notyf.error("Password must be at least 6 characters.");
          break;
        default:
          notyf.error("Something went wrong");
      }
    }
  };
  const handleLogin = async () => {
    try {
      if (!validateForm()) return;
      await signInWithEmailAndPassword(auth, email, password);
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
      <h1>Login</h1>
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
      <button onClick={handleRegister}>Register</button>
    </>
  );
}
export default Login;
