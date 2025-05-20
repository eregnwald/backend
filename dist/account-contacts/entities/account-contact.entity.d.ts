import { Account } from '../../accounts/entities/account.entity';
import { Contact } from '../../contacts/entities/contact.entity';
export declare class AccountContact {
    account_id: number;
    contact_id: number;
    account: Account;
    contact: Contact;
}
