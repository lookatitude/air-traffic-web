import {Injectable} from '@angular/core';
import {BodyOutputType, Toast, ToasterConfig, ToasterService} from 'angular2-toaster';

@Injectable()
export class DefaultToasterService {
  public toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: false,
    animation: 'fade',
    limit: 5,
  });

  constructor(private toasterService: ToasterService) {
  }

  public default(title: string, body: string): void {
    this.show('default', title, body)
  }

  public info(title: string, body: string): void {
    this.show('info', title, body)
  }

  public success(title: string, body: string): void {
    this.show('success', title, body)
  }

  public warning(title: string, body: string): void {
    this.show('warning', title, body)
  }

  public error(title: string, body: string): void {
    this.errorWithReason(title, null, body);
  }

  public errorWithReason(title: string, reason: any, defaultBody: string): void {
    this.show('error', title, (reason != null && reason.error != null && reason.error !== '' ? reason.error : defaultBody))
  }

  public show(type: string, title: string, body: string): void {
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      showCloseButton: false,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };

    this.toasterService.popAsync(toast);
  }
}
