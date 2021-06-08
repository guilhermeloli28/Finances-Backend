import { Column, Entity } from "typeorm";
import { DefaultEntity } from "./DefaultEntity";

@Entity('Customer')
class Customer extends DefaultEntity {
    @Column()
    name: string;

    @Column()
    cpf: string;
}

export { Customer }