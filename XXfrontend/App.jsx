import "./styles/reset.css";
import "./styles/index.scss";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./src/pages/Home/Home";
import Faq from "./src/pages/Faq/Faq";
import AuthenticationPage from "./src/pages/AuthenticationPage/AuthenticationPage";
import Users from "./src/pages/Users/Users";

import { AuthProvider } from "./src/contexts/AuthContext";
import MyAccount from "./src/pages/MyAccount/MyAccount";
import "./App.css";
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<AuthenticationPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<MyAccount />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
