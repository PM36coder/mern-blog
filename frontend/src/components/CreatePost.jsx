import React, { useState } from 'react';
import { Upload, X, FileImage, Edit3, Eye } from 'lucide-react';
import { API } from '../utils/Axios';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    document.getElementById('image-input').value = '';
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      if (image) {
        submitData.append('image', image);
      }

      const response = await API.post('/post/create', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials : true,
        credentials : "include" //for httpOnly cookies
      });
      const data = await response.data;
      

      if (response.ok && data) {
        // Reset form
        setFormData({ title: '', content: '' });
        setImage(null);
        setImagePreview(null);
        setPreviewMode(false);
        document.getElementById('image-input').value = '';
        
        // Callback to parent component
        if (onPostCreated) {
          onPostCreated(data.post);
        }
        
        toast.success(data.message)
        navigate("/dashboard")
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const PreviewContent = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Preview</h2>
        <button
          onClick={() => setPreviewMode(false)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <Edit3 size={16} />
          <span>Edit</span>
        </button>
      </div>
      
      <article className="prose max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title}</h1>
        
        {imagePreview && (
          <div className="mb-6">
            <img
              src={imagePreview}
              alt="Post preview"
              className="w-full max-h-96 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        
        <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {formData.content}
        </div>
      </article>
    </div>
  );

  if (previewMode) {
    return <PreviewContent />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Create New Post</h2>
          <p className="text-blue-100 mt-1">Share your thoughts with the world</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Post Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter an engaging title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image (Optional)
            </label>
            
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="image-input"
                  accept="image/*"
                  name='image'
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="image-input" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-2">
                    <Upload className="h-12 w-12 text-gray-400" />
                    <span className="text-gray-600">Click to upload image</span>
                    <span className="text-sm text-gray-400">PNG, JPG, JPEG up to 5MB</span>
                  </div>
                </label>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg shadow-md"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Content Textarea */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Post Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your post content here..."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={() => setPreviewMode(true)}
              disabled={!formData.title.trim() || !formData.content.trim()}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Eye size={18} />
              <span>Preview</span>
            </button>
            
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !formData.title.trim() || !formData.content.trim()}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <FileImage size={18} />
                  <span>Publish Post</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;