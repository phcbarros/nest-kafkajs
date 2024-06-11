import {Injectable, OnModuleInit} from '@nestjs/common'
import {ConsumerService} from './kafka/consumer.service'

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  onModuleInit() {
    this.consumerService.consume(
      {
        topics: ['test', 'create'],
      },
      {
        eachMessage: async ({topic, partition, message}) => {
          // executa quando receber uma mensagem no tópico
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          })
        },
      },
    )
  }
}
