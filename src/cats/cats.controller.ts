import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Patch,
  Put,
  Post,
  Get,
  UseFilters,
  HttpException,
} from '@nestjs/common';

@Controller('cats')
@UseFilters(HttpExceptionFilter) //Exception 설정을 만들수 있음
export class CatsController {
  constructor(private readonly CatsService: CatsService) {}

  @Get()
  getAllCat() {
    throw new HttpException('api broken', 401);
    return 'all cat';
  }

  @Get(':id')
  getOneCat() {
    return 'one cat';
  }
  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }
  @Patch(':id')
  updatePartialCat() {
    return 'update';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete';
  }
}
