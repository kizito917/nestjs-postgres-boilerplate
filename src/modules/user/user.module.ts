import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}