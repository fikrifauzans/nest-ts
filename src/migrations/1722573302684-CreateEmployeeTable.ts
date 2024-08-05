import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmployeeTable1722573302684 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employee',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nama',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'nomor',
            type: 'int',
          },
          {
            name: 'jabatan',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'departemen',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'tanggal_masuk',
            type: 'date',
          },
          {
            name: 'foto',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'foto_path',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employee');
  }
}
