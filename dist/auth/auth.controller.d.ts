import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    singUp(authcredentialsDto: AuthCredentialsDto): Promise<void>;
    singIn(authcredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
