import api from "./axios";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export const login = async (data: LoginInput) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const register = async (data: RegisterInput) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const me = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
