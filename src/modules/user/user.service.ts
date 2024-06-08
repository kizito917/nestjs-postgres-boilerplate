// External imports
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

// Internal imports
import { UserDto, loginDto, RegistrationDto } from './user.dto';
import { User } from 'src/database/models/user.model';

@Injectable()
export class UserService {
    async createUser(userData: RegistrationDto): Promise<RegistrationDto> {
        const hashedPassword = await bcrypt.hash(userData.password, 15);
        const user = await User.create({
            ...userData,
            password: hashedPassword
        });
        return user;
    }

    async findUserByEmail(email: string): Promise<UserDto> {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        return user;
    }

    async processLogin(userData: UserDto, loginPassword: string): Promise<any> {
        const passwordMatch = await bcrypt.compare(loginPassword, userData.password);
        if (!passwordMatch) {
            return {
                message: 'Incorrect email and password combination',
                responseType: 'Error',
                data: null
            }
        }

        // Sign user with jwt
        const token = jwt.sign({ id: userData.id }, 'secretKey', {expiresIn: '1h'});
        return {
            message: 'Login successful',
            responseType: 'Success',
            data: token
        }
    }
}
