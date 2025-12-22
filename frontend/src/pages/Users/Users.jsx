import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import imgDefault from "../../assets/default.png";
import NewUserAccount from "../../components/NewUserAccount/NewUserAccount";
import "./Users.css";
import MyAccount from "../MyAccount/MyAccount";
import UserAccount from "../../components/UserAccount/UserAccount";
function Users() {
  const AuthValue = useContext(AuthContext);
  const { userToken, userInfo } = AuthValue;
  const isAdmin =userInfo.is_admin;
  const [users, setUsers] = useState();
  const [showNew, setShowNew] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [id, setId ] = useState(0);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        setUsers(res.data);
       });
  }, [userToken]);
  const handleDetailUser=(index)=>{
    setShowDetail(true);
    setId(index);
  }
  return (
    <>
      <Navbar />
      {users && (
        <div className="manage">
          <button className="newuser"><i className="fi fi-rr-user-add" onClick={()=> setShowNew(!showNew)}/></button>
          <header>
            <h1>Gestion des Utilisateurs</h1>
          </header>
          {users.map((el, index) => (
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
                  <i className="fi fi-rr-user" onClick={()=> handleDetailUser(index)}></i>
                  {isAdmin && <i className="fi fi-rr-trash"></i>}
                </div>
              </span>
            </section>
          ))}
        </div>
      )}
      {showNew && <NewUserAccount />}
      {showDetail && <UserAccount userInfo={users[id]} fromUsers={true} setShowDetail={setShowDetail}/>}
    </>
  );
}
export default Users;


