
export interface Email {
  email: string;
}

export interface AuthUser extends Email {
  auth: string;
}
export interface RegisterUser extends Email {
  password: string;
}
