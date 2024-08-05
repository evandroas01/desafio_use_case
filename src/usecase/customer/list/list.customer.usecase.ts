import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {InputListCustomerDto, OutputListCustomerDto} from "./list.customer.dto";
import Customer from "../../../domain/customer/entity/customer";

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    // @ts-ignore
    async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll();
        return OutputMapper.toOutput(customers)
    }
}

// tslint:disable-next-line:max-classes-per-file
class OutputMapper {
    static toOutput(customer: Customer[]): OutputListCustomerDto{
        return {
            // tslint:disable-next-line:no-shadowed-variable
            customer: customer.map((customer) => ({
                id: customer.id,
                name: customer.name,
                address: {
                    street: customer.Address.street,
                    number: customer.Address.number,
                    zip: customer.Address.zip,
                    city: customer.Address.city,
                }
            })),
        }
    }
}