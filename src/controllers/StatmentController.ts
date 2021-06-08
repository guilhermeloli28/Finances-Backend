import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from 'yup';
import { StatmentRepository } from '../repositories/StatmentRepository';
import { AppError } from "../errors/AppError";

class StatmentController {
    async create(request: Request, response: Response) {
        const { description, amount, type } = request.body;
        const { customer } = request;

        const schema = yup.object().shape({
            description: yup.string().required(),
            amount: yup.number().required(),
            type: yup.string().required()
        });
      
        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            throw new AppError(err);
        }

        const statmentRepository = getCustomRepository(StatmentRepository);

        const statment = statmentRepository.create({
            description,
            amount,
            type,
            customer_id: customer.id
        });

        await statmentRepository.save(statment);

        return response.status(201).json({
            message: 'Statment created',
            statment
        });
    }

    async index(request: Request, response: Response) {
        const { customer } = request;
        const statmentRepository = getCustomRepository(StatmentRepository);

        const statments = await statmentRepository.find({
            where: { customer_id: customer.id }
        });

        return response.json(statments);
    }

    async findByDate(request: Request, response: Response) {
        const { customer } = request;
        const { date } = request.query;
        const statmentRepository = getCustomRepository(StatmentRepository);
        const dateFormat = new Date(date + " 00:00");

        const statments = await statmentRepository.findByDate(customer.id, dateFormat);

        return response.json(statments);
    }
}

export { StatmentController }