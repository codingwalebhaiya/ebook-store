import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "./userModel";
import bcrypt from "bcrypt"

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // validation
  // you can use also an express-validation library for validation purpose for better validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  // database call- user exist or not .
  const user = await User.findOne({ email });
  if (user) {
    const error = createHttpError(401, "User already exists with this email");
    return next(error);
  }

  // when create a user in database then first of all hashed the password via bcrypt library 

  const hashedPassword = bcrypt.hashSync(password,10);
  









  // process
  // response
};

export { createUser };
  