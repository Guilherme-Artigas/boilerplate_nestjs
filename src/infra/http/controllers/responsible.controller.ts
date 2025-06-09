import { CreateResponsibleDto } from '../../../application/dtos/responsible/create-responsible.dto';
import { ResponsibleResponseDto } from '../../../application/dtos/responsible/responsible-response.dto';
import { CreateResponsible } from '../../../application/usecases/responsible/create-responsible';
import { DeleteResponsible } from '../../../application/usecases/responsible/delete-responsible';
import { FindAllResponsible } from '../../../application/usecases/responsible/findAll-responsible';
import { FindOneResponsible } from '../../../application/usecases/responsible/findOne-responsible';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('responsibles')
export class ResponsibleController {
  constructor(
    private readonly createResponsible: CreateResponsible,
    private readonly findOneResponsible: FindOneResponsible,
    private readonly findAllResponsible: FindAllResponsible,
    private readonly deleteResponsible: DeleteResponsible,
  ) {}

  @Post()
  async create(@Body() dto: CreateResponsibleDto): Promise<void> {
    await this.createResponsible.execute(dto);
  }

  @Get()
  async findAll(): Promise<ResponsibleResponseDto[]> {
    const responsibles = await this.findAllResponsible.execute();
    return responsibles.map((responsible) =>
      ResponsibleResponseDto.fromDomain(responsible),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponsibleResponseDto> {
    const responsible = await this.findOneResponsible.execute(id);
    return ResponsibleResponseDto.fromDomain(responsible);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ success: boolean }> {
    const success = await this.deleteResponsible.execute(id);
    return { success };
  }
}
