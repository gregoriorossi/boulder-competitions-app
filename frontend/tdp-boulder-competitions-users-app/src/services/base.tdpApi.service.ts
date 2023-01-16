import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
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

  protected get<T>(endpoint: string): Promise<T> {
    const url = this.BuildUrl(endpoint);

    return this.httpClient.get(url)
      .toPromise()
      .then((response) => response as T);
  }

  protected post<T>(endpoint: string, body: any): Promise<T> {
    const url = this.BuildUrl(endpoint);

    return this.httpClient.post(url, body)
      .toPromise()
      .then((response) => response as T);
  }

  protected delete<T>(endpoint: string): Promise<T> {
    const url = this.BuildUrl(endpoint);

    return this.httpClient.delete(url)
      .toPromise()
      .then((response) => response as T);
  }
}
