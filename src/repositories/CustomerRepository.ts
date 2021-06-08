import { EntityRepository, Repository } from "typeorm";
import { Customer } from "../models/Customer";

@EntityRepository(Customer)
class CustomerRepository extends Repository<Customer> {
    async customerExists(cpf: string): Promise<boolean> {
      const customer = await this.findOne({cpf});

      return !!customer;
    }
  }
  
  export { CustomerRepository };