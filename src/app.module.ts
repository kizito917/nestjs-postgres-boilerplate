import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './modules/cities/cities.module';
import { UserModule } from './modules/user/user.module';
import { User } from './database/models/user.model';

const databaseConfig =  require('./database/config.js');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      ...databaseConfig[process.env.NODE_ENV || 'development'],
      autoLoadModels: true,
      synchronize: false, // Set to false if you want to use migrations instead of auto-sync
    }),
    SequelizeModule.forFeature([User]), 
    CitiesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
