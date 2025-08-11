
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './DB/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRegisterRoute from './router/userRouter.js'
import userPostCreate from './router/postRouter.js'
import commentRoutes from './router/commentRouter.js'

dotenv.config()




const PORT = process.env.PORT || 3000

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
     origin: ['http://localhost:5173','https://blogwithmee.netlify.app/'], // Frontend URL
    credentials: true
}))
app.get('/', (req,res)=>{
    res.json({message: "server is running"})
})

app.use('/api/user', userRegisterRoute)
app.use('/api/post', userPostCreate)
app.use('/api/comment', commentRoutes);


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`✅ Server running on http://localhost:${PORT}`)
    })
}).catch(err => {
    console.error('❌ Failed to connect to database:', err)
})