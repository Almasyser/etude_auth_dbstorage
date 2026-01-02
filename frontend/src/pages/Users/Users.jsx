import { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import imgDefault from "../../assets/default.png";
import NewUserAccount from "../../components/NewUserAccount/NewUserAccount";
import UserAccount from "../../components/UserAccount/UserAccount";
import "./Users.css";
function Users() {
  const navigate= useNavigate();
  const AuthValue = useContext(AuthContext);
  const { userToken, userInfo } = AuthValue;
  const isAdmin =userInfo.is_admin;
  const [users, setUsers] = useState();
  const [showNewUser, setShowNewUser] = useState(false);
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
  const handleDeleteUser = (id)=>{
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/adminUser/user/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        if (response.status === 204) {
          console.log("faq effacée");
          setUsers(users.filter( item => item.id !== id))
        } else {
          console.error(response.status);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
    if (!userToken) {
      navigate("/home");
    }
  }
  return (
    <>
      <Navbar />
      {users && (
        <div className="manage">
          <button className="newuser"><i className="fi fi-rr-user-add" onClick={()=> setShowNewUser(!showNewUser)}/></button>
          <header>
            <h1>Gestion des Utilisateurs</h1>
          </header>
          {users.map((el, index) => (
            <section className="carte" key={el.id}>
              <img className="photo" src={imgDefault} alt="###" />
              <span className="central">
                <p>{el.role}</p>
                <p>{`${el.firstname} ${el.lastname}`}</p>
                <p>{el.id}</p>
                <p>{el.email}</p>
                <p>{el.mobile}</p>
              </span>
              <span className="droite">
                <div className="boutons">
                  <i className="fi fi-rr-user" onClick={()=> handleDetailUser(index)}></i>
                  {isAdmin && <i className="fi fi-rr-trash" onClick={()=>handleDeleteUser(el.id)}></i>}
                </div>
              </span>
            </section>
            ))}
        </div>
      )}
      {showNewUser && <NewUserAccount users={users} setUsers={setUsers} setShowNewUser={setShowNewUser}/>}
      {showDetail && <UserAccount userInfo={users[id]} setShowDetail={setShowDetail}/>}
    </>
  );
}
export default Users;


