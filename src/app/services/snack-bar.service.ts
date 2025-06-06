import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  open(message: string, type: string) {
    let className = ['custom-snackbar'];

    switch(type) {
      case "success":
        className.push('snackbar-success');
        break;

      case "error":
        className.push('snackbar-error');
        break;

      default:
        break;
    }

    this.snackBar.open(message, 'OK', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: className
    })
  }
}
