import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ErrorDialogComponent} from '@/shared/error-dialog/error-dialog.component';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralErrorService {
  constructor(private dialog: MatDialog) {}

  /**
   * Open Error Dialog
   */
  openErrorDialog(errorStr: string) {
    this.dialog.open(ErrorDialogComponent, {
      width: '350px',
      data: errorStr,
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

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, `);
      console.log(error.message);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}
