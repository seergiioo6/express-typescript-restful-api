import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePoliceTable1543670147958 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'policy',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'amount_insured',
                    type: 'decimal',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'inception_date',
                    type: 'datetime',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'installment_payment',
                    type: 'boolean',
                    isPrimary: false,
                    isNullable: false,
                } , {
                    name: 'client_id',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('policy');
    }

}
