import {MigrationInterface, QueryRunner, TableForeignKey} from 'typeorm';

export class AddUserRelationToPoliceTable1543741971906 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_user_policy',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('policy', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('policy', this.tableForeignKey);
    }

}
