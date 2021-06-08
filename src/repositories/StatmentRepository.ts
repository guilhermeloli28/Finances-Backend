import { EntityRepository, Repository, Between } from "typeorm";
import { Statment } from "../models/Statment";
import { startOfDay, endOfDay, format } from 'date-fns';

@EntityRepository(Statment)
class StatmentRepository extends Repository<Statment> {
    async findByDate(customerId: string, date1: Date ): Promise<Statment[]> {
        const initialDate = format(startOfDay(date1), 'yyyy-MM-dd HH:mm:ss');
        const finalDate = format(endOfDay(date1), 'yyyy-MM-dd HH:mm:ss');

        const statments = this.find({
            where: {
                created_at: Between(initialDate, finalDate),
                customer_id: customerId
            }
        });

        return statments;
    }
}

export { StatmentRepository }