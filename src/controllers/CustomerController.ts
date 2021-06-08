import { Request, Response } from "express";
import * as yup from 'yup';
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import BalanceService from "../services/BalanceService";
import { CustomerRepository } from "../repositories/CustomerRepository";

class CustomerController {
    async create(request: Request, response: Response) {
        const { cpf, name } = request.body;

        const schema = yup.object().shape({
            cpf: yup.string().required(),
            name: yup.string().required()
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            throw new AppError(err);
        }

        const customerRepository = getCustomRepository(CustomerRepository);

        const customer = customerRepository.create({
            cpf,
            name
        });

        const customerAlreadyExists = await customerRepository.customerExists(cpf);

        if(customerAlreadyExists) throw new AppError('Customer already exists!');
        
        await customerRepository.save(customer);

        return response.status(201).json({
            message: 'Account created',
            customer
        });
    }

    async index(request: Request, response: Response) {
        const customerRepository = getCustomRepository(CustomerRepository);

        const customers = await customerRepository.find();

        return response.json(customers);
    }

    async update(request: Request, response: Response) {
        const { customer } = request;
        const { name } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required()
        });
        
        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            throw new AppError(err);
        }

        const customerRepository = getCustomRepository(CustomerRepository);

        customer.name = name;

        await customerRepository.save(customer);

        return response.json({
            message: 'Customer Updated',
            customer
        });
    }

    async delete(request: Request, response: Response) {
        const { customer } = request;

        const customerRepository = getCustomRepository(CustomerRepository);

        await customerRepository.delete(customer);

        return response.json({ message: 'Customer removed' })
    }

    async balance(request: Request, response: Response) {
        const { customer } = request;

        const balance = await BalanceService.getBalance(customer.id);

        return response.json({
            balance
        });
    }
}

export { CustomerController };