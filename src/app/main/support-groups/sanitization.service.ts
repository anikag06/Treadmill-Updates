import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SanitizationService {

  constructor() { }

  sanitizeHtml(unsantizedHtml: string) {
    const MAIN_REGEX = /<\/?(?!(?:b|p|ul|li|ol|strike|u|a|i)\b)[a-z](?:[^>"']|"[^"]*"|'[^']*')*>/gi;
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    let htmlString =  unsantizedHtml.replace(MAIN_REGEX, '');
    htmlString = htmlString.replace(SCRIPT_REGEX, '');
    htmlString = htmlString.replace(/src\=/g, '');
    htmlString = htmlString.replace(/url\(/g, '');
    return htmlString;
  }
}
