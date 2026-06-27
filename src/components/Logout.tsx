import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Logout() {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut(auth);
    logout();
    navigate("/",{replace:true});
  };
  return (
    <>
<button
  className="bg-gradient-to-r from-rose-400 via-pink-400 to-pink-500 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition duration-300"
  onClick={handleLogout}
>
  🚪 Logout
</button>

    </>
  );
}

export default Logout;
