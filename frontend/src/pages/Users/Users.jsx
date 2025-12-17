import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import "./Users.css";
function Users() {
  const AuthValue = useContext(AuthContext);
  const { userToken } = AuthValue;
  const [users, setUsers] = useState();
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
            <header>
              <h1>Gestion des Utilisateurs</h1>
              <button className="newuser"><i className="fi fi-rr-user-add" /></button>
            </header>
                  {users.map((user) => (
                    <ul key={user.id}>
                      <li>{`Nom: ${user.lastname}`}</li>
                      <li>{`Prénom: ${user.firstname}`}</li>
                      <li>{`Mobile: ${user.phone}`}</li>
                      <li>{`email: ${user.mail}`}</li>
                      <li>{`Admin ${user.is_admin? "oui" : "non" }`}</li>
                      <li className="actions">
                        <button
                          className="" //</td>"button-sm-blue-outline"
                          type="button">
                          <i className="fi fi-rr-user-pen" />
                        </button>
                        <button
                          className="" //button-sm-error-outline"
                          type="button">
                          <i className="fi fi-rr-trash" />
                        </button>
                      </li>
                    </ul>
                  ))}
          </div>
        )}

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