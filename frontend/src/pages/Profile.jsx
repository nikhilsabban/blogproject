import { AvatarImage, Avatar } from "../components/ui/avatar";
import userlogo from "../assets/user.jpg";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRecoilValue ,useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { editatom, profiledetails } from "../Atoms.jsx";
import axios from "axios";

export function Profile() {
  const [textlength, settextlength] = useState("");
  const setdailog = useSetRecoilState(editatom);
  const dialog = useRecoilValue(editatom);
  const [profile ,setprofile] = useState(null);
  const [refresh ,setrefresh] =useState(false);
 

  
  function textLength(e) {
    settextlength(e.target.value.length);
    if (textlength >= 198) {
      toast.error("Text limit exceeded");
      e.target.value = words.slice(0, 200).join(" ");
    }
       setdailog((prev)=>({...prev , bio : e.target.value}));
           
  }

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/user/me", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if(response.data){
    
      setprofile(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchProfile(); 
}, [refresh]); 


  async function buttonclick(){
    
    const formdata = new FormData();
    formdata.append('firstName' , dialog.firstName);
    formdata.append('lastName' , dialog.lastName);
    formdata.append('bio' , dialog.bio);
    formdata.append('instagram' , dialog.instagram);
    formdata.append('github' , dialog.github);
    formdata.append('linkedin' , dialog.linkedin);
    formdata.append('facebook' , dialog.facebook);
    if(dialog.photoUrl){
      formdata.append("file" , dialog.photoUrl);
    }
    
    try{
      const response = await axios.put("http://localhost:8000/api/v1/user/profile/update" ,formdata,{
        headers:{
          "Content-Type" : "multipart/form-data"
        },
        withCredentials:true,
      });
      if(response.data){
        toast.success(response.data.message);
        setrefresh(true);
      }

    }
    catch(error){
      toast.error(error.response.data.message);

    }    
  }

  return (
    <div className="pt-30 ml-[300px] h-screen p-15 ">
      <div className="bg-white shadow-2xl h-75 w-full  flex rounded-2xl">
        <div className="text-center">
          <div className=" flex items-center justify-center pt-8 w-85">
            <Avatar className="w-40 h-40 cursor-pointer hover:border-4 border-black">
              <AvatarImage src={profile?.userfind?.photoUrl || userlogo}></AvatarImage>
            </Avatar>
          </div>
          <h1 className="text-2xl font-bold">Web developer</h1>
          <div className="flex gap-4 justify-center pt-3">
            <Link to={profile?.userfind?.linkedin || "/"} target="_blank">
              <FaLinkedinIn
                className="bg-black text-white rounded p-1"
                size={30}
              ></FaLinkedinIn>
            </Link>
            <Link to={profile?.userfind?.github || "/"} target="_blank">
              <FaGithub
                className="bg-black text-white rounded p-1"
                size={30}
              ></FaGithub>
            </Link>
            <Link to={profile?.userfind?.facebook || "/"} target="_blank">
              <FaFacebook
                className="bg-black text-white rounded p-1"
                size={30}
              ></FaFacebook>
            </Link>
            <Link to={profile?.userfind?.instagram || "/"} target="_blank" >
              <FaInstagram
                className="bg-black text-white rounded p-1"
                size={30}
                
              ></FaInstagram>
            </Link>
          </div>
        </div>
        <div className=" flex-1 rounded-2xl pr-6 pt-7">
          <h1 className="font-bold text-4xl p-2 ">Welcome {profile?.userfind?.firstName ||"null"}</h1>
          <p className="p-2 text-xl">
            <span className="font-semibold">Email:  </span>{profile?.userfind?.email || "null"}
          </p>
          <span className="p-2 font-semibold">About Me:</span>
          <div className="border-2 rounded p-2 shadow-xl w-[720px] break-words">
            <p className="p-2">
              {profile?.userfind?.bio || "null"}
            </p>
          </div>
          <div className="p-2">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-black text-white">
                    Open Dialog
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center">
                      Edit profile
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Make changes to your profile here.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">First Name</Label>
                      <Input id="name-1" name="name" placeholder="First Name" onChange={(e) => {
                       setdailog((prev)=>({...prev , firstName : e.target.value}));
                      }}
                                 />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1">Last Name</Label>
                      <Input
                        id="username-1"
                        placeholder="Last Name"
                        onChange={(e) => {
                       setdailog((prev)=>({...prev , lastName : e.target.value}));
                      }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Facebook</Label>
                      <Input
                        id="name-1"
                        placeholder="Enter the URI"
                        onChange={(e) => {
                       setdailog((prev)=>({...prev , facebook : e.target.value}));
                      }}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1">Github</Label>
                      <Input
                        id="username-1"
                        
                        placeholder="Enter the URI"
                        onChange={(e) => {
                       setdailog((prev)=>({...prev , github : e.target.value}));
                      }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Linkedin</Label>
                      <Input
                        id="name-1"
                        placeholder="Enter the URI"
                        onChange={(e) => {
                       setdailog((prev)=>({...prev , linkedin : e.target.value}));
                      }}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1">Instagram</Label>
                      <Input
                        id="username-1"
                       
                        placeholder="Enter the URI"
                        onChange={(e) => {
                       setdailog((prev)=>({...prev , instagram : e.target.value}));
                      }}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Description</Label>
                      <textarea
                        className="w-full border-3 border-gray-300 rounded-xl "
                        onChange={ textLength }
                      ></textarea>
                    </div>
                    <div className="grid gap-4">
                      <Label htmlFor="name-1">Picture</Label>
                      <input
                        id="file"
                        type="file"
                        accept="image/*"
                        className="w-[277px] border-3 p-2 rounded-xl cursor-pointer"
                        onChange={ (e)=>{
                          const file = e.target.files[0];
                          if(file){
                            setdailog((prev)=>({...prev, photoUrl  : file}));
                          }
                        }}
                      ></input>
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                      <DialogClose asChild>
                    <Button type="submit" onClick={buttonclick}>Save changes</Button>
                         </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
