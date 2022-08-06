import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }


  languageControl(lang:any,translate:any) {
    lang = localStorage.getItem('lang');
    lang== 'en' ? translate.setDefaultLang('en') : translate.setDefaultLang('ka');
  };


  
};


