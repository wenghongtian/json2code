declare namespace API {
  export interface BaseResponse<T = void> {
    code: string;
    msg: string;
    data: T;
  }
  export interface BaseListResponse<T = any> {
    code: string;
    msg: string;
    data: {
      records: T[];
      total: number;
      pageNum: number;
      pageSize: number;
    };
  }
}
