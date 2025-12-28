import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Accueil from "./pages/Accueil/Accueil";
import Home from "./pages/Home/Home";
import Faq from "./pages/Faq/Faq";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import Users from "./pages/Users/Users";
import MyAccount from ".//pages/MyAccount/MyAccount";
import "./styles/reset.css";
import "./styles/index.scss";
import "./App.css";
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<AuthenticationPage />} />
            <Route path="/user" element={<MyAccount />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/users" element={<Users />} />
            <Route path="/*" element={<Accueil />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
