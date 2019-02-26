import { Injectable } from '@angular/core';
import { LS_TIME } from '@/app.constants';

@Injectable()
export class LocalStorageService {
    getItem(item: string) {
        return JSON.parse(localStorage.getItem(item) || '')
    }

    getItemWithDate(item: string) {
        let itemLs = localStorage.getItem(item);
        if (!itemLs) {
            return
        }
        let parsedData = JSON.parse(itemLs)
        if (parsedData != null && 
            parsedData.hasOwnProperty('data') &&
            ((Math.abs(new Date().getTime() - Date.parse(parsedData.timestamp))/1000) < LS_TIME)) {
                return parsedData['data']
        } else {
            return null;
        }
    }

    setItem(item: string, data: any) {
        localStorage.setItem(item, data)
    }


    setItemWithDate(item: string, data: any) {
        localStorage.setItem(item, JSON.stringify({data: data, timestamp: new Date()}))
    }
}