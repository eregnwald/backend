import { Controller, Get, UseGuards, Req, Post, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getNotifications(@Req() req) {
    return this.notificationsService.findAllForUser(req.user.userId);
  }


  @Post(':id/read')
  async markAsRead(@Param('id') id: number) {
    await this.notificationsService.markAsRead(id);
    return { message: 'Уведомление успешно прочитано' };
  }
  
}