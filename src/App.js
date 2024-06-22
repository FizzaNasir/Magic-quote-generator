import { Route, Routes } from "react-router-dom"
import HomePage from './Pages/HomePage';
import Signup from './Pages/Signup';
import Login from "./Pages/Login";

function App() {
  return (
    <div >
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/SignUp" element={<Signup />} />
    </Routes>
    </div>
  );
}

export default App;
