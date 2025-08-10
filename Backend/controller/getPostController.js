import { Post } from "../model/postSchema.js";
import cloudinary from "../config/cloudinary.js";

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name username profile");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post Fetched", post });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id) return res.status(401).json({ message: "Unauthorized" });

    if (post.image) {
      const publicId = post.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`blog_posts/${publicId}`);
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id) return res.status(401).json({ message: "Unauthorized" });

    post.title = title || post.title;
    post.content = content || post.content;

    if (req.file) {
      if (post.image) {
        const publicId = post.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`blog_posts/${publicId}`);
      }
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "blog_posts" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      post.image = result.secure_url;
    }

    await post.save();
    await post.populate("author", "name username profile");
    res.status(200).json({ message: "Post updated", post });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
