import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUsecase from "./find.customer.usecase";

describe("Test find customer use case", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize  = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });
        await sequelize.addModels([CustomerModel])
        await sequelize.sync();
    })
    afterEach(async () => {
        await sequelize.close();
    });

    it("Should find a customer", async () => {

        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUsecase(customerRepository);

        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "Zip", "city")
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                city: "city",
                number: 123,
                zip: "Zip",
            }
        }
        const result = await usecase.execute(input);

        expect(result).toEqual(output)

    })

});