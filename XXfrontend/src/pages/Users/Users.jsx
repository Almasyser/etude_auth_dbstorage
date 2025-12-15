import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import "./Users.css";

function Users() {
  const AuthValue = useContext(AuthContext);
  const { userToken } = AuthValue;

  const [users, setUsers] = useState();
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setUsers(res.data);
        setKeys(Object.keys(res.data[0]));
      });
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {users && (
          <div className="manage">
            <header>
              <h1>Gestion des Utilisateurs</h1>
            </header>
            <div className="content">
              <table>
                <thead>
                  <tr>
                    {keys.map((key) => {
                      return (
                        key !== "id" &&
                        key !== "hashed_password" && <th key={key}>{key}</th>
                      );
                    })}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.mail}</td>
                      <td>{user.lastname}</td>
                      <td>{user.firstname}</td>
                      <td>{user.phone}</td>
                      <td>{user.is_admin}</td>
                      <td className="actions">
                        <button
                          className="button-sm-blue-outline"
                          type="button"
                        >
                          <i className="fi fi-rr-user-pen" />
                        </button>
                        <button
                          className="button-sm-error-outline"
                          type="button"
                        >
                          <i className="fi fi-rr-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Users;
