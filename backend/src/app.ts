import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();

// routes
// http methods- GET,PUT,PATCH,POST,DELETE etc.

app.get("/", (req, res, next) => {
  res.json({ message: "Welcome in ebook store" });
});

// global error handler - middleware -
app.use(globalErrorHandler);

export default app;
