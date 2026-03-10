function CheckAdmin(value) {
  if(value=== "1" || value==="true" || value==="on" || value===1){
    return true;
  } else {
    return false;
  }
}
export default CheckAdmin