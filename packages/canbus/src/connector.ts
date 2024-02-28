import { Message } from './message'

export type MessageHandler = (message: Message) => Promise<void> | void

export interface Connector {
  onMessage(callback: MessageHandler): void
  send(id: number, data: Buffer): void
  start(): void
  stop(): void
}
