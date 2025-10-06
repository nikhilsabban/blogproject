import { useEffect, useState } from "react";
import { Link } from "react-router-dom";  // ✅ Import Link
import axios from "axios";

export function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://blogproject-2-2k9t.onrender.com/api/v1/blog/get-all-blog",
          { withCredentials: true }
        );

        if (response.data.blog) {
          setBlogs(response.data.blog);
        } else {
          setError("No blogs found");
        }
      } catch (err) {
        setError("Error fetching blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-xl">Loading blogs...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="pt-20 max-w-6xl mx-auto">
      {blogs.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No blogs available
        </div>
      ) : (
        blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blogs/${blog._id}`} // ✅ Redirects to blog details
            className="block"
          >
            <div className="h-50 w-full border-2 shadow-xl rounded-2xl flex p-5 mb-6 hover:shadow-2xl transition duration-200">
              {/* Thumbnail */}
              <div className="w-60">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>

              {/* Blog details */}
              <div className="flex-1 pl-5">
                <div className="text-2xl font-extrabold">{blog.title}</div>
                <div className="text-gray-600 mb-2">{blog.subtitle}</div>
                <div className="text-sm text-gray-400">
                  Published on{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-GB")}
                </div>
                <div className="text-sm font-medium mt-1">
                  Category: {blog.category}
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
