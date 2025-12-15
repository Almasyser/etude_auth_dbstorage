import "./styles/reset.css";
import "./styles/index.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Faq from "./pages/Faq/Faq";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import Users from "./pages/Users/Users";
import { AuthProvider } from "./contexts/AuthContext";
import MyAccount from ".//pages/MyAccount/MyAccount";
import "./App.css";
function App() {
  return (
    <>
 
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<MyAccount />} />
            <Route path="/user" element={<AuthenticationPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
    </>
  );
}

export default App;
