import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import {InputListProductDto, OutputListProductDto} from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepository;
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(input: InputListProductDto ): Promise<OutputListProductDto> {
        const product = await this.productRepository.findAll();
        // @ts-ignore
        return OutputMapper.toOutput(product)
    }
}

// tslint:disable-next-line:max-classes-per-file
class OutputMapper {
    static toOutput(product: Product[]): OutputListProductDto{
        // @ts-ignore
        return {
            product: product.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        }
    }
}