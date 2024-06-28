import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './entity/customers.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(customerData) {
    return await this.customerRepository.save(customerData);
  }

  async findOne(query): Promise<Customer> {
    return this.customerRepository.findOne(query);
  }

  async findAll(query): Promise<Customer[]> {
    return this.customerRepository.find(query);
  }

  async update(query, dataToUpdate) {
    return this.customerRepository.update(query, dataToUpdate);
  }

  async delete(query) {
    return this.customerRepository.delete(query);
  }
}
