import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create a microservice for Kafka communication
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'], // Ensure the correct broker address
      },
      consumer: {
        groupId: 'nestjs-group', // Match the group ID from KafkaModule
      },
    },
  });

  await app.startAllMicroservices(); // Start microservices
  await app.listen(3000);
}
bootstrap();
