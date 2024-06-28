import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';
import { GetProductsDTO } from './dto/get-product.dto';
import { Between } from 'typeorm';
import { GlobalResponse } from 'src/shared/response-message';
import { UpdateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async addProduct(productDto: CreateProductDTO): Promise<GlobalResponse> {
    try {
      await this.productRepository.createProduct(productDto);
      return { success: true, message: 'Product successfully created' };
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts(filter: GetProductsDTO): Promise<GlobalResponse> {
    try {
      const { page, limit, category, minPrice, maxPrice } = filter;
      const query = {
        where: {
          category,
        },
        price: Between(minPrice, maxPrice),
        skip: (page - 1) * limit,
        limit,
      };
      const products = await this.productRepository.findAll(query);

      return {
        success: true,
        message: 'Fetched all data successfully',
        data: products,
      }; //TODO: Create Response Handler
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(productId: number): Promise<GlobalResponse> {
    try {
      const product = await this.productRepository.findOne({ id: productId });
      if (!product) throw new NotFoundException('Product Not Found');
      // TODO: reviw table yet to add, once added will pull data along
      return {
        success: true,
        message: 'Fetched data successfully',
        data: product,
      };
    } catch (error) {
      // TODO: create error handler
      console.log(error);
    }
  }

  async updateProduct(
    productId: number,
    dataToUpdate: UpdateProductDTO,
  ): Promise<GlobalResponse> {
    try {
      const product = this.productRepository.findOne({ id: productId });
      if (!product) throw new NotFoundException('Product Not Found');

      await this.productRepository.update({ id: productId }, dataToUpdate);
      return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(productId): Promise<GlobalResponse> {
    try {
      await this.productRepository.delete({ id: productId });
      return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
