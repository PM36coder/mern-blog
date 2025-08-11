import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {API} from "../utils/Axios.jsx"
import Posts from "../components/Posts.jsx";
import { useAuth } from "../../store/contextApi.jsx";
const Home = () => {


const [posts ,setPosts] = useState([])
const [loading, setLoading] = useState(true)
const {user} = useAuth()

const getAllPosts = async()=>{
 try {
    setLoading(true)
    const res = await API.get("/post/all-post")
 const data =  res.data
 
 setPosts(data.posts || [])
 setLoading(false)
 } catch (error) {
    console.log(error)
    setLoading(false)
 }
}

useEffect(()=>{
    getAllPosts()
},[])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-10">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Welcome to <span className="text-blue-600">DevWrite</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A blog platform for developers to share insights, tutorials, and stories that inspire.
        </p>

        {!user ? (<div className="mt-6">
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>): null}
      </section>

      {/* Featured Posts */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
          Featured Articles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {loading ? (
    <div className="col-span-full text-center py-8">
      <p>Loading....</p>
    </div>
  ) : (
    <Posts posts={posts} />
  )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto mt-20 text-center">
        <h3 className="text-2xl font-bold mb-3">
          Want to share your own knowledge?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-5">
          Start publishing your own blogs with ease. It’s free and simple!
        </p>
        <Link
          to="/create-post"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition"
        >
          Create Post
        </Link>
      </section>
    </div>
  );
};

export default Home;
