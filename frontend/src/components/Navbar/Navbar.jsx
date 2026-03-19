import "./Navbar.css";
import { NavLink, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import CheckAdmin from "../utils/CheckAdmin";
function Navbar() {
  const [ toggle, setToggle ] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const isAdmin = CheckAdmin(userInfo?.is_admin);
  return (
    <>
      <nav className={toggle? "navbar-mobile":"navbar"}>
        <NavLink to="/home" className={({ isActive })=>
          (isActive? "navItem active":"navItem")}>Accueil</NavLink>
        {isAdmin && <NavLink to="/loadFile" className={({ isActive })=>
          (isActive? "navItem active":"navItem")}>Charger un fichier</NavLink>}
        <NavLink to="/faq" className={({ isActive })=>
          (isActive? "navItem active":"navItem")}>FAQ</NavLink>
        {isAdmin && <NavLink to="/users" className={({ isActive })=>
          (isActive? "navItem active":"navItem")}>Gestion usagers</NavLink>}
        <NavLink to="/user" className={({ isActive })=>
          (isActive? "navItem active":"navItem")}>Mon compte</NavLink>
        <NavLink to="/" className={({ isActive })=>
          (isActive? "navItem active":"navItem")}>Déconnecter</NavLink>
      </nav>
      <Outlet />
     <button className="burger" onClick={()=>setToggle(!toggle)}>Menu</button>
    </>

    )
}
export default Navbar;


