import { Module } from '@nestjs/common';
import { CustomerController } from './customers.controller';
import { CustomerService } from './customers.service';
import { CustomerRepository } from './customers.repository';
import { Customer } from './entity/customers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerRepository, CustomerService],
})
export class CustomerModule {}
