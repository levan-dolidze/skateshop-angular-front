import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AdminPermission } from '../shared/classes';

@Injectable({
  providedIn: 'root'
})


export class AdminGuardGuard implements CanActivate {
  adminPermission: AdminPermission = new AdminPermission();
  canActivate(): boolean {
    let email;
    let tokenInfo = localStorage.getItem('user');
    if (tokenInfo) {
      let parsedToken = JSON.parse(tokenInfo);
      if (parsedToken.emailVerified) {
        email = parsedToken.email;
      };
    }
    return this.adminPermission.adminPermission(email);
  };
};
