export class Product {
    constructor(public prodName: string, public prodDesc: string, public prodBrand: string, public prodPrice: number, public order_qty: number = 1, public isAddedToCart: boolean = false) {

    }
}