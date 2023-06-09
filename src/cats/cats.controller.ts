import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { CreateCatDto } from './cats.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  /**
   * Add new cat
   */
  @Post()
  @UseGuards(new AuthGuard())
  async create(@Body() createCatDto: CreateCatDto) {
    const id = this.catsService.getNewId();
    const newCat = {
      ...createCatDto,
      id,
    };

    this.catsService.create(newCat);
  }

  /**
   * Returns all cats
   */
  @Get('all')
  async findAll() {
    return this.catsService.findAll();
  }

  /**
   * Returns cat by id
   */
  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: string) {
    return this.catsService.findOneById(parseInt(id));
  }

  @Get('species/:species')
  findOneBySpecies(@Param('species') species: string) {
    throw new HttpException("Can't find by species", HttpStatus.BAD_REQUEST);
  }
}
