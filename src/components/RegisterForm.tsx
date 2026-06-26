import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import { notyf } from "../utils/notyf";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <h1 className="text-2xl font-bold text-center mb-6">
        Register
      </h1>

      <label className="block mb-1 font-medium">
        Email
      </label>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
        className="w-full border rounded p-2 mb-4"
      />

      <label className="block mb-1 font-medium">
        Password
      </label>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
        className="w-full border rounded p-2 mb-6"
      />

      <button
        onClick={handleRegister}
        className="w-full bg-green-500 text-white rounded p-2 hover:bg-green-600"
      >
        Register
      </button>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-blue-500 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
);
}

export default RegisterForm;