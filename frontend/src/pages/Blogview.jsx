import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { useRecoilValue } from "recoil";
import { editatom, profileatom, profileselector } from "../Atoms.jsx";
import { Button } from "../components/ui/button";
import { FaRegHeart ,FaHeart} from "react-icons/fa";
import { Bookmark, MessageSquare, Share2 } from "lucide-react";
import { toast, Toaster } from "sonner";

export function Blogview() {
  const params = useParams();
  const blogid = params.blogId;
  const [blog, setblog] = useState("");
  const [liked, setliked] = useState(false);
  const authordetail = useRecoilValue(profileselector);

  const handleshare = (blogId) => {
    const blogUrl = `${window.location.origin}/blogs/${blogId}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Chech out this blog!",
          text: "Read this amazing blog post",
          url: blogUrl,
        })
        .then(() => console.log("shared successfully"))
        .catch((err) => console.error("Error sharing"));
    } else {
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success("blog link copied");
      });
    }
  };

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/blog/blog/${blogid}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setblog(response.data.findblog);
         setliked(response.data.findblog.likes.length);

        }
      } catch (error) {
        console.log(error.response.data.success);
      }
    };

    getBlog();
  }, [blogid]);

  const formatDate = (isDate) => {
    const date = new Date(isDate);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };


  const  likeordislike = async()=>{
    const response = await axios.get(`http://localhost:8000/api/v1/blog/${authordetail.userfind._id}/${liked ? "like" : "dislike"}` , {withCredentials:true});

  }

  
  
  return (
    <div className="pt-12">
      <div className="max-w-6xl mx-auto p-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/docs/components">Blogs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{blog.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="my-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center space-x-4"></div>
            <Avatar>
              <AvatarImage src={blog.thumbnail} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div>
              <p>
                {authordetail.userfind.firstName}{" "}
                {authordetail.userfind.lastName}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Published on {formatDate(blog.createdAt)}
          </p>
        </div>
        <div className="mb-8 rounded-4xl- overflow-hidden">
          <img
            src={blog.thumbnail}
            alt="thumbnail"
            className="w-full object-cover  h-[400px]"
          ></img>
          <p className="text-xl text-muted-foreground mt-2">{blog.subtitle}</p>
        </div>
        <p dangerouslySetInnerHTML={{ __html: blog.description }}></p>
        <div className="flex items-center justify-between border-y border-e-gray-300 py-4 mb-8">
          <div className="flex items-center space-x-4 ">
            <Button
              onClick={() => setliked(!liked)}
              variant="ghost"
              className="flex items-center gap-1"
            >
              <FaHeart
                size={24}
                className={`cursor-pointer ${
                  liked ? "text-red-500" : "text-gray-300"
                } hover:text-red-600`}
              />
              <span>0</span>
            </Button>

      
            <div className="flex items-center space-x-2">
              <Button variant="ghost">
                <Bookmark className="w-4 h-4"></Bookmark>
              </Button>
              <Button variant="ghost" onClick={() => handleshare(blog._id)}>
                <Share2 className="w-4h-4"></Share2>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
