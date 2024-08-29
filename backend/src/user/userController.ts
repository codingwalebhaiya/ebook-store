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

    res
      .status(201)
      .json({ accessToken: token, message: "user created successfully!" });
  } catch (error) {
    return next(createHttpError(501, "Error while signing the jwt token"));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = createHttpError(
      400,
      "Validation Error: Both email and password are required."
    );
    return next(error);
  }

  let user;
  try {
    user = await userModel.findOne({ email });

    if (!user) {
      return next(
        createHttpError(
          404,
          "Authentication Error: No account found with this email address."
        )
      );
    }
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Internal Server Error: Unable to retrieve user. Please try again later."
      )
    );
  }

  // compare between  user-input-password with database-stored-password
  try {
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return next(
        createHttpError(
          401,
          "Authentication Error: Incorrect password. Please try again."
        )
      );
    }
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Internal Server Error: Password verification failed. Please try again later."
      )
    );
  }

  // if user-input-password matched with database-stored-password then create new access-token via jwt
  try {
    const token = sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    res
      .status(200)
      .json({
        accessToken: token,
        message: "Success: User logged in successfully.",
      });
  } catch (error) {
    return next(
      createHttpError(
        500,
        "Internal Server Error: Failed to generate access token. Please try again later."
      )
    ); 
  }
};

export { createUser, loginUser };
 