import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { EmptyBaseAddressError } from "../errors/empty-base-address.error";
import { StringUtils } from "../utils/string.utils";

export class BaseTdpApiService {

  private baseAddress: string = environment.tdpBaseApieUrl;

  constructor(protected httpClient: HttpClient) {
    if (StringUtils.IsNullOrEmpty(this.baseAddress)) {
      throw new EmptyBaseAddressError("TDP API");
    }
  }

  private BuildUrl = (endpoint: string) => {
    return this.baseAddress + endpoint;
  }

  protected Get<T>(endpoint: string): Promise<T> {
    const url = this.BuildUrl(endpoint);

    return this.httpClient.get(url)
      .toPromise()
      .then((response) => response as T);
  }
}
