function CheckAdmin(value) {
  console.log("value   ",value);
  
  if(value=== "1" || value==="true" || value==="on"){
    return true;
  } else {
    return false;
  }
}
export default CheckAdmin