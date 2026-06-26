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
      <button className="bg-white px-4 py-2 rounded" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default Logout;
