export declare class CreateTaskDto {
    title: string;
    description?: string;
    due_date: Date;
    task_type_id: number;
    assigned_to?: number;
    contact_id?: number;
    account_id?: number;
}
