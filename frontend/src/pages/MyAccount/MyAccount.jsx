
// import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AuthContext from "../../contexts/AuthContext";
import "./MyAccount.css";
export default function MyAccount() {
  const { userToken, userInfo } = useContext(AuthContext);
  return (
    userToken && (
      <div className="myaccount">
        <Navbar />
        <div className="useraccount">
          <div className="header">
            <h1>Mes informations</h1>
          </div>
          <div className="account">
            <div className="input-line">
              <div className="input-field">
                <label>Prénom</label>
                <p className="input">{userInfo.firstname}</p>
              </div>
              <div className="input-field">
                <label>Nom</label>
                <p className="input">{userInfo.lastname}</p>
              </div>
            </div>
            <div className="input-line">
              <div className="input-field">
                <label>Téléphone</label>
                <p className="input">{userInfo.phone}</p>
              </div>
              <div className="input-field">
                <label>Mail</label>
                <p className="input">{userInfo.mail}</p>
              </div>
            </div>
            <div className="input-line">
              <div className="input-field">
                <label>Role</label>
                <p className="input">{userInfo.role}</p>
              </div>
              <div className="input-field">
                <label>Status</label>
                <p className="input">{userInfo.is_admin==="1"? "Administrateur" : "Visiteur"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
