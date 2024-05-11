import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

//pages
import RegisterPage from "./pages/register";
import Profile from "./pages/profile";
import Uploadpage from "./pages/upload";
import LoginPage from "./pages/login";
import UpdatePage from "./pages/update";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload" element={<Uploadpage />} />
      <Route path="/update" element={<UpdatePage />} />
      <Route path="/share" element={< RegisterPage />} />
    </Routes>
  );
}

export default App;
