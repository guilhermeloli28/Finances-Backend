import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateStatment1623168113735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'statment',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'type',
                    type: 'varchar'
                },
                {
                    name: 'amount',
                    type: 'number'
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: 'customer_id',
                    type: 'uuid'
                }
            ],
            foreignKeys: [
                {
                    name: 'fk_customer',
                    referencedTableName: 'customer',
                    referencedColumnNames: ['id'],
                    columnNames: ['customer_id'],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('statment');
    }

}
