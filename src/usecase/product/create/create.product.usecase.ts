import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import {InputCreateProductDto, OutputCreateProductDto} from "./create.product.dto";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ProductFactory from "../../../domain/product/factory/product.factory";

export default class CreateProductUseCase {
    private productRepository: ProductRepository;
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(input: {
        name: string;
        price: number;
    }):  Promise<{ name: string; id: string, price: number }>{
        const product = ProductFactory.create("a", input.name, input.price);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}