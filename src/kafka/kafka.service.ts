import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { ClientKafka, Payload } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  private readonly logger = new Logger(KafkaService.name);

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Subscribe to the topic for message consumption
    this.kafkaClient.subscribeToResponseOf('test-topic');
    await this.kafkaClient.connect(); // Ensure the Kafka client connects
  }

  // Producer method
  async produceMessage(topic: string, message: any) {
    this.kafkaClient.emit(topic, message);
    this.logger.log(`Produced message: ${JSON.stringify(message)} to topic: ${topic}`);
  }

  // Consumer method
  handleMessage(@Payload() message: any) {
    this.logger.log(`Received message: ${JSON.stringify(message)}`);
  }
}
