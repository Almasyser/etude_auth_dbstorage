import { Document, Page } from 'react-pdf';
// import pdf from "../../assets/apprenez.pdf";
function ShowPdf({filePdf}) {

  return (
    <div>
      <object data={filePdf} type="application/pdf" ></object> 

    </div>
  );
}
export default ShowPdf;