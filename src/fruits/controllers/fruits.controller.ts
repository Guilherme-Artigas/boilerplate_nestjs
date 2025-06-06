import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FruitsService } from '../services/fruits.service';
import { CreateFruitDto } from '../dto/create-fruit.dto';
import { UpdateFruitDto } from '../dto/update-fruit.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('fruits')
@Controller('fruits')
export class FruitsController {
  constructor(private readonly fruitsService: FruitsService) {}

  @Post()
  @ApiBody({ type: CreateFruitDto })
  create(@Body() dto: CreateFruitDto) {
    return this.fruitsService.create(dto);
  }

  @Get()
  findAll() {
    return this.fruitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fruitsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFruitDto) {
    return this.fruitsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fruitsService.remove(id);
  }
}
