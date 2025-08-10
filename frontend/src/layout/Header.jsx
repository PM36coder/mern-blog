import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut, FiEdit3, FiSettings } from "react-icons/fi";
import { useAuth } from "../../store/contextApi"; // Adjust path as needed
import { toast } from "react-toastify";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const handleLogout = async () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
    setUserMenuOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          📝 MyBlog
        </Link>

        {/* Desktop Nav - Not Logged In */}
        {!token && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </Link>
            <Link 
              to="/login" 
              className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="text-sm px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
            >
              Register
            </Link>
          </nav>
        )}

        {/* Desktop Nav - Logged In */}
        {token && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </Link>
            <Link 
              to="/dashboard" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/create-post" 
              className="flex items-center space-x-1 text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiEdit3 size={16} />
              <span>Write</span>
            </Link>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="font-medium">{user?.name || 'User'}</span>
                <svg className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-blue-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <FiUser className="mr-3" size={16} />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-yellow-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <FiSettings className="mr-3" size={16} />
                    Settings
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut className="mr-3" size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Not Logged In */}
      {menuOpen && !token && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          <Link 
            to="/" 
            className="block text-gray-700 hover:text-blue-600 py-2 transition-colors" 
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="block text-gray-700 hover:text-blue-600 py-2 transition-colors" 
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="block text-gray-700 hover:text-blue-600 py-2 transition-colors" 
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <hr className="my-3" />
          <Link 
            to="/login" 
            className="block w-full text-center py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="block w-full text-center py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors" 
            onClick={toggleMenu}
          >
            Register
          </Link>
        </div>
      )}

      {/* Mobile Menu - Logged In */}
      {menuOpen && token && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-3">
          
          {/* User Info */}
          <div className="flex items-center space-x-3 py-3 border-b border-gray-200">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user?.name || 'User'}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <Link 
            to="/" 
            className="block text-gray-700 hover:text-blue-600 py-2 transition-colors" 
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="block text-gray-700 hover:text-blue-600 py-2 transition-colors" 
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="block text-gray-700 hover:text-blue-600 py-2 transition-colors" 
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link 
            to="/dashboard" 
            className="block text-gray-700 hover:text-blue-600 py-2 transition-colors" 
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
          
          <hr className="my-3" />
          
          {/* Action Buttons */}
          <Link 
            to="/create-post" 
            className="flex items-center justify-center space-x-2 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" 
            onClick={toggleMenu}
          >
            <FiEdit3 size={16} />
            <span>Write Post</span>
          </Link>
          
          <Link 
            to="/profile" 
            className="flex items-center justify-center space-x-2 w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors" 
            onClick={toggleMenu}
          >
            <FiUser size={16} />
            <span>My Profile</span>
          </Link>
          
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center space-x-2 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FiLogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;