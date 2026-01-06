export type User = {
  id: string;
  fullName: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterResponse = User;

export type LoginResponse = string;

export type MeResponse = User;
