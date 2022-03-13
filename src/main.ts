import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './auths/guards/roles.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ValidationPipeB } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes(new ValidationPipeB());
  //app.useGlobalGuards(new RolesGuard());
  //app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
