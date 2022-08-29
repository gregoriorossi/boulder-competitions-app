export interface IConfirmationDialogModel {
  message: string;
  confirmFn: () => void;
  cancelFn: () => void;
}
