import { useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from 'axios';
import ConvertDateJMA from "../utils/ConvertDateJMA";
import "./newfaq.css";
function NewFaq({newFaq, setNewFaq, setShowNewFaq}) {
  const [sujet, setSujet] = useState('');
  const [texte, setTexte] = useState('');
  const [dateIn] = useState(new Date());
  const { userToken, userInfo } = useContext(AuthContext);
  const { firstname, lastname } = userInfo;
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }
  const handleClick = ()=>{
    setShowNewFaq(false);
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    await timeout(1000);
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    const dataForm = {...dataFromForm, author:firstname, date_in: dateIn};
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/faq`, dataForm, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setNewFaq([...newFaq, { 
            id: response.data, 
            question:dataFromForm.question, 
            answer:dataFromForm.answer,
            author: `${firstname} ${lastname}`,
            date_in: dateIn
          }]);
          handleClearFields();
        } else {
          console.error("erreur d'ecritures FAQ")
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
  const handleClearFields = ()=>{
    setSujet("");
    setTexte("");
  }
  return (
    <div className="newfaq">
      <div className="entete">
        <h1>Nouvelle question:</h1>
        <i className="fi fi-rr-users" onClick={handleClick}>&nbsp;Retour</i>
      </div>
      <form className="formnewfaq" onSubmit={handleSubmit}>
        <input type="text" name="question" className="sujet" onChange={(e)=> setSujet(e.target.value)} value={sujet} placeholder="Sujet"/>
        <input type="text" name="answer" className="texte" onChange={(e)=> setTexte(e.target.value)} value={texte} placeholder="Texte"/>
        <input disabled type="text" name="author" className="author" defaultValue={`Auteur ${firstname} ${lastname}` }/>
        <input disabled type="text" name="date_in" className="date_in" defaultValue={(ConvertDateJMA(dateIn))}/>
        {(sujet.length && texte.length)? <button type="submit" className="btn">
          Valider la question
        </button> : null}
      </form>
    </div>
  )
}

export default NewFaq;