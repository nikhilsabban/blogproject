import { Input } from "../components/ui/input.jsx";
import { Button } from "../components/ui/button.jsx";
import { Label } from "../components/ui/label.jsx";
import JoditEditor from "jodit-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.jsx";
import { use, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { errorSelector } from "recoil";

export function Updateblog() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const { blogId } = useParams();
  const [loading , setloading] = useState(false);
   const [published , setpublished] = useState("Publish");

  const [blogdata, setBlogdata] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    thumbnail: null,
  });
  const [content, setContent] = useState("");
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://blogproject-2-2k9t.onrender.com/api/v1/blog/blog/${blogId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const blog = res.data.findblog;
          setBlogdata({
            title: blog.title || "",
            subtitle: blog.subtitle || "",
            description: blog.description || "",
            category: blog.category || "",
            thumbnail: null, 
          });
          setContent(blog.description || "");
          setPreviewThumbnail(blog.thumbnail || "");
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch blog data");
      }
    };
    fetchBlog();
  }, [blogId]);

  const fileHandle = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogdata({ ...blogdata, thumbnail: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateBlog = async () => {
    setloading(true);
    const formData = new FormData();
    formData.append("title", blogdata.title);
    formData.append("subtitle", blogdata.subtitle);
    formData.append("description", content);
    formData.append("category", blogdata.category);
    if (blogdata.thumbnail) formData.append("file", blogdata.thumbnail);

    try {
      const res = await axios.put(`https://blogproject-2-2k9t.onrender.com/api/v1/blog/${blogId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update blog");
    }
    finally{
        setloading(false);
    }
  };

  const publishedbutton = async()=>{
    try{
    const res = await axios.get(`https://blogproject-2-2k9t.onrender.com/api/v1/blog/published/${blogId}`,{
      withCredentials: true
    })
    if(res.data.success){
      if(published ==="Publish"){
        setpublished("Unpublish");
      }
      else{
        setpublished("Publish");
      }
      toast.success(published + "ed" + " " + "successfully");
    }
  }
    catch(err){
      toast.error(error.res.data.message);

    }
  }

  const removebutton = async()=>{
    try{
    const res = await axios.get(`https://blogproject-2-2k9t.onrender.com/api/v1/blog/remove/${blogId}`,{
      withCredentials: true
    })
    if(res.data.success){
      navigate(-1);
      toast.success(res.data.message);
    }
  }
    catch(err){
      toast.error(error.res.data.message);

    }
  }

  return (
    <div className="ml-[320px] pt-20 px-3 pb-10 h-auto">
      <div className="max-w-6xl mx-auto mt-8">
        <div className="bg-white w-full rounded-2xl p-7 shadow-xl">
          <h1 className="font-bold py-2 text-4xl">Basic blog information</h1>
          <p className="font-semibold py-2">Make changes to your blogs here. Click Publish when you are done </p>

          <div className="space-x-2 py-2">
            <Button onClick={publishedbutton} className="hover:cursor-pointer">{published}</Button>
            <Button variant="destructive" onClick={removebutton} className="hover:cursor-pointer">Remove blog</Button>
          </div>

          <div className="py-2">
            <Label className="pb-2">Title</Label>
            <Input
              type="text"
              placeholder="Enter a title"
              value={blogdata.title}
              onChange={(e) => setBlogdata({ ...blogdata, title: e.target.value })}
            />
          </div>

          <div className="py-2">
            <Label className="pb-2">SubTitle</Label>
            <Input
              type="text"
              placeholder="Enter a subtitle"
              value={blogdata.subtitle}
              onChange={(e) => setBlogdata({ ...blogdata, subtitle: e.target.value })}
            />
          </div>

          <div className="py-2">
            <Label className="pb-2">Description</Label>
            <JoditEditor ref={editor} value={content} onChange={setContent} />
          </div>

          <div className="py-2">
            <Label className="pb-2">Category</Label>
            <Select
              value={blogdata.category}
              onValueChange={(value) => setBlogdata({ ...blogdata, category: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent position="popper">
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

          <div className="py-2">
            <Label className="pb-2">Thumbnail</Label>
            <Input type="file" accept="image/*" onChange={fileHandle} />
            {previewThumbnail && (
              <img src={previewThumbnail} className="w-64 my-2" alt="Blog thumbnail preview" />
            )}
          </div>

          <div className="flex gap-4 py-2">
            <Button variant="outline" onClick={() => navigate(-1)} className="hover:cursor-pointer">Back</Button>
            <Button onClick={updateBlog} className="hover:cursor-pointer">{loading ? <Loader2 className="animate-spin w-5 h-5 mr-2 inline-block" /> : null}
            Save changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
