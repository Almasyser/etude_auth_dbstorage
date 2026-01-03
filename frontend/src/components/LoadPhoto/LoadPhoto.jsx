// import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
// import superagent from 'superagent';
import "./loadphoto.css";

function LoadPhoto({setPicture}) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map((file)=>{
    setPicture(file.path)
    return file.path;
    }
  )
  return (
    <div className='loadphoto'>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Glissez-déposez une photo</p>
      </div>
      <p>{files}</p>
      <img src={files}/>
      
    </div>
  )
}

export default LoadPhoto;