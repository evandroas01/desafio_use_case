import CreateProductUseCase from "./create.product.usecase";

const input = {
    id: "123",
    name: 'Product1',
    price: 50
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit test create product use case", () => {
    it('should create a product', async () => {
        const productRepository = MockRepository();
        // @ts-ignore
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input)

        expect(output).toEqual(  {
            id: expect.any(String),
            name: input.name,
            price: input.price,
        })
    });

    it('should thrown an erro s when name is missing', async () => {
        const productRepository = MockRepository();
        // @ts-ignore
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "";

       await expect(productCreateUseCase.execute(input)).rejects.toThrowError("Name is required");
    });

    it('should thrown an error when price is greater than zero', async () => {
        const productRepository = MockRepository();
        // @ts-ignore
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.price = -10;

        await expect(productCreateUseCase.execute(input)).rejects.toThrowError("Name is required");
    });
})