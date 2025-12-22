
import PropTypes from "prop-types";
import "./newuseraccount.css";
import { useState, useContext} from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

function NewUserAccount() {
  // const { mail, lastname, firstname, phone, is_admin } = userInfo;
  const [firstnameInput, setFirstnameInput] = useState("Prenom")
  const [mailInput,setMailInput] = useState("Adresse mail")
  const [lastnameInput, setLastnameInput] = useState("Nom")
  const [checkAdmin, setCheckAdmin] = useState(0)
  const [phoneInput, setPhoneInput] = useState("Telephone")
  const [passwordInput, setPasswordInput] = useState("Mot de passe")
  const [roleInput,setRoleInput] = useState("role")
  const [photoInput,setPhotoInput] = useState("photo")
  const [avatarInput,setAvatarInput] = useState("avatar")
  console.log(checkAdmin);

  const { userToken } = useContext(AuthContext);
  const [message, setMessage] = useState(false); //  setMessage
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    console.log("dataFromForm:",dataFromForm);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/addUser`, dataFromForm, {
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
        <h1>Inscription</h1>
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
                  onChange={(e)=>setFirstnameInput(e.target.value)}
                  onFocus={()=>setFirstnameInput("")}
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
                  onFocus={()=>setLastnameInput("")}
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
                  onFocus={()=>setMailInput("")}
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
                  onFocus={()=>setPhoneInput("")}
                />
              </div>
            </div>
          </div>
          <div className="input-line">
            <div className="input-field">
              <label htmlFor="pass">Mot de passe</label>
              <div className="input">
                <input
                  name="password"
                  type="text"
                  value={passwordInput}
                  id="pass"
                  onChange={(e)=>setPasswordInput(e.target.value)}
                  onFocus={()=>setPasswordInput("")}
                />
              </div>
            </div>
          </div>
          <div className="input-line">
            <label htmlFor="checkAdmin" className="label-check">Administrateur</label>
            <div className="label-check" id="checkAdmin" onChange={(e)=> setCheckAdmin(e.target.value? 1 : 0 )}>
              <input type="radio" name="is_admin" value={true}/>Oui
              <input type="radio" name="is_admin" value={false}/>Non
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
                  onFocus={()=>setRoleInput("")}
                />
              </div>
            </div>
          </div>
          <div className="input-line">
            <div className="input-field">
              <label htmlFor="photo">Photo</label>
              <div className="input">
                <input
                  name="photo"
                  type="text"
                  value={photoInput}
                  id="photo"
                  onChange={(e)=>setPhotoInput(e.target.value)}
                  onFocus={()=>setPhotoInput("")}
                />
              </div>
            </div>
          </div>
          <div className="input-line">
            <div className="input-field">
              <label htmlFor="avatar">Avatar</label>
              <div className="input">
                <input
                  name="avatar"
                  type="text"
                  value={avatarInput}
                  id="avatar"
                  onChange={(e)=>setAvatarInput(e.target.value)}
                  onFocus={()=>setAvatarInput("")}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btn">
            Valider le nouvel utilisateur
          </button>
        </form>
        <div>
          { message? <p>Nouvel utilisateur créé avec succès..</p>:<p>erreur creation usager</p>}
        </div>
      </div>
    </>
  );
}

// NewUserAccount.propTypes = {
//   userInfo: PropTypes.shape({
//     mail: PropTypes.string.isRequired,
//     lastname: PropTypes.string.isRequired,
//     firstname: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//   }).isRequired,
// };
export default NewUserAccount;