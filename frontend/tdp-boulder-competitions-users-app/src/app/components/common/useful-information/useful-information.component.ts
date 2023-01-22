import { Component, OnInit } from "@angular/core";
import { EditorialContentService } from "../../../services/editorial-content.service";

@Component({
  selector: 'app-useful-information',
  templateUrl: './useful-information.component.html',
  styleUrls: ['./useful-information.component.scss']
})
export class UsefulInformationComponent implements OnInit {

  Text: string = "";
  ContentReady: boolean = false;

  constructor(private editorialContentService: EditorialContentService)
  { }

  async ngOnInit(): Promise<void> {
    this.Text = await this.editorialContentService.GetUsefulInformation();
    this.ContentReady = true;
  }
}
