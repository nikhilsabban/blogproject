import {atom ,selector} from "recoil";
import axios  from "axios";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();


export const profileatomselector = selector({
    key : "profileatomselector",
    get : async () => {
    try {
      const response = await axios.get("https://blogproject-2-2k9t.onrender.com/api/v1/user/verify", {
        withCredentials: true,
      });
      if (response.data.success) {
        return response.data.success;
      } 
    } catch (error) {
      console.error("Verification failed:", error);
      return error.response.data.success;
    }
  }
    })


export const profileatom =atom({
    key : "profilepicatom",
    default : profileatomselector,
})

export const profileselector = selector({
  key : "profileselector",
  get : async()=>{
    try{
     const response =await  axios.get("https://blogproject-2-2k9t.onrender.com/api/v1/user/me" ,{
              headers:{
                "Content-Type" : "application/json",
              } ,
              withCredentials:true,  
            })
            return response.data;
          }
          catch(error){
            return error.response.data.success;
            console.log(error);
          }
        }
})


export const profiledetails=atom({
  key : "profiledetails",
  default:profileselector,
})


export const editatom = atom({
  key : "editatom",
  default : { 
    firstName : "",
    lastName : "",
    bio : "",
    instagram : "",
    linkedin : "",
    github : "",
    facebook : "",
    photoUrl :"",
  }
})

export const updatetitleandsubtitle = atom({
  key : "updateblogdetails",
  default : null ,
  effects_UNSTABLE: [persistAtom],
})



