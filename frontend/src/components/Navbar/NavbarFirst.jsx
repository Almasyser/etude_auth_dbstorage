import "./Navbar.css";
import { useNavigate } from "react-router-dom";
function NavbarFirst() {
  const navigate= useNavigate();
  return (
    <>
      <nav id="navbar">
        <div
          className="logo"
          onClick={() => navigate("/")}
          aria-hidden="true"
        >
          <img src="../src/assets/Logo.png" alt="Logo" />
        </div>
        <ul className="items">
          <li>
              <button
                className=""
                type="button"
                onClick={()=>navigate("/")}
              >
                <i className="fi fi-rr-home" /> Accueil
              </button>
            </li>
            <li>
            <button
              className="btn-auth"
              type="button"
              onClick={() => navigate("/auth")}
            >
            <i className="fi fi-rr-user" />
              </button>
            </li>
        </ul>
      </nav>
    </>
  )
}

export default NavbarFirst