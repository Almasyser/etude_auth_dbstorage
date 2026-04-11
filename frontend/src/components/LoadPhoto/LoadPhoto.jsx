import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useState, useCallback } from 'react';
import "./loadphoto.css";
function LoadPhoto({idUser}) {
    const [photo, setPhoto] = useState([]);
    const [preview, setPreview] = useState(null);
  
    // Fonction pour gérer le drop des fichiers
    const onDrop = useCallback((acceptedFiles) => {
      setPhoto(acceptedFiles);
      // Aperçu pour les images
      if (acceptedFiles[0].type.startsWith('image/') ) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
      } else {
        setPreview(null);
      }
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  accept: {
    'image/*': ['.jpeg', '.jpg', '.png'],
  },
  maxFiles: 1,
  });
  // Fonction pour envoyer le fichier au backend
  const uploadFile = async (e) => {
    e.preventDefault();
    if (photo.length === 0) return;
      console.log("# #",preview);
    const formData = new FormData();
    formData.append("photo", preview);
    formData.append("id", idUser );
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addUserPhoto`, formData, {
        headers: {
             'Content-Type': 'multipart/form-data',
        },
      });
      alert('Fichier téléchargé avec succès ! ID : ' + response.data.id);
    } catch (error) {
      console.error('Erreur lors du téléchargement :', error);
      alert('Erreur lors du téléchargement.');
    }
  };
  return (
    <>
      <div className='box'
        {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Déposez le fichier ici ...</p>
        ) : (
          <p>Glissez-déposez un fichier ici, ou cliquez pour sélectionner un fichier</p>
        )}
      </div>
        {photo.length > 0 && (
        <form className='comments' onSubmit={uploadFile}>
          <h3>Fichier sélectionné :</h3>
          {preview && <img src={preview} alt="Aperçu" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
          <p>{photo[0].name} ({Math.round(photo[0].size / 1024)} Ko)</p>
          <p>{preview}</p>
          <button type="submit" style={{ marginTop: '10px' }}>
            Télécharger
          </button>
        </form>
      )}
    </>
  )
}

export default LoadPhoto;