import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NavbarFirst from "../../components/Navbar/NavbarFirst";
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
        {usersDatas? <Navbar/> : <NavbarFirst />}
        <h1>Page Home</h1>
      </div>
    )
  );
}
