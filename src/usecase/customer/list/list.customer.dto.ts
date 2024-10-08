// @ts-ignore
import Customer from "../../../domain/customer/entity/customer";

export interface InputListCustomerDto {

}

type Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        zip: string;
        city: string;
    };
};


export interface OutputListCustomerDto {
    customer: Customer[];
}