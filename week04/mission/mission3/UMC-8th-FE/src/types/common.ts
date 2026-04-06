export type CommonResponse<T> = {
  status: boolean;
  message: string;
  data: T;
  statusCode: number;
};
