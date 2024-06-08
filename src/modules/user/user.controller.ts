import { Controller, Get, Post, Body, Res } from "@nestjs/common";
import { ApiTags, ApiResponse, ApiBody } from "@nestjs/swagger";
import { Response } from "express";
import { UserService } from "./user.service";
import { UserDto, RegistrationDto, loginDto } from "./user.dto";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'User created successfully.'})
    @ApiResponse({ status: 500, description: 'Error. Unable to create user.'})
    @ApiBody({
       type: RegistrationDto,
       description: 'Json structure for create user object',
    })
    async createUser(@Body() userData: RegistrationDto, @Res() res: Response): Promise<Response> {
        try {
            const createdUser = await this.userService.createUser(userData);
            return res.status(200).json({
                message: 'User created successfully',
                data: createdUser
            })
        } catch (err) {
            return res.status(500).json({
                message: 'Error. Unable to create user',
                data: err
            });
        }
    }

    @Post('login')
    @ApiResponse({ status: 200, description: 'Login successful'})
    @ApiResponse({ status: 400, description: 'Incorrect email and password combination'})
    @ApiResponse({ status: 404, description: 'Error. No user associated with this email'})
    @ApiResponse({ status: 500, description: 'Error. Unable to process login'})
    @ApiBody({
       type: RegistrationDto,
       description: 'Json structure for user object',
    })
    async signInUser(@Body() loginData: loginDto, @Res() res: Response): Promise<Response> {
        try {
            const user = await this.userService.findUserByEmail(loginData.email);

            if (!user) {
                return res.status(404).json({
                    message: 'Error. No user associated with this email',
                    data: null
                }); 
            }

            const { message, responseType, data } = await this.userService.processLogin(user, loginData.password);
            if (responseType === 'Error') {
                return res.status(400).json({
                    message,
                    data
                });
            }

            return res.status(200).json({
                message,
                data
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Error. Unable to process login',
                data: err
            }); 
        }
    }
}