import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test create product use case", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize  = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });
        await sequelize.addModels([ProductModel])
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        const productRepository = new ProductRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const product = new Product("123", "Product", 30);
        const output = await productCreateUseCase.execute(product)

        expect(output).toEqual(  {
            id: expect.any(String),
            name: product.name,
            price: product.price,
        });
    });
});