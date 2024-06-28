import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { OrderStatus } from '../enum/order-status';
import { Customer } from 'src/module/customers/entity/customers.entity';
import { Product } from 'src/module/products/entity/products.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product)
  @Column({ nullable: false })
  productId: number;

  @OneToOne(() => Customer)
  @Column({ nullable: false })
  customerId: number;

  @Column()
  quantity: number;

  @Column({ default: new Date() })
  orderData: Date;

  @Column({ default: OrderStatus.Pending })
  staus: OrderStatus;
}
