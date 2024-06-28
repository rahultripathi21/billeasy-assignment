import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Customer } from 'src/module/customers/entity/customers.entity';
import { Product } from 'src/module/products/entity/products.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product)
  @Column({ nullable: false })
  productId: number;

  @OneToOne(() => Customer)
  @Column({ nullable: false })
  customerId: number;

  @Column()
  rating: number;

  @Column()
  comments: string;
}
