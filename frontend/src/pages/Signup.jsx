import { Input } from "../components/ui/input";
import auth from "../assets/auth.jpg"
import { Button } from "../components/ui/button";
import {Link} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; 

export function Signup(){
    const navigate = useNavigate(); 
    const [user ,setuser] = useState({
        firstName : "",
        lastName : "",
        email :"",
        password : "",
    })

    async function createuser(e){
          e.preventDefault();
         console.log("Sending user data:", user); 
        try{
           const response = await axios.post("http://localhost:8000/api/v1/user/register", user ,{
            headers:{
                "Content-Type":"application/json",
            },
            withCredentials:true,
           })
           if(response.data.success){
            navigate("/login");
             toast.success(response.data.message ,{
                  duration:2000,
                });
            
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
        <div className="flex h-screen ">
            <div>
                <img src={auth} alt =" " className="h-[705px]"></img>
            </div>
            <div className="flex justify-center items-center flex-1 bg-gray-100">

            <div className=" h-130 w-100 rounded-xl shadow-2xl p-10">

                <div className="place-items-center">
                <h1 className="text-2xl font-extrabold p-2">Create an Account</h1>

                <div className="tetx-xl p-2 text-gray-600">Enter the details to create an account</div>

                <div className="flex gap-2 p-2">
                    <div className="text-xl font-bold">
                        First Name
                    <Input type="text" placeholder="First Name" onChange={
                        (e)=>{
                            setuser({...user , firstName : e.target.value});
                        }
                    }></Input>
                    </div >
                   
                    <div className="text-xl font-bold">
                        Last Name
                    <Input type="text" placeholder="Last Name" onChange={
                        (e)=>{
                            setuser({...user , lastName : e.target.value});
                        }
                    }></Input>
                    </div>
                </div>
               
                <div className="text-xl font-bold p-2 ">Email
                <Input type="text" placeholder="example@gmail.com" className="w-[300px]" onChange={
                        (e)=>{
                            setuser({...user , email : e.target.value});
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
                <Button className="px-32 bg-black text-white rounded" onClick={createuser}>Signup</Button>
                </div>

                <div className="p-2 text-xl font-bold">Already have account? <Link to={"/login"}><button className="underline cursor-pointer">Signin</button></Link></div>
            </div>
            </div>
            </div>
        </div>
    )
    
}