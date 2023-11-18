import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
require("dotenv").config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //enable cors
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT || 3333;
  await app.listen(port);
}
bootstrap();