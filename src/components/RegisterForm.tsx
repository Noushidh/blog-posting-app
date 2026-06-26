import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import { notyf } from "../utils/notyf";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      login(userCredential.user);

      notyf.success("Registered successfully");

      navigate("/home");
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          notyf.error("Email already exists.");
          break;

        default:
          notyf.error("Registration failed");
      }
    }
  };

  return (
    <>
      <label>Email</label>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password</label>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Register
      </button>
    </>
  );
}

export default RegisterForm;