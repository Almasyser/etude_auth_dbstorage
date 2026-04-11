

import avatars from "../../assets/avatars";
import "./btnradio.css";
function BtnRadio({setAvatarInput}) {
    const cles = Object.values(avatars);
    const handleOnChange=(e)=>{
      const val = e.currentTarget.value;
      console.log(cles[val]);
      setAvatarInput(val);
  
    }
    
  return (
    <div className="btnradio">
      {cles.map((el, index)=>{
        return(
          <div key={index}>
            <label className="radioLabel">
              <input 
                className="radioInput"
                type="radio" 
                id="radio" 
                name="radio" 
                onChange={handleOnChange}
                value={index}/>
              <img 
                src={el} 
                alt="RR" 
                htmlFor="radio"
                className="radioImg"/>
                
            </label> 
          </div>
        )
      })}
    </div>
  )
}

export default BtnRadio