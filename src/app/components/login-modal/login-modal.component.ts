import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../servises/auth.service';
import { UserLogin, UserRegistration } from './../../shared/classes';
import { Component, OnInit } from '@angular/core';
import { AuthfirebaseService } from 'src/app/servises/authfirebase.service';
import { getAuth, sendEmailVerification } from "firebase/auth";

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
  filteredBanks: Array<any> = ["levani", "dolidze"]
 
  constructor(private authServise: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private firebase: AuthfirebaseService

  ) { }

  ngOnInit(): void {

  }


  async signIn(signInForm: any) {
    if (signInForm.invalid) {
      return
    }
    else {
      await this.firebase.signIn(this.userLogin.email, this.userLogin.password)
      if (this.firebase.isLoggedIn) this.authServise.userIsLogedin.next(true)
      this.dialog.closeAll()
      this.authServise.userIsLogedin.next(true);
      window.location.reload();
      this.router.navigate([''])


    }


  };


  userRegistration(registrationForm: any) {
    if (registrationForm.invalid) {
      return
    }
    else {
      this.registrationModal = false;
      this.confirmAuthModal = true;
      this.userSignUp(registrationForm)
    };
  };

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

  async userSignUp(form: any) {
    if (form.invalid) {
      return
    } else {
      this.registrationModal = false;
      this.confirmAuthModal = true;
    }

    await this.firebase.signUp(this.registration.email, this.registration.pass)
    if (this.firebase.isLoggedIn) this.authServise.userIsLogedin.next(true)
    this.verifyEmail();


  }

  verifyEmail() {
    const auth = getAuth();
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeout(() => {
            this.dialog.closeAll()
            this.authServise.userIsLogedin.next(true);
            
            this.router.navigate([''])
          }, 3000);
        });

    }

  }
};
