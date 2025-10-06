import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { FaMoon } from "react-icons/fa";
import { Avatar } from "../components/ui/avatar";
import { AvatarFallback } from "../components/ui/avatar";
import { AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { profileatom, profileselector } from "../Atoms.jsx";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export function Navbar() {
  const navigate =useNavigate();
    
      const [user, setUser] = useRecoilState(profileatom);
      const profile = useRecoilValue(profileselector);
      console.log(profile.userfind);

       
  

    async function logoutfnc(){
      const response = await axios.get("http://localhost:8000/api/v1/user/logout" ,{
        withCredentials:true,
      })
      if(response.data.success){
        toast.success(response.data.message);
        setUser(false);
        navigate("/")
      }
    
    }

    
  
  return (
    <div className="w-screen border-2 border-gray-300 py-3 fixed z-50 bg-white">
      <div className="flex items-center justify-between px-10">
        <div className="flex items-center gap-5 px-20">
          <Link>
            <div className="flex items-center">
              <img src={logo} alt=" " className="h-10 w-10"></img>
              <h1 className="font-bold text-3xl">Logo</h1>
            </div>
          </Link>
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Search ..."
              className="bg-gray-200 w-70"
            ></Input>
            <Button className="cursor-pointer">
              <Search />
            </Button>
          </div>
        </div>

        <div className="flex gap-4 px-20">
          <nav>
            <ul className="flex font-semibold gap-7 text-xl">
              <Link to={"/"}>
                <li>Home</li>
              </Link>
              <Link to={"/blogs"}>
                <li>Blogs</li>
              </Link>
              <Link to={"/about"}>
                <li>About</li>
              </Link>
            </ul>
          </nav>
          <div>
            {user ? (
              <div className="flex gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                  <AvatarImage src={profile?.userfind?.photoUrl} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" sideOffset={13}>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>navigate("/dashboard/profile")}>Profile</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer"  onClick={()=>navigate("/dashboard/your-blog")}>Your blog</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={()=>navigate("/dashboard/create-blog")}>Create blogs</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button className="cursor-pointer" onClick={logoutfnc}>Logout</Button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to={"/signup"}>
                  <Button className="cursor-pointer">Signup</Button>
                </Link>
                <Link to={"/login"}>
                  <Button className="cursor-pointer">Login</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
