import { MessageId } from '../message'
import { MessageDefinition, MessageDefinitionPart, Schema } from './schema'

export class SchemaBuilder {
  private readonly messageDefinitions = new Map<
    MessageId,
    MessageDefinitionBuilder
  >()

  defineMessage(id: MessageId): MessageDefinitionBuilder {
    const builder = new MessageDefinitionBuilder()
    this.messageDefinitions.set(id, builder)

    return builder
  }

  create(): Schema {
    return new Schema(
      new Map(
        [...this.messageDefinitions.entries()].map(([id, definition]) => [
          id,
          definition.create(),
        ]),
      ),
    )
  }
}

export class MessageDefinitionBuilder {
  private readonly parts: MessageDefinitionPart[] = []

  readUIntLE(
    type: string,
    offset: number,
    byteLength: number,
  ): MessageDefinitionBuilder {
    this.parts.push((data) => ({
      type,
      value: data.readUIntLE(offset, byteLength),
    }))

    return this
  }

  readUIntBE(
    type: string,
    offset: number,
    byteLength: number,
  ): MessageDefinitionBuilder {
    this.parts.push((data) => ({
      type,
      value: data.readUIntBE(offset, byteLength),
    }))

    return this
  }

  create(): MessageDefinition {
    return new MessageDefinition([...this.parts])
  }
}
