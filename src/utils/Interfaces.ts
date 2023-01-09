export interface IResponse<A> {
  data: A | null,
  error?: any;
  message: string;
  success: boolean;
}