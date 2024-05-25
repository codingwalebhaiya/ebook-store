import express from "express"

const app = express()

// routes
// http methods- GET,PUT,PATCH,POST,DELETE etc.

app.get('/', (req,res,next) => {
 res.json({
    "message": "Welcome To Ebook Store"
 })
 
})


export default app ;

