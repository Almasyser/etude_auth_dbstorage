
import avatars from "../../assets/avatars";
import "./btnradio.css";
function BtnRadio() {
    const cles = Object.values(avatars);
    console.log(cles);
    const handleOnChange=(e)=>{
      // console.log(e);
      console.log(e);
      
    }
    
  return (
    <div className="btnradio">
      {cles.map((el, index)=>{
        return( 
          <label className="label" key={index}>
            <img src={el} alt="RR" htmlFor="radio"/>
            <input type="radio" id="radio" name="radio" onChange={handleOnChange}/>
          </label>         
        )
      })}
    </div>
  )
}

export default BtnRadio