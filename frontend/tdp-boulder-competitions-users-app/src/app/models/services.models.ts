export interface IResponse {
  Status: StatusTypes;
  Error?: number;
  Message?: string;
}

export enum StatusTypes {
  OK,
  ERROR
}
