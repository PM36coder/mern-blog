import { Comment } from "../model/commentSchema.js";
import { Post } from "../model/postSchema.js";

const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    if (!text) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({
        text,
        author: req.user.id,
        post : postId
    })
//! push the comment id to the post schema comment array
post.comments.push(comment._id)
await post.save()

//? populate the comment form saved comment
const populatedComment = await comment.populate("author", "name username profile")

res.status(201).json({message : "Comment added", comment : populatedComment})

  } catch (error) {
    res.status(500).json({ message: "Server Side Error" });
  }
};


//* get all the comments

const getAllComments = async (req, res)=>{
    try {
        const {postId} = req.params

        const comments = await Comment.find({post : postId}).populate("author", 'name username profile').sort({createdAt : -1})

         res.status(200).json({ message: "Comments Fetched", comments, counts : comments.length })
    } catch (error) {
        res.status(500).json({message: "Server Side Error", error: error.message})
    }
}


export { addComment ,getAllComments};
