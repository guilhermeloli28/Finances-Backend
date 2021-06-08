  
import { PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

export class DefaultEntity {
    @PrimaryColumn()
    readonly id: string;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}