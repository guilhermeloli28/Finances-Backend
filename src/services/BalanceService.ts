import { getCustomRepository } from "typeorm";
import { StatmentRepository } from "../repositories/StatmentRepository";

class BalanceService {
    async getBalance(customerId: string): Promise<number> {
        const statmentRepository = getCustomRepository(StatmentRepository);

        const statments = await statmentRepository.find({
            where: {
                customer_id: customerId
            }
        });

        const balance = statments.reduce((acc, statment) => {
            if(statment.type === 'credit') {
                return acc + statment.amount;
            } else {
                return acc - statment.amount;
            }
        }, 0);

        return balance;
    }
}

export default new BalanceService();