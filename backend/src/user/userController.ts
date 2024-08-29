import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // validation
  // you can use also an express-validation library for validation purpose for better validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  // database call- user exist or not .

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(401, "User already exists with this email");
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting user"));
  }

  // when create a user in database then first of all hashed the password via bcrypt library

  const hashedPassword = bcrypt.hashSync(password, 10);
  let newUser: User;
  try {
    // create new user in database
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating user"));
  }

  try {
    // token generated using jwt
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    res.json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(501, "Error while signing the jwt token"));
  }
};

export { createUser };
