import { Input } from "../components/ui/input";
import auth from "../assets/auth.jpg"
import { Button } from "../components/ui/button";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"; 
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileatom, profiledetails } from "../Atoms";


export function Login(){
    const navigate = useNavigate();
    const uservalue = useSetRecoilState(profileatom);
 
    
      const [user , setuser]= useState({
        email : "",
        password : "",
      })

      async function userlogin(){
        try{
            const response =await  axios.post("http://localhost:8000/api/v1/user/login" , user,{
              headers:{
                "Content-Type" : "application/json",
              } ,
              withCredentials:true,
            })
            if(response.data.success){
              uservalue(true);
                toast.success(response.data.message ,{
                  duration:2000,
                });
              
                navigate("/")
                
            }
        }
        catch(error){
            console.log(error.response.data.message);
          toast.error(error.response.data.message ,{
                  duration:2000,
                });
        }
      }
    
    return(
    <div className="flex h-screen  ">
                <div>
                    <img src={auth} alt =" " className="h-[705px]"></img>
                </div>
                <div className="flex justify-center items-center flex-1 bg-gray-100">
    
                <div className=" h-115 w-100 rounded-xl shadow-2xl p-10">
    
                    <div className="place-items-center">
                    <h1 className="text-2xl font-extrabold p-2">Login into your Account</h1>

                    <div className="flex-col place-items-center p-2">
                    <div className="text-xl  text-gray-600">Enter the details below to  </div>
                         <div className="text-xl  text-gray-600">login your account</div>
                       
                        </div>
    
            
                    <div className="text-xl font-bold p-2 ">Email
                    <Input type="text" placeholder="example@gmail.com" className="w-[300px]" onChange={
                        (e)=>{
                            setuser({...user , email :e.target.value});
                        }
                    }></Input>
                    </div>

                      <div className="text-xl font-bold p-2" >Password
                    <Input type="password" placeholder="Create a password" className="w-[300px] " onChange={
                        (e)=>{
                        setuser({...user , password : e.target.value});
                        }
                    }></Input>
                    </div>

                    <div className="p-2">
                    <Button className="px-32 bg-black text-white rounded cursor-pointer" onClick={userlogin}>Login</Button>
                    </div>
    
                    <div className="p-2 text-xl font-bold">Don't have an account? <Link to={"/signup"}><button className="underline cursor-pointer">Signup</button></Link></div>
                </div>
                </div>
                </div>
            </div>
    )
}