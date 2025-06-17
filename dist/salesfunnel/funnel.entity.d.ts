import { User } from '../users/entities/user.entity';
export declare class SalesFunnel {
    funnel_id: number;
    funnel_name: string;
    owner_id: number | null;
    owner: User;
    is_shared: boolean;
    created_at: Date;
}
