import { Post } from "../model/postSchema.js";
import cloudinary from "../config/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: "Title & content are required" });
    }
const alreadyExists = await Post.findOne({title : title , content:content, image : req.file ? req.file.path : ""})
if(alreadyExists){
    return res.status(400).json({message : "Post already exists"})
}
    let imageUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "blog_posts" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      imageUrl = result.secure_url;
    }

    
    const newPost = await Post.create({ title, content, image: imageUrl, author });
    await newPost.populate("author", "name username profile");

    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name username profile")
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "All posts fetched", posts });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const searchPost = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query required" });

    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    }).populate("author", "name username profile");

    res.status(200).json({ message: "Search successful", posts });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ message: "My posts fetched", posts });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
