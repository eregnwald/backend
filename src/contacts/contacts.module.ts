import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity'; // ✅ Проверь путь!
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]), // ⚠️ ВАЖНО: добавь сюда Contact
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}