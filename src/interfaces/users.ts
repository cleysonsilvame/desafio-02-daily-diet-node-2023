export interface UserDTO {
  id: string;
  
  name: string;
  email: string;
  password_hash: string;

  created_at: string;
}

export interface InsertUserDTO {
  id: string;
  name: string;
  email: string;
  password_hash: string;
}
