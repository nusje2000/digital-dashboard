import { MessageId } from '../message'

export type Value<T = unknown> = { type: string; value: T }

export type MessageDefinitionPart = (data: Buffer) => Value

export class MessageDefinition {
  constructor(private readonly parts: ReadonlyArray<MessageDefinitionPart>) {}

  parse(data: Buffer) {
    return this.parts.map((part) => part(data))
  }
}

export class Schema {
  constructor(private readonly mapping: Map<MessageId, MessageDefinition>) {}

  parse(id: MessageId, data: Buffer): Value[] {
    const definition = this.mapping.get(id)

    return definition ? definition.parse(data) : []
  }
}
