import { Module, NestModule, MiddlewareConsumer, RequestMethod, forwardRef } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { AdultMiddleware } from 'src/middlewares/adult.middleware';
import { AppModule } from 'src/app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schemas/cat.schema';
@Module({
    imports: [
        forwardRef(() => AppModule),
        MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]
})
export class CatsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware, AdultMiddleware)
            .forRoutes({ path: 'cats', method: RequestMethod.POST });
    }
}
