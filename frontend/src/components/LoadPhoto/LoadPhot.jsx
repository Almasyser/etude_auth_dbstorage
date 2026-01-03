import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import axios from 'axios';
import "./loadphoto.css";

function LoadPhoto({ setPicture }) {
  const [preview, setPreview] = useState(null);
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setPicture(previewUrl);
  },[setPicture])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
  });

  return (
    <>
      <form className='loadphoto'>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Déposez la photo ici...</p>
          ) : (
            <p>Glissez-déposez une photo, ou cliquez pour sélectionner</p>
          )}
        </div>
      </form>
      {preview && (
        <div className="preview">
          <img src={preview} alt="Aperçu" />
        </div>
      )}
    </>
  );
}

export default LoadPhoto;

    // Envoi au backend pour sauvegarde
    // const formData = new FormData();
    // formData.append('image', file);

    // try {
    //   const response = await axios.post('http://localhost:3001/api/save-image', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   });
    //   setMessage(response.data.message);
    // } catch (error) {
    //   setMessage(error.response?.data?.error || "Erreur lors de la sauvegarde.");
    // }
  // }, [setPicture]);