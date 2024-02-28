export type MessageId = number

// Timestamp of the message in seconds
export type Timestamp = number

export interface Message {
  id: MessageId
  timestamp: Timestamp
  data: Buffer
}
