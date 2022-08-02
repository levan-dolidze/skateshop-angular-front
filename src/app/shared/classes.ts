export class UserLogin {
    email: string;
    password: string;
}

export class UserRegistration {
    username: string;
    surename: string;
    email: string;
    birthDay: Date;
    pass:any;
}


export enum Admin{
    admin='l.dolidze11@gmail.com'
}


export class AdminPermission{
  public  adminPermission(email: any):boolean {
        if(email !== Admin.admin){
         return false 
        }else{
          return true
        }
      };
}
