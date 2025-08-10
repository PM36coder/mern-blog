import React from 'react'
import { Link } from "react-router-dom";

const Posts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts yet</h3>
        <p className="text-gray-500">Be the first to share your story!</p>
      </div>
    )
  }

  return (
    <>
      {posts.map((post) => {
        const {
          _id,
          title,
          content,
          image,
          createdAt,
          author,
          category
        } = post;

        const excerpt = content?.length > 130 ? content.slice(0, 130).trim() + "..." : content;

        return (
          <article 
            key={_id} 
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {title?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              
              {/* Category Badge */}
              {category && (
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                  {category}
                </div>
              )}
              
              {/* Reading Time */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                {Math.ceil(content?.length / 200) || 1} min read
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              {/* Author Info */}
              <div className="flex items-center mb-4">
                {author?.profile ? (
                  <img
                    src={author.profile}
                    alt={author.username}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {author?.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-800">
                    {author?.name || 'Anonymous'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {title}
              </h2>

              {/* Content Preview */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-gray-500 text-sm">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    {Math.floor(Math.random() * 1000)}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                    </svg>
                    {Math.floor(Math.random() * 50)}
                  </span>
                </div>
                
                <Link
                  to={`/post/${_id}`}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center group-hover:translate-x-1 transition-transform"
                >
                  Read More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        )
      })}
    </>
  )
}

export default Posts