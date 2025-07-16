import { Controller, Post, Body, HttpException, HttpStatus, Response, Res, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserAuthGuard } from './guard/user-auth.guard';


@Controller('api/auth')
export class AuthController {
   constructor(private readonly authService: AuthService) { }

   @Post('login')
   async create(
      @Body() body: LoginDto,
      @Res() res
   ) {
      try {
         const result = await this.authService.login(body);
         res.cookie('token', result.access_token, {
            expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
            sameSite: 'strict',
            httpOnly: false,
            secure: true,
            domain: process.env.ENVIRONMENT !== 'production' ? 'localhost' : '.arupmaity.in'
         });
         return res.status(200).send({ success: true, message: 'Login successfully', user: result.payload });
      } catch (error) {
         throw new HttpException(
            {
               success: false,
               message: error.message,
               error: error.name,
            },
            error.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   @UseGuards(UserAuthGuard)
   @Get('check-token')
   async userTokenCheck(@Request() req, @Response() res) {
      const user = req.user
      if (user) {
         return res.status(200).json({ success: true, login: true, user });
      } else {
         return res.status(401).json({ success: false, login: false, message: 'Unauthorized' });
      }
   }

   @UseGuards(UserAuthGuard)
   @Get('logout')
   async logout(
      @Request() req,
      @Res() res
   ) {
      try {
         res.cookie('token', "", {
            expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
            sameSite: 'strict',
            httpOnly: false,
            secure: true,
            domain: process.env.ENVIRONMENT !== 'production' ? 'localhost' : '.arupmaity.in'
         });
         return res.status(200).send({ success: true, message: 'Logout successfully' });
      } catch (error) {
         return res.status(500).send({ success: false, message: 'Something went wrong', });
      }
   }
}
