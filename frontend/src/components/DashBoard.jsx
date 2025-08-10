import { useEffect, useState } from "react";
import { API } from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/contextApi";
import { toast } from "react-toastify";
const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 const {token} = useAuth()
  const getMyPosts = async () => {
    try {
      const res = await API.get("/post/my-posts");
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!token){
    navigate("/login")
  }
    getMyPosts();

  }, []);

 const handleDelete = async(id)=>{

try {
    const res = await API.delete(`/post/delete/${id}`)
    if(res.status === 200){
        toast.success("post deleted")
        getMyPosts()
    }
} catch (error) {
    toast.error("failed to delete post")
    console.log(error)
}

 }
  

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-500 via-white to-purple-700 rounded-br-2xl rounded-bl-2xl">
      <h1 className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text font-semibold text-3xl text-center">My Posts</h1>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts created yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2   ">
          {posts.map((post) => (
            <div key={post._id} className="p-4 bg-white shadow rounded  hover:tw-scale-z-105 transition-transform duration-300 ">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover mb-2 rounded-2xl "/>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.content.slice(0, 100)}...</p>
              <div className="flex gap-2 ">
                <button
                  onClick={() => navigate(`/dashboard/edit/${post._id}`)}
                  className="px-4 py-1 bg-yellow-500 text-white rounded-2xl hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/post/${post._id}`)}
                  className="px-4 py-1 bg-blue-600 text-white rounded-2xl hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
                >
                  View
                </button>
                <button
                  onClick={()=> handleDelete(post._id)}
                  className="px-4 py-1 bg-red-600 text-white rounded-2xl hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
