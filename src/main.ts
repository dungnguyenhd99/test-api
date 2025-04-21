import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình CORS cho HTTP requests
  app.enableCors({
    origin: '*', // Trong môi trường production nên chỉ định domain cụ thể
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Accept,Authorization',
    credentials: true,
  });

  // Lấy port từ biến môi trường hoặc sử dụng port mặc định 3000
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Server đang chạy trên cổng ${port}`);
}

bootstrap();
