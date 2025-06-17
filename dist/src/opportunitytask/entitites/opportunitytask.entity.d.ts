import { Opportunity } from '../../opportunities/entities/opportunity.entity';
import { Task } from '../../tasks/entities/task.entity';
export declare class OpportunityTask {
    id: number;
    opportunity_id: number;
    task_id: number;
    opportunity: Opportunity;
    task: Task;
}
