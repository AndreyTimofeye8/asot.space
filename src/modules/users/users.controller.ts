import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';
import { apiData } from '../../common/constants';
import { UnauthorizedResponse } from '../auth/dto/auth.responces';
import { UserNotFoundResponce } from './dto/user.responces';
import { usersApiData } from './user.constants';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: usersApiData.getUserAccount })
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

  // TODO remove accounts by admin
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
