import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

/**
 * REGISTER CONTROLLER
 * Creates a new user
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const user = await AuthService.register(
      name,
      email,
      password
    );

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || "Registration failed",
    });
  }
};

/**
 * LOGIN CONTROLLER
 * Authenticates existing user
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await AuthService.login(
      email,
      password
    );

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err: any) {
    res.status(401).json({
      message: err.message || "Invalid credentials",
    });
  }
};
