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

export class Order{
    name:string;
    surname:string;
    personalNumber:string;
    phoneNumber:string;
    address:string;

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
