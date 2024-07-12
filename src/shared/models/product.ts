export class Product {
    constructor(public prodId:number, public prodName: string, public prodDesc: string, public prodBrand: string, public prodPrice: number, public orderQty: number = 1, public isAddedToCart: boolean = false) {

    }
}