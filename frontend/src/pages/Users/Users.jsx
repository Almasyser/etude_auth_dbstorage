import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import imgDefault from "../../assets/default.png";
import NewUserAccount from "../../components/NewUserAccount/NewUserAccount";
import "./Users.css";
function Users() {
  const AuthValue = useContext(AuthContext);
  const { userToken } = AuthValue;
  const [users, setUsers] = useState();
  const [showNew, setShowNew] = useState(false);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setUsers(res.data);
       });
  }, [userToken]);
  return (
    <>
      <Navbar />
      {users && (
        <div className="manage">
          <button className="newuser"><i className="fi fi-rr-user-add" onClick={()=> setShowNew(!showNew)}/></button>
          <header>
            <h1>Gestion des Utilisateurs</h1>
          </header>
          {users.map((el) => (
            <section className="carte" key={el.id}>
              <img className="photo" src={imgDefault} alt="###" />
              <span className="central">
                <p>{el.role}</p>
                <p>{`${el.firstname} ${el.lastname}`}</p>
                <p>{el.email}</p>
                <p>{el.mobile}</p>
              </span>
              <span className="droite">
                <div className="boutons">
                  <i className="fi fi-rr-user"></i>
                  <i className="fi fi-rr-trash"></i>
                </div>
                {/* <img className="avatar" src={ el.is_admin? tagAdmin: tagVisitor } alt="---"/> */}
                {/* <p>{el.is_admin? "administrateur":"visiteur"}</p> */}
              </span>
            </section>
          ))}
        </div>
      )}
      {showNew && <NewUserAccount />}
    </>
  );
}
export default Users;
                // <thead>
                //   <tr>
                //     {keys.map((key) => {
                //       return (
                //         key !== "id" &&
                //         key !== "hashed_password" && <th key={key}>{key}</th>
                //       );
                //     })}
                //     <th>Actions</th>
                //   </tr>
                // </thead>

// <ul key={user.id}>
// <li>{`Nom: ${user.lastname}`}</li>
// <li>{`Prénom: ${user.firstname}`}</li>
// <li>{`Mobile: ${user.phone}`}</li>
// <li>{`email: ${user.mail}`}</li>
// <li>{`Admin ${user.is_admin? "oui" : "non" }`}</li>
// <li className="actions">
//   <button
//     className="" //</td>"button-sm-blue-outline"
//     type="button">
//     <i className="fi fi-rr-user-pen" />
//   </button>
//   <button
//     className="" //button-sm-error-outline"
//     type="button">
//     <i className="fi fi-rr-trash" />
//   </button>
// </li>
// </ul>