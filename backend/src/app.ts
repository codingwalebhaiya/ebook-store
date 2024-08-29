import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";

const app = express(); 


//Returns middleware that only parses json and only looks at requests 
//where the Content-Type header matches the type option.
app.use(express.json())

// routes
// http methods- GET,PUT,PATCH,POST,DELETE etc.

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome in ebook store" });
});

// user router 
app.use("/api/users", userRouter)
app.use("/api/books", bookRouter)

// global error handler - middleware -
app.use(globalErrorHandler);

export default app; 
