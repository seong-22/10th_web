export type RequestUser = {
  name: string;
  email: string;
  password: string;
  bio?: string; //와도 안와도 상관없다 = ?
  avatar?: string;
};
