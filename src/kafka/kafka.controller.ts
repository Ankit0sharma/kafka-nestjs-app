import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  private readonly logger = new Logger(KafkaController.name);

  constructor(private readonly kafkaService: KafkaService) {}

  @Get('produce')
  async produce() {
    await this.kafkaService.produceMessage('test-topic', { key: 'value' });
    return 'Message produced!';
  }

  @EventPattern('test-topic')
  async handleMessage(@Payload() message: any) {
    this.logger.log(`Message received in controller: ${JSON.stringify(message)}`);
    this.kafkaService.handleMessage(message);
  }
}
