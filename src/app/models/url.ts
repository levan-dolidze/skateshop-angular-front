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
    image:string

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
    alien='alien complete',
    almost='almost complete',

}

