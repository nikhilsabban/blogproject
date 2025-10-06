import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useEffect, useState } from "react";
import { EllipsisVertical, Edit, Trash2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Yourblog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getOwnBlog = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/blog/get-own-blog",
        { withCredentials: true }
      );
      if (response.data.success) {
        setBlogs(response.data.blogs);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch blogs");
    }
    setLoading(false);
  };

  useEffect(() => {
    getOwnBlog();
  }, []);

  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/blog/delete/${id}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setBlogs((prev) => prev.filter((blogItem) => blogItem?._id !== id));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <div className="pb-10 pt-20 ml-[320px] min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin w-10 h-10" />
        </div>
      ) : (
        <div className="bg-white mr-5 rounded-2xl shadow-xl">
          <Table>
            <TableCaption>A list of your recent blogs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="flex gap-4 items-center">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        className="w-16 h-16 object-cover rounded-md"
                        alt=""
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-md" />
                    )}
                    <h1
                      onClick={() => navigate(`/blogs/${item._id}`)}
                      className="hover:underline cursor-pointer text-base font-medium"
                    >
                      {item.title}
                    </h1>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="p-2">
                          <EllipsisVertical />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-80">
                        <DialogHeader>
                          <DialogTitle>Actions</DialogTitle>
                          <DialogDescription>
                            Choose an action for your blog.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-3 mt-4">
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() =>
                              navigate(`/dashboard/write-blog/${item._id}`)
                            }
                          >
                            <Edit size={16} /> Edit
                          </Button>
                          <Button
                            variant="destructive"
                            className="flex items-center gap-2"
                            onClick={() => deleteBlog(item._id)}
                          >
                            <Trash2 size={16} /> Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
