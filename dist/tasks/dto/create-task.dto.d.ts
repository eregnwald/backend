export declare class CreateTaskDto {
    title: string;
    description?: string;
    due_date: Date;
    is_urgent?: boolean;
    assigned_to: number;
    task_type_id: number;
    related_contact?: number | null;
    account_id?: number | null;
    opportunity_id?: number | null;
}
