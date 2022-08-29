import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IConfirmationDialogModel } from "../models/dialogs.models";

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  private confirmationMessagesSubject = new Subject<IConfirmationDialogModel>();

  public Confirm = (message: string, confirmFn: () => void, cancelFn: () => void): void => {
    this.confirmationMessagesSubject.next({
      message,
      confirmFn,
      cancelFn
    });
  }

  get confirmationMessages(): Observable<IConfirmationDialogModel> {
    return this.confirmationMessagesSubject.asObservable();
  }
}
