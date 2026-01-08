import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import AuthContext from "../../contexts/AuthContext";
import "./Home.css";
export default function Home() {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [usersDatas, setUsersDatas]= useState();
  useEffect(() => {
    const InitialQuery = `${import.meta.env.VITE_BACKEND_URL}/users?`; //remplacer users par la db principale
    let fullQuery = InitialQuery;
    axios
      .get(fullQuery, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setUsersDatas(response.data);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
    if (!userToken) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);
  return (
    isDataLoaded && userToken && (
      <div className="home">
        <Navbar/>
        <h1>Page Home</h1>
        {usersDatas && usersDatas.map((el)=>{
          return(
            <ul key={el.id}>
              <li><img src={el.photo} alt="PHOTO"/></li>
              <li>Nom:{el.firstname}</li>
              <li>Prénom:{el.lastname}</li>
              <li>Role:{el.role}</li>
              <li>Téléphone:{el.phone}</li>
              <li>Mail:{el.mail}</li>
              <li>Admin:{el.is_admin}</li>
              <li>Avatar:{el.avatar}</li>
            </ul>
          )
        })}
      </div>
    )
  );
}
