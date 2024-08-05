import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import UpdateProductUseCase from "./update.product.usecase";

describe("Unit teste for product update use case", () => {
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

    it("Should update a product", async () => {
        const product = new Product("123", "Product1", 30);
        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const input = {
            id:product.id,
            name: "Product Updated",
            price: 60,
        }

        const productUpdateUseCase = new UpdateProductUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);
        expect(output).toEqual(input)



    });
});