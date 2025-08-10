import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft, Sparkles, Star, Heart } from 'lucide-react';

const Error = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    // Generate floating elements
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setFloatingElements(elements);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGoHome = () => {
    // Replace with your navigation logic
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{
            left: `${mousePosition.x / 4}%`,
            top: `${mousePosition.y / 4}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-out',
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{
            right: `${mousePosition.x / 6}%`,
            bottom: `${mousePosition.y / 6}%`,
            animationDelay: '1s',
          }}
        />
        
        {/* Floating Elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animation: `float ${element.duration}s ${element.delay}s infinite ease-in-out alternate`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated 404 */}
          <div className="relative mb-8">
            <h1 
              className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 animate-pulse select-none cursor-default"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                textShadow: '0 0 80px rgba(168, 85, 247, 0.4)',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease',
              }}
            >
              404
            </h1>
            
            {/* Sparkle Effects */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <Sparkles
                  key={i}
                  className={`absolute text-yellow-300 opacity-70 animate-ping`}
                  size={20}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Oops! Article Not Found
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              The blog post you're looking for doesn't exist or may have been moved
            </p>
            <p className="text-lg text-gray-400">
              Don't worry! Let's help you find some amazing content instead
            </p>
          </div>

          {/* Fun Icons */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="animate-bounce">
              <Star className="text-yellow-400" size={24} />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
              <Heart className="text-pink-400" size={24} />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
              <Sparkles className="text-purple-400" size={24} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGoHome}
              className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/25 focus:outline-none focus:ring-4 focus:ring-pink-500/50"
            >
              <div className="flex items-center space-x-2">
                <Home size={20} />
                <span>Browse All Posts</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-violet-700 rounded-full blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
            </button>

            <button
              onClick={handleGoBack}
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              <div className="flex items-center space-x-2">
                <ArrowLeft size={20} />
                <span>Go Back</span>
              </div>
            </button>

            <button
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
            >
              <div className="flex items-center space-x-2">
                <Search size={20} />
                <span>Search Articles</span>
              </div>
            </button>
          </div>

          {/* Fun Footer Message */}
          <div className="mt-12 text-gray-400 text-sm">
            <p>Looking for something specific? Try our search or browse latest articles 📖</p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
          50% { text-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.6); }
        }
      `}</style>
    </div>
  );
};

export default Error;