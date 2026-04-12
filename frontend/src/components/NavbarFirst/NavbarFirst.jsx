import "./navbarfirst.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_min.png";
function NavbarFirst() {
  const navigate = useNavigate();
  return (
    <>
      <nav id="navbarfirst">
        <div
          className="logo"
          onClick={() => navigate("/")}
          aria-hidden="true"
        >
          <img src={logo} alt="Logo" />
        </div>
        <ul className="items">
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