import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CatsModule,
    MongooseModule.forRoot(
      'mongodb+srv://sosorry:iz7sWk9lMd8v2LGk@todoin.4l1sfau.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); //logger 클래스 불러오기 및 라우팅
    mongoose.set('debug', this.isDev); // mongoose 쿼리가 찍힘
  }
}
