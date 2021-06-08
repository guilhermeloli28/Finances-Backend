import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { CustomerRepository } from "../repositories/CustomerRepository";

class CustomerMiddleware {
    async verifyIfExisitsAccountCPF(request: Request, response: Response, next: NextFunction) {
        const { cpf } = request.headers;
        
        const customerRepository = getCustomRepository(CustomerRepository);

        const customer = await customerRepository.findOne({ cpf: cpf.toString() });

        if(!customer) throw new AppError('Customer not found');
        
        request.customer = customer;
        
        return next();
    }
}

export { CustomerMiddleware };