import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./components/Login"
import Register from "./components/Register"
import PostDetails from "./components/PostDetails"
import DashBoard from "./components/DashBoard"
import Error from "./layout/Error"
import CreatePost from "./components/CreatePost"
import EditPost from "./components/Editpost"
// import CommentSection from "./components/CommentSection"



function App() {
   const router = createBrowserRouter([
    {
      path: "/", 
      element: <Layout/>,
      errorElement: <Error/>, 
      children: [
        {path: "", element: <Home/>},
        {path: "/about", element: <About/>},
        {path: "/contact", element: <Contact/>},
        {path: "/login", element: <Login/>},
        {path: "/register", element: <Register/>},
        {path: "/dashboard", element: <DashBoard/>},
        {path: "/post/:id", element: <PostDetails/>},
        {path: "/create-post", element : <CreatePost/>},
        {path:"/dashboard/edit/:id", element : <EditPost/>}
      ]
    }
  ]);

  return (
   <>
  <RouterProvider router={router} />
   </>
  )
}

export default App
