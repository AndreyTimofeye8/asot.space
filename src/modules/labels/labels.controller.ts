import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LabelsService } from './labels.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { labelApiData } from './label.constants';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../common/decorator/roles.decorator';
import { Role } from '../../common/enum/role.enum';
import { Label } from '../../entities/label.entity';
import { ResourcePaginationDto } from '../../common/dto/resource-pagination.dto';
import { LabelsResponse } from './dto/label-responses.dto';
import { SuccessResponce } from '../../common/responces';

@ApiTags(labelApiData.labelsTag)
@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @ApiOperation({ summary: labelApiData.createLabel })
  @ApiCreatedResponse({ type: Label })
  @Post()
  @Roles(Role.admin)
  create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelsService.create(createLabelDto);
  }

  @Get()
  @ApiOkResponse({ type: [LabelsResponse] })
  findAll(@Query() query: ResourcePaginationDto) {
    return this.labelsService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelDto) {
    return this.labelsService.update(+id, updateLabelDto);
  }

  @ApiOperation({ summary: labelApiData.deleteLabel })
  @ApiOkResponse({ type: SuccessResponce })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labelsService.remove(+id);
  }
}
