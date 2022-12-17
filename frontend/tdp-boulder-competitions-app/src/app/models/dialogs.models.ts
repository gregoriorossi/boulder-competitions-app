export interface IConfirmationDialogModel {
  message: string;
  body: string;
  confirmButtonText: string;
  cancelButtonText: string;
  confirmFn: () => void;
  cancelFn: () => void;
}
