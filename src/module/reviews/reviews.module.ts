import { Module } from '@nestjs/common';
import { Review } from './entity/reviews.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [],
  providers: [],
})
export class ReviewModule {}
