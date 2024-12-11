import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiOkResponse
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ 
    summary: 'Sign up new user',
    description: 'Create a new user account with specified role'
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ 
    description: 'User successfully created',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User registration successful'
        }
      }
    }
  })
  @ApiBadRequestResponse({ 
    description: 'Invalid input (username exists, invalid password format, etc.)',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Username already exists' },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  @ApiOperation({ 
    summary: 'Sign in user',
    description: 'Authenticate user and return JWT token'
  })
  @ApiBody({ type: AuthCredentialsDto })
  @ApiOkResponse({ 
    description: 'User successfully signed in',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        }
      }
    }
  })
  @ApiUnauthorizedResponse({ 
    description: 'Invalid credentials',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 401 },
        message: { type: 'string', example: 'Invalid credentials' },
        error: { type: 'string', example: 'Unauthorized' }
      }
    }
  })
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
