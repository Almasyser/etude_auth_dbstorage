import { useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from 'axios';
import "./newfaq.css";
function NewFaq({setShowNewFaq}) {
  const [sujet, setSujet] = useState('');
  const [texte, setTexte] = useState('');
  const { userToken } = useContext(AuthContext);
  const [message, setMessage] = useState(false);
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }
  const handleClick = ()=>{
    window.location.reload();
    setShowNewFaq(false);
  }
  const handleSubmit = async(event) => {
    await timeout(1000);
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/faq`, dataFromForm, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          setMessage(true);
        } else {
          setMessage(false);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
      setShowNewFaq(true);
  }

  return (
    <div className="newfaq">
      <div className="entete">
        <h1>Nouvelle question:</h1>
        <i className="fi fi-rr-users" onClick={handleClick}>&nbsp;Retour</i>
      </div>
      <form className="form-newfaq" onSubmit={handleSubmit}>
        <input type="text" name="question" className="sujet" onChange={(e)=> setSujet(e.target.value)} value={sujet} placeholder="Sujet"/>
        <input type="text" name="answer" className="texte" onChange={(e)=> setTexte(e.target.value)} value={texte} placeholder="Texte"/>
        {(sujet.length && texte.length)? <button type="submit" className="btn">
          Valider la question
        </button> : null}
      </form>
      <div>
        { message && <p className="msg-valide">Nouvel question postée avec succès..</p>}
      </div>
    </div>
  )
}

export default NewFaq