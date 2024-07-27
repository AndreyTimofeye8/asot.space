import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';
import { apiData } from 'src/common/constants';
import { UnauthorizedResponse } from '../auth/dto/auth.responces';
import { UserNotFoundResponce } from './dto/user.responces';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: apiData.unauthorizedOperation,
  })
  @ApiOkResponse({
    type: JwtPayloadDto,
    description: apiData.successfulOperation,
  })
  @ApiNotFoundResponse({ type: UserNotFoundResponce })
  @Get('/account')
  findOne(@CurrentUser() user: JwtPayloadDto) {
    return this.userService.findUserAccount(user.email);
  }

  @ApiOkResponse({
    type: JwtPayloadDto,
    description: apiData.successfulOperation,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: apiData.unauthorizedOperation,
  })
  @ApiNotFoundResponse({ type: UserNotFoundResponce })
  @Patch('/account')
  update(
    @CurrentUser() user: JwtPayloadDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUserAccount(user.email, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
