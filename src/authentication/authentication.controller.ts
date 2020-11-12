import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import CreateUserDto from '../user/dto/createUser.dto';
import RequestWithUser from './types/requestWithUser';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import User from '../user/user.entity';
import JwtAuthenticationGuard from './guards/jwtAuthentication.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import LoginUserDto from '../user/dto/loginUser.dto';

@ApiTags('authorization')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'New user', type: User })
  @ApiResponse({
    status: 400,
    description: 'Specific error message concerning input incorrect input data',
  })
  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<User> {
    return this.authenticationService.register(userDto);
  }

  @ApiOperation({ summary: 'Login as user' })
  @ApiResponse({
    status: 202,
    description: 'Logged in as user and received http token',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Wrong credentials' })
  @HttpCode(202)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async logIn(@Req() request: RequestWithUser): Promise<User> {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'User logged out' })
  @ApiResponse({ status: 401, description: 'No one to logout' })
  @HttpCode(200)
  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser): Promise<void> {
    request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
  }

  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({ status: 200, description: 'User information', type: User })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }
}
