export interface IResponse {
  Status: StatusTypes;
  Error?: number;
  Message?: string;
}

export enum StatusTypes {
  OK = "OK",
  ERROR = "ERROR",
  ERR_USER_ALREADY_REGISTERED = "ERR_USER_ALREADY_REGISTERED"
}
