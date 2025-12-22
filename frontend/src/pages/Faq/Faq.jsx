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
  const [question, setQuestion] = useState();
  const [showNewFaq, setShowNewFaq] = useState(false);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/faq`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setQuestion(response.data);
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
    userToken && (
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
              {question.map((el) => (
                <li key={el.id}>
                  {isAdmin && <i className="fi fi-rr-trash" /> }
                  <p className="question">{el.question}</p>
                  <p className="answer">{el.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      ) : (
        <p>Chargement...</p>
      )}
      {showNewFaq && <NewFaq setShowNewFaq={setShowNewFaq}/>}
    </div>
    )
  );
}
