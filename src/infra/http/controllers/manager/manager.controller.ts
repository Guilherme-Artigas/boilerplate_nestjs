import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagerUseCaseFacade } from '@domain/company/application/facade/ManagerUseCaseFacade';
import { UpdateManagerDto } from './dto/update-manager.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('manager')
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerUseCaseFacade: ManagerUseCaseFacade) {}

  @Post()
  @ApiOperation({ summary: 'Create a new manager' })
  @ApiBody({ type: CreateManagerDto })
  @ApiResponse({ status: 201, description: 'Manager successfully created.' })
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managerUseCaseFacade.createUseCase().execute(createManagerDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all managers' })
  @ApiResponse({ status: 200, description: 'List of managers.' })
  findAll() {
    return this.managerUseCaseFacade.getAllUseCase().execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a manager by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Manager ID',
  })
  @ApiResponse({ status: 200, description: 'Manager found.' })
  findOne(@Param('id') id: string) {
    return this.managerUseCaseFacade.getByIdUseCase().execute({ id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a manager' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Manager ID',
  })
  @ApiBody({ type: UpdateManagerDto })
  @ApiResponse({ status: 200, description: 'Manager updated.' })
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerUseCaseFacade
      .updateUseCase()
      .execute({ ...updateManagerDto, id });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a manager' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Manager ID',
  })
  @ApiResponse({ status: 200, description: 'Manager deleted.' })
  remove(@Param('id') id: string) {
    return this.managerUseCaseFacade.deleteUseCase().execute({ id });
  }
}
