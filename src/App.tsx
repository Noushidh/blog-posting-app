import { Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtecredRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      </Routes>
    </>
  );
}

export default App;
