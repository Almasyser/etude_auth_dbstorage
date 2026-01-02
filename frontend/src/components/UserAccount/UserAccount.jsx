import PropTypes from "prop-types";
import "./UserAccount.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import ConvertDateJMA from "../utils/ConvertDateJMA";
export default function UserAccount({ userInfo, setShowUserAccount }) {
  const { mail, lastname, firstname, phone, role, date_in, id } = userInfo;
  const [firstnameInput, setFirstnameInput] = useState(firstname);
  const [lastnameInput, setLastnameInput] = useState(lastname);
  const [mailInput, setMailInput] = useState(mail);
  const [phoneInput, setPhoneInput] = useState(phone);
  const [roleInput, setRoleInput] = useState(role);
  const { userToken } = useContext(AuthContext);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, dataFromForm, {
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
  const handleRetour=()=>{
    navigate("/users");
    setShowUserAccount(false);
  }
  return (
    <div className="useraccount">
      <div className="header">
        <h1>Détails du compte</h1>
        <i className="fi fi-rr-users" onClick={handleRetour}>&nbsp;Retour</i>
      </div>
      <div className="account">
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
                  onChange={(e)=>setFirstnameInput(e.target.value)}
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
                  onChange={(e)=>setLastnameInput(e.target.value)}
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
                  onChange={(e)=>setMailInput(e.target.value)}
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
                  onChange={(e)=>setPhoneInput(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="input-line">
            <div className="input-field">
              <label htmlFor="role">Role</label>
              <div className="input">
                <input
                  name="role"
                  type="text"
                  value={roleInput}
                  id="role"
                  onChange={(e)=>setRoleInput(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="input-line">
            <div className="input-field">
              <label htmlFor="role">Compte créé le: </label>
              <div className="input">
                {ConvertDateJMA(date_in)}
              </div>
            </div>
          </div>
          <button type="submit" className="btn">
            {message? "Modifications validées." : "Valider les modifications"}
          </button>
        </form>
      </div>
    </div>
  );
}

UserAccount.propTypes = {
  userInfo: PropTypes.shape({
    mail: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
