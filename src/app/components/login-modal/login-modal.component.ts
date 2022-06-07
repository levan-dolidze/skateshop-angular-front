import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../servises/auth.service';
import { UserLogin, UserRegistration } from './../../shared/classes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {


  userLogin: UserLogin = new UserLogin();
  registration: UserRegistration = new UserRegistration();
  emailConfirmCode: string;


  authorizationModal: boolean = true;
  registrationModal: boolean;
  confirmAuthModal: boolean;
  Emailconfirmed: boolean;


  constructor(private authServise: AuthService, public dialog: MatDialog,private router:Router) { }

  ngOnInit(): void {

  }


  signIn(signInForm: any) {
    if (signInForm.invalid) {
      return
    }
  };



  userRegistration(registrationForm: any) {
    console.log(registrationForm)
    if (registrationForm.invalid) {
      return
    }
    else {
      this.registrationModal = false;
      this.confirmAuthModal = true;

    };

  }

  confirmAuth(confirmForm: any) {
    if (confirmForm.invalid) {
      return
    } else {
      this.confirmAuthModal = false;
      this.Emailconfirmed = true;
      setTimeout(() => {
        this.dialog.closeAll()
        this.authServise.userIsLogedin.next(true);
        this.router.navigate([''])
      
      }, 3000);
    }

  }


};
