import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class SectionService {
    constructor(
        private http: HttpClient
    ) {}


    getSections(moduleId: number, categoryName: string) {
        
    }
}