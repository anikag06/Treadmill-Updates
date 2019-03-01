import { Injectable } from '@angular/core';
import { LS_TIME } from '@/app.constants';
import slugify from 'slugify';

@Injectable()
export class LocalStorageService {
    getItem(item: string) {
        item = this.slugifyLower(item);
        return JSON.parse(localStorage.getItem(item) || '')
    }

    getItemWithDate(item: string) {
        item = this.slugifyLower(item);
        let itemLs = localStorage.getItem(item);
        if (!itemLs) {
            return;
        }
        let parsedData = JSON.parse(itemLs)
        if (parsedData != null && 
            parsedData.hasOwnProperty('data') &&
            ((Math.abs(new Date().getTime() - Date.parse(parsedData.timestamp))/1000) < LS_TIME)) {
                return parsedData['data'];
        } else {
            localStorage.removeItem(item);
            return null;
        }
    }

    setItem(item: string, data: any) {
        item = this.slugifyLower(item);
        localStorage.setItem(item, data);
    }


    setItemWithDate(item: string, data: any) {
        item = this.slugifyLower(item);
        localStorage.setItem(item, JSON.stringify({data: data, timestamp: new Date()}));
    }

    private slugifyLower(item: string): string {
        return slugify(item, {lower: true});
    }
}