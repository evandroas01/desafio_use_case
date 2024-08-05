import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {InputCreateCustomerDto, OutputCreateCustomerDto} from "./create.customer.dto";
import {OutputFindCustomerDto} from "../find/find.customer.dto";
import {v4 as uuid} from "uuid";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

export default class CreateCustomerUsecase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: {
        find: jest.Mock<any, any>;
        findOne: jest.Mock<any, any>;
        create: jest.Mock<any, any>;
        update: jest.Mock<any, any>
    }) {
        this.customerRepository = customerRepository;
    }

    // @ts-ignore
    async execute(input: {
        address: { zip: string; number: number; city: string; street: string };
        name: string
    }): Promise<{ address: { zip: string; number: number; city: string; street: string }; name: string; id: string }>{
        const customer = CustomerFactory.createWithAddress(
            input.name,
            new Address(input.address.street, input.address.number, input.address.zip, input.address.city));
        await this.customerRepository.create(customer)

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
            },
        }
    }
}