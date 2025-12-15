import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
// import PhoneCard from "../../components/PhoneCard/PhoneCard";
// import SideBar from "../../components/SideBar/SideBar";
import AuthContext from "../../contexts/AuthContext";

import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  // const [phonesData, setPhonesData] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // const [filters, setFilters] = useState({
  //   model: [],
  //   brand: [],
  //   state: [],
  // });

  useEffect(() => {
    // const brandQuery = filters.brand.join(",");
    // const modelQuery = filters.model.join(",");
    // const stateQuery = filters.state.join(",");

    const InitialQuery = `${import.meta.env.VITE_BACKEND_URL}/users?`; //remplser users par la db concernee

    let fullQuery = InitialQuery;

    // if (brandQuery) {
    //   fullQuery += `&brand_id=${brandQuery}`;
    // }
    // if (modelQuery) {
    //   fullQuery += `&model_id=${modelQuery}`;
    // }
    // if (stateQuery) {
    //   fullQuery += `&state_id=${stateQuery}`;
    // }

    axios
      .get(fullQuery, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        // setPhonesData(response.data);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
    if (!userToken) {
      navigate("/");
    }
  }, [userToken, filters, togglePhones]);

  return (
    userToken && (
      <div className="home">
        <Navbar />
        {/* <SideBar filters={filters} setFilters={setFilters} /> */}
        {/* {isDataLoaded ? (
          <div className="cards-list">
            {phonesData.map((phone) => (
              <PhoneCard key={phone.phone_id} phone={phone} />
            ))}
          </div>
        ) : (
          <p>Chargement...</p>
        )} */}
      </div>
    )
  );
}
