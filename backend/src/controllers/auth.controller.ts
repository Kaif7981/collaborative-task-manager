import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await AuthService.register(
      req.body.email,
      req.body.password,
      req.body.name
    );
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.login(
      req.body.email,
      req.body.password
    );
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};
