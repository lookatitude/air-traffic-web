import {AbstractControl} from '@angular/forms';

export function urlValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== ''
    && !control.value.match(/(https?:\/\/(?:www\.|(!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,})/)
    && !control.value.match(/^market:\/\/details\?id=[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/)) {
    return {url: true};
  }

  return null;
}
