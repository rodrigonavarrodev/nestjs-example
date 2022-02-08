import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/singup')
  singUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authcredentialsDto)
  }

  @Post('/singin')
  singIn(@Body() authcredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.singIn(authcredentialsDto)
  }

}
