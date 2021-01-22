import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    const syntaxErrorMessage = /Uncaught SyntaxError: Unexpected token [\d]/;

    if (
      chunkFailedMessage.test(error.message) ||
      syntaxErrorMessage.test(error.message)
    ) {
      window.location.reload();
    } else {
      super.handleError(error);
    }
  }
}
