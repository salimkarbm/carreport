import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/decorator/current-user.dto';
import { User } from './users.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async creatUser(
    @Body() body: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(
    @Body() body: CreateUserDto,
    @Req() request: Record<string, any>,
  ) {
    const user = await this.authService.signin(body.email, body.password);
    request.session.userId = user.id;
    console.log(request.session);
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
    console.log(session);
  }

  // @Get('/whoami')
  // async whoAmI(@CurrentUser() user: any) {
  //   console.log(user);
  //   // return this.usersService.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoAmI(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @Get()
  findUserByEmail(@Query('email') email: string) {
    console.log('getall');
    return this.usersService.find(email);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    console.log('get one');
    return this.usersService.findOne(parseInt(id));
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
