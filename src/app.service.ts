import {Injectable} from '@nestjs/common'
import {ProducerService} from './kafka/producer.service'

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}

  async getHello() {
    await this.producerService.produce({
      topic: 'test',
      messages: [{value: `Hello World! ${Date.now().toString()}`}],
    })
    return `Hello World! ${Date.now().toString()}`
  }

  async create(message: string) {
    await this.producerService.produce({
      topic: 'create',
      messages: [{value: JSON.stringify(message)}],
    })
    return message
  }
}
