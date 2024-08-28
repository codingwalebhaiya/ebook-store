import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const{name, email, password} = req.body;
  
  // validation
  // you can use also an express-validation library for validation purpose
   if(!name || !email || !password) {
    const error = createHttpError(400, 'All fields are required');
     return next(error)
   }
  // process 
  // response 
};


export {createUser}