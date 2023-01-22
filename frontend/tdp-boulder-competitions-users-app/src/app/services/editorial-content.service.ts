import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EditorialContentService {
  public GetUsefulInformation = async (): Promise<string> => {
    const text: string = "<p>Se hai dubbi o riscontri problemi contattaci a <a href=\"mailto: info@testedipietra.it\">info@testedipietra.it</a></p>";

    return Promise.resolve(text);
  }
}
