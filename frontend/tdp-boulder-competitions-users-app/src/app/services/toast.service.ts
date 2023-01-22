import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }


  showStandard(text: string) {
    this.show(text);
  }

  showSuccess(text: string) {
    this.show(text, { classname: 'bg-success text-light', delay: 5000 });
  }

  showDanger(text: string) {
    this.show(text, { classname: 'bg-danger text-light', delay: 5000 });
  }
}
