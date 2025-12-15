import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
// import NewPhoneModal from "../NewPhoneModal/NewPhoneModal";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isNewPhoneModalOpen, setIsNewPhoneModalOpen] = useState(false);

  const { userInfo } = useContext(AuthContext);

  const isAdmin = userInfo.is_admin;

  return (
    <>
      <nav id="navbar">
        <div
          className="logo"
          onClick={() => navigate("/home")}
          aria-hidden="true"
        >
          <img src="../src/assets/Logo.svg" alt="Logo Emmaus Connect" />
        </div>
        <ul className="items">
          {isAdmin && (
            <li>
              {/* <button
                className="button-md-blue-solid"
                type="button"
                onClick={()=>{}}
              >
                <i className="fi fi-rr-plus" /> Ajouter un smartphone
              </button> */}
            </li>
          )}
          <li>
            <button
              className="button-md-grey-link"
              onClick={() => navigate("/faq")}
              type="button"
            >
              <i className="fi fi-rr-interrogation" /> FAQ
            </button>
          </li>

          {isAdmin === 1 && (
            <li>
              <button
                className="button-md-grey-link"
                type="button"
                onClick={() => navigate("/users")}
              >
                <i className="fi fi-rr-users" /> Gestion utilisateurs
              </button>
            </li>
          )}
          <li>
            <button
              className="button-md-grey-link"
              type="button"
              onClick={() => navigate("/user")}
            >
              <i className="fi fi-rr-user" /> Mon compte
            </button>
          </li>
        </ul>
      </nav>
      <div id="navbar-mobile">
        {isMenuOpen && (
          <div
            className="nav-filter"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        <nav>
          <div
            className="logo"
            onClick={() => navigate("/home")}
            aria-hidden="true"
          >
            <img src="../src/assets/Logo.svg" alt="Logo Emmaus Connect" />
          </div>

          <button
            type="button"
            className="burger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <i className="fi fi-rr-cross" />
            ) : (
              <i className="fi fi-rr-menu-burger" />
            )}
          </button>
        </nav>
        {isMenuOpen && (
          <ul className="items">
            {isAdmin && (
              <li>
                {/* <button
                  className="button-md-blue-solid"
                  type="button"
                  onClick={() => setIsNewPhoneModalOpen(true)}
                >
                  <i className="fi fi-rr-plus" /> Ajouter un smartphone
                </button> */}
              </li>
            )}
            <li>
              <button
                className="button-md-grey-link"
                onClick={() => navigate("/faq")}
                type="button"
              >
                <i className="fi fi-rr-interrogation" /> FAQ
              </button>
            </li>
   
            {isAdmin === 1 && (
              <li>
                <button
                  className="button-md-grey-link"
                  type="button"
                  onClick={() => navigate("/users")}
                >
                  <i className="fi fi-rr-users" /> Gestion utilisateurs
                </button>
              </li>
            )}
            <li>
              <button
                className="button-md-grey-link"
                type="button"
                onClick={() => navigate("/user")}
              >
                <i className="fi fi-rr-user" /> Mon compte
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
