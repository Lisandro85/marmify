import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGblobal } from 'middleware/logeer';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT ?? 3000;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(loggerGblobal);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.listen(PORT);
    if (app) {
      console.log(`Server listen on Port:${PORT}`);
    }
  } catch (error) {
    console.log('Error to Up Server:', error);
  }
}
bootstrap();
