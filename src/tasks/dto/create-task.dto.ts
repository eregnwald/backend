export class CreateTaskDto {
  title: string;
  description?: string;
  due_date: Date;
  status_id: number;
  priority_id: number;
  assigned_to: number;
  related_contact?: number | null;
  related_account?: number | null;
  is_urgent?: boolean;
}