
export interface Email {
  email: string;
}

export interface AuthUser extends Email {
  key: string;
}
export interface RegisterUser extends Email {
  password: string;
}

export interface AuthSNSOption {
  email: string;
  snsType: string;
  acToken?: string;
  refToken?: string;
}