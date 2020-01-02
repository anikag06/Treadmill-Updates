import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SanitizationService {
  constructor() {}

  sanitizeHtml(unsanitizedHtml: string) {
    const MAIN_REGEX = /<\/?(?!(?:b|p|ul|li|ol|strike|u|a|i)\b)[a-z](?:[^>"']|"[^"]*"|'[^']*')*>/gi;
    const HREF_REGEX = /href="javascript:[^"]+"/gi;
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    let htmlString = unsanitizedHtml.replace(MAIN_REGEX, '');
    htmlString = htmlString.replace(SCRIPT_REGEX, '');
    htmlString = htmlString.replace(HREF_REGEX, '');
    htmlString = htmlString.replace(/style="[^"]*"/g, '');
    htmlString = htmlString.replace(/src="[^"]*"/g, '');
    htmlString = htmlString.replace(/url\(/g, '');
    return htmlString;
  }

  stripTags(str: string) {
    return str
      .replace(/<(?:.|\n)*?>/gm, ' ')
      .replace(/\&nbsp\;/gi, '')
      .trim();
  }

  // in the contentEditable div space and enter and other HTMl characters are added,
  // so use this function to remove extra charaters
  changeExtraCharacters(event: any) {
    const changedText = (<Element>event.target).innerHTML
      .replace(/&nbsp;/gi, '')
      .replace(/<div><br><\/div>/gi, ' ')
      .replace(/<br>/gi, ' ')
      .replace(/&amp;/gi, '')
      .replace(/&lt;/gi, '')
      .replace(/&gt;/gi, '')
      .replace(/<div>/gi, ' ')
      .replace(/<\/div>/gi, ' ');
    return changedText;
  }
}
