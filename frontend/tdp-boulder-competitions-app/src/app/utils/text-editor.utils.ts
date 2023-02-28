import { AngularEditorConfig } from "@kolkov/angular-editor";

export class TextEditorUtils {
  public static getDefaultEditorConfig = (values: object): AngularEditorConfig => {
    return {
      editable: true,
      height: 'auto',
      minHeight: '300px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      enableToolbar: true,
      showToolbar: true,
      placeholder: '',
      defaultFontSize: '',
      fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'calibri', name: 'Calibri' },
      ],
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [],
      ...values
    }
  };
}
