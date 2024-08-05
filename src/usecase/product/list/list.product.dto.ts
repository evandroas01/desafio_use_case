// @ts-ignore
import Product from "../../../domain/product/entity/product";
// tslint:disable-next-line:no-empty-interface
export interface InputListProductDto {}

type Product = {
    id: string;
    name: string;
    price: number;
}

export interface OutputListProductDto {
    product: Product[];
}