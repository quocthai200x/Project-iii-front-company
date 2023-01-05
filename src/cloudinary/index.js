import axios from "axios"
let apiCloudinary = "https://api.cloudinary.com/v1_1/dbpieg8qe/upload";
let preset = "gj08ngug";

export const uploadImage = async ({file}) =>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID c293c064740fe7e"); 
    
    var formdata = new FormData();
    formdata.append("image",file);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://api.imgur.com/3/image", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}