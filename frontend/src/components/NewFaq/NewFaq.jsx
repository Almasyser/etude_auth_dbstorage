import { useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from 'axios';
import "./newfaq.css";
function NewFaq({setShowNewFaq}) {
  const [sujet, setSujet] = useState('');
  const [texte, setTexte] = useState('');
  const { userToken } = useContext(AuthContext);
  const [message, setMessage] = useState(false);
  const handleSubmit = (event) => {
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
          window.location.reload();
        } else {
          setMessage(false);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
    setShowNewFaq(false);
  }
  return (
    <>
      <form className="newfaq" onSubmit={handleSubmit}>Nouvelle question:
        <input type="text" name="question" className="sujet" onChange={(e)=> setSujet(e.target.value)} value={sujet} placeholder="Sujet"/>
        <input type="text" name="answer" className="texte" onChange={(e)=> setTexte(e.target.value)} value={texte} placeholder="Texte"/>
        <button type="submit" className="btn">
          Valider la question
        </button>
      </form>
      <div>
        { message? <p>Nouvel suestion postée avec succès..</p>:<p>erreur à la publication</p>}
      </div>
    </>
  )
}

export default NewFaq