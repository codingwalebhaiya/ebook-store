import express from "express"

const userRouter = express.Router(); 


userRouter.post('/register', createUser);


export default userRouter;