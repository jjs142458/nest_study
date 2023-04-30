import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Patch,
  Put,
  Post,
  Get,
  UseFilters,
  ParseIntPipe,
  Param,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cat.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter) //Exception 설정을 만들수 있음
export class CatsController {
  constructor(private readonly CatsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log(body);
    return await this.CatsService.signUp(body);
  }
}
