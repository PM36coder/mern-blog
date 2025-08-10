import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../utils/Axios";
import {  Eye, X } from "lucide-react";
import { toast } from "react-toastify";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch post data on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/post/${id}`);
        const data = res.data.post;
        setFormData({ title: data.title, content: data.content });
        setImagePreview(data.image);
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("Failed to load post data");
        navigate("/dashboard");
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    document.getElementById("image-input").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Title and Content are required");
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("content", formData.content);
      if (image) submitData.append("image", image);

      const res = await API.put(`/post/edit/${id}`, submitData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
 const data = res.data
      toast.success(data.message)
      navigate(`/post/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="Edit your title"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium">Image (optional)</label>
          {!imagePreview ? (
            <div className="border-2 border-dashed p-4 rounded-md text-center">
              <input
                type="file"
                id="image-input"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="image-input" className="cursor-pointer text-blue-500">
                Upload Image
              </label>
            </div>
          ) : (
            <div className="relative">
              <img src={imagePreview} alt="preview" className="w-full rounded-md max-h-64 object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block mb-2 text-sm font-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-vertical"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setPreviewMode(true)}
            className="flex items-center gap-2 bg-gray-100 text-gray-800 px-6 py-2 rounded hover:bg-gray-200"
          >
            <Eye size={18} />
            Preview
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </div>
      </form>

      {/* Preview */}
      {previewMode && (
        <div className="mt-10 bg-white rounded shadow p-6">
          <h2 className="text-2xl font-bold mb-4">{formData.title}</h2>
          {imagePreview && <img src={imagePreview} alt="preview" className="w-full mb-4 rounded" />}
          <div className="text-gray-800 whitespace-pre-wrap">{formData.content}</div>
          <button
            onClick={() => setPreviewMode(false)}
            className="mt-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Back to Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditPost;
