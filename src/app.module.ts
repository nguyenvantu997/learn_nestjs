import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    forwardRef(() => CatsModule),
    MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [
    AppController,
    // CatsController
  ],
  exports: [AppService],
  providers:
    [
      AppService
      //, CatsService,
      // {
      //   provide: APP_GUARD,
      //   useClass: RolesGuard
      // },
      // {
      //   provide: APP_INTERCEPTOR,
      //   useClass: LoggingInterceptor,
      // }
    ],
})
export class AppModule {
}
