import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface IResponse {
  Status: StatusTypes;
  Error?: number;
  Message?: string;
}

export enum StatusTypes {
  OK,
  ERROR
}
