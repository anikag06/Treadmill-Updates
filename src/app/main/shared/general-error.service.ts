import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '@/shared/error-dialog/error-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralErrorService {

  constructor(
    private dialog: MatDialog
  ) { }

  /**
   * Open Error Dialog
   */
  openErrorDialog(errorStr: string) {
    this.dialog.open(ErrorDialogComponent, {
      width: '350px',
      data: errorStr
    });
  }

  /**
   * Closure to ease error handling
   * @param errorString
   */
  errorResponse(errorString: string) {
    return (error: HttpErrorResponse) => {
      this.openErrorDialog(error.statusText + ' ' + errorString);
    };
  }
}
