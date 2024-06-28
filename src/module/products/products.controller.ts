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
import { ProductService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { GetProductsDTO } from './dto/get-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProduct(@Body() createProductDto: CreateProductDTO) {
    await this.productService.addProduct(createProductDto);
  }

  @Get()
  async getProducts(@Query() filter: GetProductsDTO) {
    await this.productService.getAllProducts(filter);
  }

  @Get(':/id')
  async getProduct(@Param('id') productId: number) {
    await this.productService.getProductById(productId);
  }

  @Put(':/id')
  async updateProduct(
    @Param('id') productId: number,
    @Body() createProductDto: UpdateProductDTO,
  ) {
    await this.productService.updateProduct(productId, createProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    await this.productService.deleteProduct(id);
  }
}
