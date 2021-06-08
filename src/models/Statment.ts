import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Customer } from "./Customer";
import { DefaultEntity } from "./DefaultEntity";

@Entity('statment')
class Statment extends DefaultEntity {
    @Column()
    description: string;
  
    @Column()
    type: string;
  
    @Column()
    amount: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @Column()
    customer_id: string;
  
    @ManyToOne(() => Customer)
    @JoinColumn({ name: "customer_id" })
    customer: Customer;
  }
  
  export { Statment }