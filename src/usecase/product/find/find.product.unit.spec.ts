import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product1", 50);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test find product use case", () => {
    it("Should find a product", async () => {
        const productRepository = MockRepository();
        // @ts-ignore
        const usecase = new FindProductUseCase(productRepository)

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "Product1",
            price: 50
        }

        const result = await usecase.execute(input)
        expect(result).toEqual(output)
    })
    it('should not find a product', () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        })
        // @ts-ignore
        const usecase = new FindProductUseCase(productRepository)

        const input = {
            id: "123",
        };

        expect(() =>{
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});