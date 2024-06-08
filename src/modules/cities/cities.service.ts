import { Injectable } from '@nestjs/common';
import { CityDto } from './cities.dto';

@Injectable()
export class CitiesService {
    private readonly cities: CityDto[] = [];

    getHello(type: string): string {
        return `Hello World!, I am using ${type !== 'string' ? '' : type}`;
    }

    getCities(): CityDto[] {
        return this.cities;
    }

    getCity(city: string): CityDto {
        const data = this.cities.filter((item) => item.name === city);
        return data[0];
    }

    createCity(cityDto: CityDto): string {
        this.cities.push(cityDto);
        return 'Done';
    }
}
