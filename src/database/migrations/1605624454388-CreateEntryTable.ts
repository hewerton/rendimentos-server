import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEntryTable1605624454388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'entries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'ticker',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'integer',
          },
          {
            name: 'value',
            type: 'integer',
          },
          {
            name: 'taxes',
            type: 'integer',
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'walletId',
            type: 'uuid',
            isNullable: true,
            default: 'NULL',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'entries',
      new TableForeignKey({
        name: 'WalletForeignKey',
        columnNames: ['walletId'],
        referencedTableName: 'wallets',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'Cascade',
      })
    );

    await queryRunner.createForeignKey(
      'entries',
      new TableForeignKey({
        name: 'UserForeignKey',
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('entries', 'UserForeignKey');
    await queryRunner.dropForeignKey('entries', 'WalletForeignKey');
    await queryRunner.dropTable('entries');
  }
}
