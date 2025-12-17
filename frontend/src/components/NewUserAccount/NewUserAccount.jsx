
import PropTypes from "prop-types";
import "./UserAccount.css";
import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
// import Badge from "../Badge/Badge";
export default function NewUserAccount({ userInfo }) {
  const { mail, lastname, firstname, phone, is_admin } = userInfo;
  const [firstnameInput, setFirstnameInput] = useState(firstname);
  const [lastnameInput, setLastnameInput] = useState(lastname);
  const [mailInput, setMailInput] = useState(mail);
  const [phoneInput, setPhoneInput] = useState(phone);
  const [passwordInput, setPasswordInput] = useState("Mot de passe");
  const [checkAdmin, setCheckAdmin] = useState(is_admin);
  const { userToken } = useContext(AuthContext);
  const [message, setMessage] = useState(false);

  const handleMailChange = (event) => {
    setMailInput(event.target.value);
  };
  const handleLastnameChange = (event) => {
    setLastnameInput(event.target.value);
  };
  const handleFirstnameChange = (event) => {
    setFirstnameInput(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhoneInput(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };
  const handleCheck = (event)=>{
    setCheckAdmin(event.target.checked);
  }
  const handleFocus = () => {
    setPasswordInput("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/addUser`, dataFromForm, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          setMessage(true);
        } else {
          setMessage(false);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <>
      <header>
        <h1>Mes informations</h1>
        </header>
      <div className="content user-account">
        <form onSubmit={handleSubmit}>
          <div className="input-line">
            <div className="input-field">
              <label htmlFor="firstname">Prénom</label>
              <div className="input">
                <input
                  name="firstname"
                  type="text"
                  value={firstnameInput}
                  id="firstname"
                  onChange={handleFirstnameChange}
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="lastname">Nom</label>
              <div className="input">
                <input
                  name="lastname"
                  type="text"
                  value={lastnameInput}
                  id="lastname"
                  onChange={handleLastnameChange}
                />
              </div>
            </div>
          </div>
          <div className="input-line">
            <div className="input-field">
              <label htmlFor="mail">Mail</label>
              <div className="input">
                <input
                  name="mail"
                  type="text"
                  value={mailInput}
                  id="mail"
                  onChange={handleMailChange}
                />
              </div>
            </div>
            <div className="input-field">
              <label htmlFor="phone">Téléphone</label>
              <div className="input">
                <input
                  name="phone"
                  type="text"
                  value={phoneInput}
                  id="phone"
                  onChange={handlePhoneChange}
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
                  type="text"
                  value={passwordInput}
                  id="password"
                  onChange={handlePasswordChange}
                  onFocus={handleFocus}
                />
              </div>
            </div>
          </div>
          <div className="input-check">
            <input
              type="checkbox"
              checked={checkAdmin}
              id="checkadmin"
              onChange={handleCheck}>
            </input>
            <label htmlFor="checkadmin">Administrateur</label>
          </div>
          <button type="submit" className="btn">
            Valider changement de mot de passe
          </button>
        </form>
        {message && (
          <div>
            <p>Nouvel utilisateur créé avec succès..</p>
          </div>
        )}
      </div>
    </>
  );
}

NewUserAccount.propTypes = {
  userInfo: PropTypes.shape({
    mail: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
