import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import {  useContext, useState } from "react";
import { auth } from "../firebase/firebase";
import { notyf } from "../utils/notyf";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


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
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

      <label className="block mb-1 font-medium">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
        className="w-full border rounded p-2 mb-4"
      />

      <label className="block mb-1 font-medium">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full border rounded p-2 mb-6"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
      >
        Login
      </button>
            <p>
      Don't have an account?
      <Link to="/Register">Register</Link>
      </p>
    </div>
  </div>
);
}
export default LoginForm;
