export interface IResponse<T> {
  data: IResponseData<T>;
  status: number;
  headers: Headers;
}

export interface IResponseData<T> {
  data: T;
  result: string;
  message: string;
}
