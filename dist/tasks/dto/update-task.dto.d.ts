export declare class UpdateTaskDto {
    title?: string;
    description?: string | null;
    due_date?: Date;
    assigned_to?: number | null;
    related_contact?: number | null;
    account_id?: number | null;
    opportunity_id?: number | null;
    task_type_id?: number;
    is_urgent?: boolean;
    is_closed?: boolean;
    result?: string;
}
