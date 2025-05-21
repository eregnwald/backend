import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { ContactsModule } from './contacts/contacts.module'; 
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { TasksModule } from './tasks/tasks.module';
import { TaskPrioritiesModule } from './task-priorities/task-priorities.module';
import { TaskStatusesModule } from './task-statuses/task-statuses.module';
import { InteractionDetailsModule } from './interaction-details/interaction-details.module';
import { InteractionsModule } from './interactions/interactions.module';
import { InteractionTypesModule } from './interaction-types/interaction-types.module';
import { OpportunityStagesModule } from './opportunity-stages/opportunity-stages.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsService } from './permissions/permissions.service';
import { PermissionsController } from './permissions/permissions.controller';
import { AuditLogModule } from './audit-log/audit-log.module';
import { DocumentLinksModule } from './document-links/document-links.module';
import { DocumentsModule } from './documents/documents.module';
import { EntityTagsModule } from './entity-tags/entity-tags.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ добавить эту строчку
    UsersModule,
   TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true),
        autoLoadEntities: true,
        logging: configService.get<boolean>('DB_LOGGING', false),
      }),
      inject: [ConfigService],
    }),
    AccountsModule,
    ContactsModule,
    OpportunitiesModule,
    TasksModule,
    InteractionsModule,
    DocumentsModule,
    RolesModule,
    PermissionsModule,
    UserRolesModule,
    RolePermissionsModule,
    OpportunityStagesModule,
    InteractionTypesModule,
    InteractionDetailsModule,
    TaskStatusesModule,
    TaskPrioritiesModule,
    DocumentLinksModule,
    AuditLogModule,
    TagsModule,
    EntityTagsModule,
    AuthModule,
    
  ],
  controllers: [AppController, PermissionsController, ],
  providers: [AppService, PermissionsService],
})
export class AppModule {}