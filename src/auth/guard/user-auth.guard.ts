import {
   CanActivate,
   ExecutionContext,
   Injectable,
   UnauthorizedException,
   HttpException,
   HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants';

@Injectable()
export class UserAuthGuard implements CanActivate {
   constructor(private readonly jwtService: JwtService) { }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      let token = this.extractTokenFromCookies(request) || this.extractTokenFromHeader(request);

      if (!token) {
         throw new UnauthorizedException('No token provided');
      }

      try {
         const payload = await this.jwtService.verifyAsync(token, {
            secret: jwtConstants.secret,
         });
         request['user'] = payload; // Attach user to request
      } catch (err) {
         throw new HttpException(
            {
               success: false,
               message: 'Invalid or expired token',
               error: 'Unauthorized',
            },
            HttpStatus.UNAUTHORIZED,
         );
      }

      return true;
   }

   private extractTokenFromHeader(request: Request): string | undefined {
      const authHeader = request.headers.authorization;
      if (!authHeader) return undefined;

      const [type, token] = authHeader.split(' ');
      return type === 'Bearer' ? token : undefined;
   }

   private extractTokenFromCookies(request: Request): string | undefined {
      return request.cookies?.token;
   }
}
