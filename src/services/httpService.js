import axios from 'axios';
 
axios.interceptors.response.use(null,error=>{
  const expectedErrors = error.response && error.response.status >=400 && error.response.status<500;
 
  if(!expectedErrors){
    alert("Unexpected Error");
    console.log("logging error",error);
  }   

  return Promise.reject(error);
})

export function setJwt(jwt){
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}