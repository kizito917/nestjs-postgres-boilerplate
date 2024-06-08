import { ApiProperty } from "@nestjs/swagger";

export interface UserDto {
    id: number;
    username: string;
    email: string;
    password: string;
}

export class RegistrationDto {
    @ApiProperty({
        example: 'Alexa',
        required: true
    })
    username: string;

    @ApiProperty({
        example: 'alexa@gmail.com',
        required: true
    })
    email: string;

    @ApiProperty({
        example: 'Password@1',
        required: true 
    })
    password: string;
}

export class loginDto {
    @ApiProperty({
        example: 'test@gmail.com',
        required: true
    })
    email: string;

    @ApiProperty({
        example: 'Password@1',
        required: true
    })
    password: string;
}