import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AuthContext from "../../contexts/AuthContext";
import "./MyAccount.css";
export default function MyAccount() {
  const navigate = useNavigate();
  const { userToken, userInfo } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { id } = userInfo;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
    if (!userToken) {
      navigate("/home");
    }
  }, [userToken, id, navigate]);

  return (
    userToken && (
      <>
        <Navbar />
        {isDataLoaded ? 
          <div className="useraccount">
            <div className="header">
              <h1>Mes informations</h1>
            </div>
            <div className="account">
              <div className="input-line">
                <div className="input-field">
                  <label>Prénom</label>
                  <p className="input">{userData.firstname}</p>
                </div>
                <div className="input-field">
                  <label>Nom</label>
                  <p className="input">{userData.lastname}</p>
                </div>
              </div>
              <div className="input-line">
                <div className="input-field">
                  <label>Téléphone</label>
                  <p className="input">{userData.phone}</p>
                </div>
                <div className="input-field">
                  <label>Mail</label>
                  <p className="input">{userData.mail}</p>
                </div>
              </div>
              <div className="input-line">
                <div className="input-field">
                  <label>Role</label>
                  <p className="input">{userData.role}</p>
                </div>
                <div className="input-field">
                  <label>{userData.is_admin? "Administrateur" : "Visiteur"}</label>

                </div>

              </div>

            </div>
          </div>:<p>chargement</p>
        }
      </>
    )
  );
}
