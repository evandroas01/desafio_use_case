export interface InputCreateProductDto {
    productName: string;
    price: number;
}

export interface OutputCreateProductDto {
    id: string;
    name: string;
    price: number;
}