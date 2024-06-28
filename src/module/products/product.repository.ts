import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entity/products.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(productData) {
    return await this.productRepository.save(productData);
  }

  async findOne(query): Promise<Product> {
    return this.productRepository.findOne(query);
  }

  async findAll(query) {
    return this.productRepository.find(query);
  }

  async update(query, dataToUpdate) {
    return this.productRepository.update(query, dataToUpdate);
  }

  async delete(query) {
    return this.productRepository.delete(query);
  }
}
