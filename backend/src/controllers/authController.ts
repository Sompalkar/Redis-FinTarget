import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AppError } from '../utils/errorHandler';

export const register = async (req: Request, res: Response, next: NextFunction) => {

  console.log(req.body);
  try { 

    const { username, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // return next(new AppError('Username already exists', 409));
      throw new AppError('Username already exists', 401);
    }



    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(new AppError('Registration failed', 400));
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Invalid credentials', 401);
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};