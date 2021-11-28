
export interface Email {
  email: string;
}

export interface AuthUser extends Email {
  key: string;
}
export interface RegisterUser extends Email {
  password: string;
}
