import { RawChannel, Message } from '*can.node'
import { createRawChannel } from 'socketcan'
import { Connector, MessageHandler } from '../connector'

type TimestampedMessage = Message & { ts_sec: number }

export type Config = {
  channel: string
}

export class SocketcanConnector implements Connector {
  private readonly listeners: MessageHandler[] = []
  private readonly channel: RawChannel

  constructor(config: Config) {
    this.channel = createRawChannel(config.channel, true)
    this.channel.addListener('onMessage', (message: TimestampedMessage) =>
      this.handleMessage(message),
    )
  }

  onMessage(callback: MessageHandler): void {
    this.listeners.push(callback)
  }

  send(id: number, data: Buffer): void {
    this.channel.send({ id, ext: false, rtr: false, data })
  }

  start(): void {
    this.channel.start()
  }

  stop(): void {
    this.channel.stop()
  }

  private handleMessage({
    id,
    data,
    ...rest
  }: TimestampedMessage & { ts_sec: number }) {
    return Promise.all(
      this.listeners.map((listener) =>
        listener({
          id,
          timestamp: rest.ts_sec ?? 0,
          data,
        }),
      ),
    )
  }
}
