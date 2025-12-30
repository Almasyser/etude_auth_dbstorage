import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import AuthContext from "../../contexts/AuthContext";
import NewFaq from "../../components/NewFaq/NewFaq";
import "./Faq.css";
export default function Faq() {
  const navigate = useNavigate();
  const { userToken, userInfo } = useContext(AuthContext);
  const isAdmin = userInfo.is_admin;
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [newFaq, setNewFaq] = useState();
  const [showNewFaq, setShowNewFaq] = useState(false);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/faq`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setNewFaq(response.data);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
    if (!userToken) {
      navigate("/home");
    }
  }, [userToken, navigate]);
  const handleDelete = (id)=>{
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/faq/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          console.log("faq effacée");
          setNewFaq(newFaq.filter( item => item.id !== id))
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
    userToken && (
      <>
        <div className="faq">
          <Navbar />
          {isDataLoaded ? (
            <main>
              <header>
                <button className="btn-newfaq"><i className="fi fi-rr-add" onClick={()=> setShowNewFaq(!showNewFaq)}/></button>
                <h1>FAQ : Réponses aux questions fréquentes</h1>
              </header>
              <div className="content">
                <ul className="faq-list">
                  {newFaq.map((el, index) => (
                    <li key={index}>
                      {isAdmin? <i className="fi fi-rr-trash" onClick={()=>handleDelete(el.id)}/>:null }
                      <p className="question">{el.id}&nbsp;{el.question}</p>
                      <p className="answer">{el.answer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </main>
          ) : (
            <p>Chargement...</p>
          )}
        </div>
        {showNewFaq && <NewFaq newFaq={newFaq} setNewFaq={setNewFaq} setShowNewFaq={setShowNewFaq}/>}
      </>
    )
  );
}
