import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ASOT.SPACE')
    .setDescription('APPLICATION API')
    .setVersion('1.0')
    .addTag('ASOT')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  writeFileSync(
    join(process.cwd(), 'docs.json'),
    JSON.stringify(document, null, 2),
  );
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: '*', // заменить на конкретный домен в продакшене
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
