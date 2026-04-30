import type { CommonResponse } from "./common";

//회원가입 관련 정보
export type RequestSignupDto = {
  name: string;
  email: string;
  password: string;
  bio?: string; //와도 안와도 상관없다 = ?
  avatar?: string;
};
export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

//로그인 관련 정보
export type RequestSigninDto = {
  email: string;
  password: string;
};
export type ResponseSigninDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

//내 정보 조회 관련 정보
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;
