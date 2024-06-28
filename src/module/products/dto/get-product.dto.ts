import { IsOptional } from 'class-validator';
import { PaginationDto } from '../../../shared/shared-dto';

export class GetProductsDTO extends PaginationDto {
  @IsOptional()
  category?: string;

  @IsOptional()
  minPrice?: number;

  @IsOptional()
  maxPrice?: number;
}
