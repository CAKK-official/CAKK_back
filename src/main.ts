import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any; // Hot Reloading Setting

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;
  await app.listen(8000);
  console.log(`Listening on http://localhost:${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  } // Hot Reloading Setting
}
bootstrap();
