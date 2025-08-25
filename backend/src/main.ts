import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfig } from './config/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // app.use((req: { path: string }, res: { redirect: (arg0: string) => any }, next: () => void) => {
  //   if (req.path === '/') {
  //     return res.redirect('/api');
  //   }
  //   next();
  // });

  const configService = app.get(ConfigService);

  const appConfig = configService.get<AppConfig>('app');

  app.enableCors({
    origin: ['http://localhost:3000', 'https://automaze-to-do.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Automaze-To-Do')
    .setDescription('Automaze-To-Do is a web application that helps users plan their time')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 7,
      persistAuthorization: true,
    },
  });

  app.use(
    '/swagger-json',
    (req: any, res: { setHeader: (arg0: string, arg1: string) => void; send: (arg0: OpenAPIObject) => void }) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(document);
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        Logger.error('Validation failed', JSON.stringify(validationErrors));
        return new BadRequestException(
          validationErrors.map((error) => ({
            property: error.property,
            constraints: error.constraints,
          })),
        );
      },
    }),
  );

  if (!appConfig) {
    throw new Error('App config is missing');
  }
  await app.listen(appConfig.port, () => {
    Logger.log(`Server running on http://${appConfig.host}:${appConfig.port}`);
    Logger.log(`Swagger running on http://${appConfig.host}:${appConfig.port}/docs`);
  });
}
void bootstrap();
