import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

declare const module: any; // Hot Reloading Setting

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  const port = process.env.PORT || 8000;
  //--------------------Swagger---------------------------//
  const config = new DocumentBuilder()
    .setTitle('CaKK API')
    .setDescription('The cakk API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  await app.listen(8000);
  console.log(`Listening on http://localhost:${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  } // Hot Reloading Setting
}
bootstrap();
