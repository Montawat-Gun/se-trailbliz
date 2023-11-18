import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { ChatModule } from "./modules/chat/chat.module";
import { OrganizeModule } from "./modules/organize/organize.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggerMiddleware } from "./middlewares/logger.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    ChatModule,
    OrganizeModule,
    ProfileModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
