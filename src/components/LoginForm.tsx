import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../firebase/firebase";
import { notyf } from "../utils/notyf";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginForm() {
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

  const handleLogin = async () => {
    try {
      if (!validateForm()) return;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      login(userCredential.user);
      navigate("/Home");
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Welcome Back
        </h1>

        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-2 font-semibold text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg p-3 hover:opacity-90 transition duration-300"
        >
          Login
        </button>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/Register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default LoginForm;
