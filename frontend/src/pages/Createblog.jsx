import { useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { updatetitleandsubtitle } from "../Atoms.jsx";

export function Createblog() {

    const [title , setTitle] = useState("");
    const [category , setcategory] = useState("");
    const navigate = useNavigate();
    const [loading , setloading] = useState(false);
    const  updateblog = useSetRecoilState(updatetitleandsubtitle);
    const blogvalue = useRecoilValue(updatetitleandsubtitle);
    console.log(blogvalue);

    function getselectedCategory(value){
        setcategory(value);

    }

    const createblog = async()=>{
        setloading(true);
        try{
            const response = await axios.post("http://localhost:8000/api/v1/blog/", {title ,category},{
                headers : {"Content-type" : "application/json"},
                withCredentials:true,
            })
            if(response.data.success){
                navigate(`/dashboard/write-blog/${response.data.blogcreate._id}`);
                toast.success(response.data.message);
                updateblog(response.data);
            }else{
                toast.error("Something went wrong");
            }
            
 
        }
        catch(error){
            console.log(error);

        }
        finally{
            setloading(false);
        }
    }
  return (
    <div className="p-4  h-screen ml-[320px] pt-20">
      <div className="p-10 bg-white rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold">Lets create blog</h1>
        <p></p>
        <div className="mt-10">
          <div>
            <Label className="pb-2" value={title}>Title</Label>
            <Input
              type="text"
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Your blog name"
              className="bg-white font-bold "
            ></Input>
          </div>
          <div className="mt-4 mb-5">
            <Label className="pb-2">Category</Label>
            <Select onValueChange={getselectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Web development">Web development</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="Blogging">Blogging</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Interview Prep">Interview Prep</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={createblog}>{
                loading? <><Loader2 className="mr-1 h-4 w-4 animate-spin"/>Please wait</> : "Create"
}   </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
