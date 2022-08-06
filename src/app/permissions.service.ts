import { Injectable } from '@angular/core';
import { AdminPermission } from './shared/classes';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  adminPermission: AdminPermission = new AdminPermission();

  constructor() { }

//ამოწმებს იუზერი არის თუ არა დალოგინებული და არის თუ არა ეს იუზერი ადმინი
  userAuth():any {
    let authObj = {
      admin: false,
      isLoggedIn: false,
      userEmail:null
    }
    let tokenInfo = localStorage.getItem('user');
    if (tokenInfo) {
      let parsedToken = JSON.parse(tokenInfo);
      if (parsedToken.emailVerified) {
        let admin = this.adminPermission.adminPermission(parsedToken.email)
        if (admin)
          return authObj = {
            admin: true,
            isLoggedIn: true,
            userEmail:parsedToken.email
          }
        else {
          return authObj = {
            admin: false,
            isLoggedIn: true,
            userEmail:parsedToken.email
          }
        }
      }
      return
    };
    return authObj
  };
};
