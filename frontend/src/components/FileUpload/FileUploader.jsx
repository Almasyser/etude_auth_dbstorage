import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import "./fileuploader.css"

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null);

  // Fonction pour gérer le drop des fichiers
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    // Aperçu pour les images
    if (acceptedFiles[0].type.startsWith('image/') ) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(acceptedFiles[0]);
    } else {
      setPreview(null);
    }
  }, []);
   
  // Configuration de react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
    },
    maxFiles: 1,
  });
  // Fonction pour envoyer le fichier au backend
  const uploadFile = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;
    const dataform = {
      path: files[0].path,
      name: files[0].name
    }
    // const formData = new FormData();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload`, dataform, {
        headers: {
             // 'Content-Type': 'multipart/form-data',application/json; charset=utf-8
          'Content-Type': 'application/json; charset=utf-8',
        },
      });
      alert('Fichier téléchargé avec succès ! ID : ' + response.data.id);
    } catch (error) {
      console.error('Erreur lors du téléchargement :', error);
      alert('Erreur lors du téléchargement.');
    }
  };

  return (
    <div className='container'>
      <Navbar />
      <div className='box'
        {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Déposez le fichier ici ...</p>
        ) : (
          <p>Glissez-déposez un fichier ici, ou cliquez pour sélectionner un fichier</p>
        )}
      </div>

      {files.length > 0 && (
        <form className='comments' onSubmit={uploadFile}>
          <h3>Fichier sélectionné :</h3>
          {preview && <img src={preview} alt="Aperçu" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
          <p>{files[0].name} ({Math.round(files[0].size / 1024)} Ko)</p>
          <p>{preview}</p>
          <button type="submit" style={{ marginTop: '10px' }}>
            Télécharger
          </button>
        </form>
      )}
    </div>
  );
};

export default FileUploader;