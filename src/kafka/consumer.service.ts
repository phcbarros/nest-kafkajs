import {Injectable, OnApplicationShutdown} from '@nestjs/common'
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs'

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  })

  private readonly consumers: Consumer[] = []

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({groupId: 'nest-kafkajs'})
    await consumer.connect() // conecta ao servidor
    await consumer.subscribe(topic) // inscrever no tópico
    await consumer.run(config) // executar algum código quando a mensagem é recebida
    this.consumers.push(consumer) // registrar o consumidor
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect()
    }
  }
}
