import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(public snackBarRef: MatSnackBar) {
  }

  info(message, action?) {
    this.snackBarRef.open(message, action, {
      duration: 3000,
      panelClass: [
        'indigo-snackBar',
      ],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
