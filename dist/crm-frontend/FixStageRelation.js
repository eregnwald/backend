"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixStageRelation1719604015830 = void 0;
const typeorm_1 = require("typeorm");
class FixStageRelation1719604015830 {
    async up(queryRunner) {
        await queryRunner.dropForeignKey('opportunities', 'FK_opportunity_stage');
        await queryRunner.dropColumn('opportunities', 'stage_id');
        await queryRunner.addColumn('opportunities', new typeorm_1.TableColumn({
            name: 'stage_id',
            type: 'integer',
            isNullable: false,
        }));
        await queryRunner.createForeignKey('opportunities', new typeorm_1.TableForeignKey({
            columnNames: ['stage_id'],
            referencedTableName: 'sales_funnel_stages',
            referencedColumnNames: ['stage_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('opportunities', 'FK_opportunity_to_sales_funnel_stage');
        await queryRunner.addColumn('opportunities', new typeorm_1.TableColumn({
            name: 'stage_id',
            type: 'integer',
            isNullable: true,
        }));
        await queryRunner.createForeignKey('opportunities', new typeorm_1.TableForeignKey({
            columnNames: ['stage_id'],
            referencedTableName: 'opportunity_stages',
            referencedColumnNames: ['stage_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }
}
exports.FixStageRelation1719604015830 = FixStageRelation1719604015830;
//# sourceMappingURL=FixStageRelation.js.map