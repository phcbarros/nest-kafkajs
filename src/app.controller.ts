import {Body, Controller, Get, Post} from '@nestjs/common'
import {AppService} from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello()
  }

  @Post()
  createMessage(@Body() message: string) {
    return this.appService.create(message)
  }
}
