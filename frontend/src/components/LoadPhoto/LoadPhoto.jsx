import { useDropzone } from 'react-dropzone';
import "./loadphoto.css";
function LoadPhoto({setPhoto}) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept:{
      'image/*': ['.jpeg', '.jpg', '.png'],
  
    }
  });
  const files = acceptedFiles.map((file)=>{
    setPhoto(file.path)
    return file.path;
    }
  )
  console.log("files :", files);
  return (
    <>
      <form className='loadphoto'>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Glissez-déposez une photo</p>
        </div>
      </form>
    </>
  )
}

export default LoadPhoto;