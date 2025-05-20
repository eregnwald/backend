import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Contact } from '../../contacts/entities/contact.entity';

@Entity('account_contacts')
export class AccountContact {
  @PrimaryColumn()
  account_id: number;

  @PrimaryColumn()
  contact_id: number;

  @ManyToOne(() => Account, account => account.accountContacts)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => Contact, contact => contact.accountContacts)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;
}