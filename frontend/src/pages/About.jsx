import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              About Blogify
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Where stories come alive and ideas find their voice. Join our community of passionate writers and readers.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Blogify was born from a simple belief: everyone has a story worth telling. In a world flooded with information, 
              we wanted to create a space where authentic voices could shine through.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Since our launch, we've grown into a vibrant community of writers, thinkers, and dreamers who share their 
              experiences, insights, and creativity with the world.
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-500">Stories Published</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">5K+</div>
                <div className="text-sm text-gray-500">Active Writers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50K+</div>
                <div className="text-sm text-gray-500">Monthly Readers</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">✍️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Write Your Story</h3>
                    <p className="text-gray-600 text-sm">Share your unique perspective</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded-full mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Believe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do and shape the community we're building together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We embrace new ideas and technologies to enhance the writing and reading experience.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Community</h3>
              <p className="text-gray-600">
                Building meaningful connections between writers and readers around the world.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Authenticity</h3>
              <p className="text-gray-600">
                Celebrating genuine voices and original perspectives in every story shared.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <p className="text-gray-600">The passionate people behind Blogify</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">P</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pravesh Yadav</h3>
            <p className="text-blue-600 mb-3">Founder & CEO</p>
            <p className="text-gray-600 text-sm">
              Passionate about creating platforms that amplify human creativity and connection.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">S</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sarah Johnson</h3>
            <p className="text-purple-600 mb-3">Head of Content</p>
            <p className="text-gray-600 text-sm">
              Dedicated to fostering a supportive environment where writers can flourish.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">M</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Mike Chen</h3>
            <p className="text-green-600 mb-3">Lead Developer</p>
            <p className="text-gray-600 text-sm">
              Building the technical foundation that powers creativity and innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
