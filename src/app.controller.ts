import { Controller, Get, Post, Query, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('type') type): string {
    return this.appService.getHello(type);
  }
}
