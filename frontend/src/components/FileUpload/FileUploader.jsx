import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null);

  // Fonction pour gérer le drop des fichiers
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    // Aperçu pour les images
    if (acceptedFiles[0].type.startsWith('image/')) {
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
  const uploadFile = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
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
    <div>
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Déposez le fichier ici ...</p>
        ) : (
          <p>Glissez-déposez un fichier ici, ou cliquez pour sélectionner un fichier</p>
        )}
      </div>

      {files.length > 0 && (
        <div>
          <h3>Fichier sélectionné :</h3>
          <p>{files[0].name} ({Math.round(files[0].size / 1024)} Ko)</p>
          {preview && <img src={preview} alt="Aperçu" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
          <button onClick={uploadFile} style={{ marginTop: '10px' }}>
            Télécharger
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;