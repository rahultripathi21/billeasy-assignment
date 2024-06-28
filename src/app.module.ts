import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './module/products/products.module';
import { CustomerModule } from './module/customers/customers.module';
import { ReviewModule } from './module/reviews/reviews.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: 5432,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      ssl: true,
      entities: [__dirname + './module/**/entity/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ReviewModule,
    ProductModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
