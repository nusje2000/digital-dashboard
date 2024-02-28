import { SchemaBuilder, SocketcanConnector } from '@nusje2000/canbus'

const schemaBuilder = new SchemaBuilder()

schemaBuilder
  .defineMessage(0)
  .readUIntBE('rpm', 0, 2)
  .readUIntBE('speed', 2, 2)
  .readUIntBE('temperature', 4, 4)

const schema = schemaBuilder.create()

const connector = new SocketcanConnector({ channel: 'can0' })
connector.onMessage(({ id, data }) => {
  console.log('Received message', id, data)
  console.log('Parsed message', schema.parse(id, data))
})

console.log('Connector started')
connector.start()
