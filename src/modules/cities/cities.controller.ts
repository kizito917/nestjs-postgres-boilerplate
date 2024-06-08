import { Controller, Get, Post, Query, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { CitiesService } from './cities.service';
import { CityDto } from './cities.dto';

@Controller()
export class CitiesController {
  constructor(private readonly cityService: CitiesService) {}

  @Get()
  getHello(@Query('type') type): string {
    return this.cityService.getHello(type);
  }

  @Get('cities')
  getAllCities(@Res() res: Response): void {
    const allCities = this.cityService.getCities();
    res.status(200).json(allCities);
  }

  @Get(':city')
  getCity(@Param('city') city): CityDto {
    return this.cityService.getCity(city);
  }

  @Post('city')
  addNewCity(@Body() cityData: CityDto) : string {
    return this.cityService.createCity(cityData);
  }
}
