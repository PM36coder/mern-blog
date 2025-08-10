import multer from "multer"

const storage = multer.memoryStorage() //! it comes in buffer

export const upload = multer({
    storage,
    limits :{fileSize : 5 * 1024 * 1024},
 fileFilter : (req, file , cb)=>{
        const allowed = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
        if(!allowed.includes(file.mimetype)){
            return cb(new Error("Invalid file type"))
        }
        cb(null,true)
 }
})