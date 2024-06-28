import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customers.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { GetCustomersDTO } from './dto/get-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async addCustomer(@Body() createCustomerDto: CreateCustomerDTO) {
    await this.customerService.addCustomer(createCustomerDto);
  }

  @Get()
  async getCustomers(@Query() filter: GetCustomersDTO) {
    await this.customerService.getAllCustomers(filter);
  }

  @Get(':id')
  async getCustomer(@Param('id') customerId: number) {
    await this.customerService.getCustomerById(customerId);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id') customerId: number,
    @Body() createCustomerDto: CreateCustomerDTO,
  ) {
    await this.customerService.updateCustomer(customerId, createCustomerDto);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') customerId: number) {
    await this.customerService.deleteCustomer(customerId);
  }
}
