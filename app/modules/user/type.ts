export type User = {
  id: string;
  fullName: string;
  email: string;
  username: string;
  role: "USER" | "ORGANIZER";
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterResponse = User;

export type LoginResponse = {
  token: string;
  user: User;
};

export type MeResponse = User;
