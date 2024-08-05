import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product1", 50);
const product2 = ProductFactory.create("b", "Product2", 30);

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        find: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test for listing product use case", () => {
    it('should list a product', async () => {
        const repository = MockRepository();
        const useCase = new ListProductUseCase(repository);
        const output = await useCase.execute({});

        expect(output.product.length).toBe(2);
        expect(output.product[0].id).toBe(product1.id);
        expect(output.product[0].name).toBe(product1.name);
        expect(output.product[0].price).toBe(product1.price);
        expect(output.product[1].id).toBe(product2.id);
        expect(output.product[1].name).toBe(product2.name);
        expect(output.product[1].price).toBe(product2.price);
    });
})