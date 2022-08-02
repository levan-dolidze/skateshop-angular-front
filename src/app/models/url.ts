export interface Url {
    id: any;
    url: any;
    urlAfterRedirects: any;
}

export interface ItemArray {
    id: string|number,
    name: string,
    price: number,
    type: string,
    image:string,
    inCart:any,
    key:string


}

export class ProductModel{
    id: string|number;
    name: string;
    price: number;
    type: string;
    image:any;
    inCart:any;
    key:string;
  
}
export class Order{
    name:string;
    surname:string;
    personalNumber:string;
    phoneNumber:string;
    address:string;
    image:string;
    product:ProductModel

}



export enum ProductUrl {
 deck='/deck',
 wheel='/wheel',
 truck='/truck',
 complete='/complete'

}

export enum Products{
    baker='baker',
    element='element',
    spitfire='spitfire',
    independent='independent',
    alien='alien',
    almost='almost',

}

