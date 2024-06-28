import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { CustomerRepository } from './customers.repository';
import { GlobalResponse } from 'src/shared/response-message';
import { GetCustomersDTO } from './dto/get-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async addCustomer(customerDto: CreateCustomerDTO): Promise<GlobalResponse> {
    try {
      await this.customerRepository.createCustomer(customerDto);

      return { success: true, message: 'Customer added successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  async getAllCustomers(filter: GetCustomersDTO): Promise<GlobalResponse> {
    try {
      const { page, limit } = filter;
      const query = {
        select: {
          password: false,
        },
        skip: (page - 1) * limit,
        limit,
      };
      const customers = await this.customerRepository.findAll(query);

      return {
        success: true,
        message: 'Fetched all data successfully',
        data: customers,
      }; //TODO: Create Response Handler
    } catch (error) {
      console.log(error);
    }
  }

  async getCustomerById(customerId): Promise<GlobalResponse> {
    try {
      const customer = await this.customerRepository.findOne({
        id: customerId,
      });
      if (!customer) throw new NotFoundException('Customer Not Found');

      return {
        success: true,
        message: 'Fetched data successfully',
        data: customer,
      };
    } catch (error) {
      // TODO: create error handler
      console.log(error);
    }
  }

  async updateCustomer(customerId, dataToUpdate): Promise<GlobalResponse> {
    try {
      const customer = this.customerRepository.findOne({ id: customerId });
      if (!customer) throw new NotFoundException('Customer Not Found');

      await this.customerRepository.update({ id: customerId }, dataToUpdate);
      return { success: true, message: 'Customer deleted successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCustomer(customerId): Promise<GlobalResponse> {
    try {
      await this.customerRepository.delete({ id: customerId });
      return { success: true, message: 'Customer deleted successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
