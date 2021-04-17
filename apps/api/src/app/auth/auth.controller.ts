import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    // This is used to login with user credentials
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() request){
        return this.authService.login(request.user);
    }

    // This is used to restore the session from the session token when the user visits the site again
    @UseGuards(JwtAuthGuard)
    @Get('login')
    async getUser(@Request() request){
        const user = await this.authService.findUserById(request.user.id);

        if(user){
            return user;
        } else {
            // TODO: Return SessionInvalidError instead of null
            return null;
        }
    }
}
