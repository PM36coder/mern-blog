import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 py-12 mt-16 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-500/20 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-purple-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          
          {/* Left - Copyright with Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                MyBlog
              </span>
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} MyBlog. All rights reserved.
            </p>
          </div>

          {/* Center - Navigation Links */}
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className="relative text-gray-300 hover:text-white transition-all duration-300 group"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
            <Link 
              to="/about" 
              className="relative text-gray-300 hover:text-white transition-all duration-300 group"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
            <Link 
              to="/contact" 
              className="relative text-gray-300 hover:text-white transition-all duration-300 group"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Link>
          </div>

          {/* Right - Developer Credit */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400 mb-1">Crafted with</p>
            <div className="flex items-center justify-center md:justify-end space-x-2">
              <span className="text-red-500 animate-pulse text-lg">❤️</span>
              <span className="text-sm">by</span>
              <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text font-semibold">
                Pravesh
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Border Line */}
        <div className="mt-8 pt-6 border-t border-gray-700/50">
          <div className="text-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-500/30 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-500/40 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-pink-500/20 rounded-full animate-bounce"></div>
    </footer>
  );
};

export default Footer;