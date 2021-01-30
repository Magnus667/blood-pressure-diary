import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() request){
        return this.authService.login(request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('login')
    async getUser(@Request() request){
        const user = await this.authService.findUserById(request.user.id);

        if(user){
            return user;
        } else {
            // todo: return not found
            return null;
        }
    }
}
