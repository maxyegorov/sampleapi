import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swConfig = new DocumentBuilder()
    .setTitle('Sample API')
    .setDescription('Sample rest API created using Nestjs')
    .setVersion('1.0')
    .build();

  const swOptions = {
    customSiteTitle: 'Sample API Docs',
  };

  const document = SwaggerModule.createDocument(app, swConfig);
  SwaggerModule.setup('sw', app, document, swOptions);

  await app.listen(3000);
}
bootstrap();
