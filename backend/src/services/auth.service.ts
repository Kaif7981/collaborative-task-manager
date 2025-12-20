import bcrypt from "bcrypt";
import prisma from "../prisma";
import jwt from "jsonwebtoken";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new Error("Account already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

export const login = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "7d" }
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
};
