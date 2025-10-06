import {  ChartColumnBig, MessageSquare, SquareUser } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function Sidebar(){
    return(
        <div className="mt-10 w-[300px] p-10 space-y-2  h-screen fixed bg-white border-gray-300 z-10 border-r-2 shadow-xl">
            <div className="text-center pt-10 px-3 space-y-2">
                <NavLink to={"/dashboard/profile"} className={({isActive})=>
                 `text-2xl ${isActive? "bg-gray-800 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold rounded-2xl w-full cursor-pointer p-2`}>
                    <SquareUser/>
                    <span>Profile</span>
                 </NavLink>
                 <NavLink to={"/dashboard/your-blog"} className={({isActive})=>
                 `text-2xl ${isActive? "bg-gray-800 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold rounded-2xl w-full cursor-pointer p-2`}>
                    <ChartColumnBig/>
                    <span>Your Blogs</span>
                 </NavLink>
                 
                 <NavLink to={"/dashboard/write-blog"} className={({isActive})=>
                 `text-2xl ${isActive? "bg-gray-800 text-gray-200" : "bg-transparent"} flex items-center gap-2 font-bold rounded-2xl w-full cursor-pointer p-2`}>
                    <FaRegEdit/>
                    <span>Create blog</span>
                 </NavLink>
                
            </div>
        </div>
    )
}