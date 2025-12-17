import { useState, useContext } from "react";
import axios from "axios";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function Authentication() {
  const { setUser, setUserInfo } = useContext(AuthContext);

  // regex definition for mail user

  // useState definition
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [failAuth, setFailAuth] = useState(false);

  const navigate = useNavigate();

  // submit handler for the form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`${import.meta.env.VITE_BACKEND_URL}/user/login`);
    
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, dataFromForm)
      .then((response) => {
        if (response.data.token) {
          setUser(response.data.token);
          setUserInfo(response.data.user);
          navigate("/home");
        } else {
          setFailAuth(true);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setFailAuth(true);
      });
  };

  // handler for change in input mail
  const handleMailChange = (event) => {
    setMail(event.target.value);
  };

  // handler for change in password input
  const handlePasswordChange = (event) => setPassword(event.target.value);

  // toggle to change type input for password to show it if user click on the SHOW button
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="connection">
      <form onSubmit={handleSubmit}>
        <div className="input-line">
          <div className="input-field">
            <label htmlFor="mail">Adresse email</label>
            <div className="input">
              <input
                name="mail"
                id="mail"
                type="text"
                autoComplete="true"
                value={mail}
                onChange={handleMailChange}
              />
            </div>
          </div>
        </div>
        <div className="input-line">
          <div className="input-field">
            <label htmlFor="password">Mot de passe</label>
            <div className="input">
              <input
                name="password"
                id="password"
                autoComplete="current-password"
                type={!passwordShown ? "password" : "text"}
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                onClick={togglePassword}
                type="button"
                className="hide-or-show-button"
              >
                <i
                  id="pw-icon-show-hide"
                  className={
                    passwordShown ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye"
                  }
                  alt="button to show or hide password"
                />
              </button>
            </div>
          </div>
        </div>
        <button type="submit" className="connection-button">
          Se connecter
        </button>
      </form>
      {failAuth && (
        <div className="fail-auth-modal">
          <p>Les champs renseignés ne correspondent pas.</p>
          <p>Veuillez réessayer.</p>
        </div>
      )}
    </div>
  );
}
