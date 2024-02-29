import { SchemaBuilder, SocketcanConnector } from '@nusje2000/canbus'
import { SSD1306Display } from '@nusje2000/display-driver'

const schemaBuilder = new SchemaBuilder()

schemaBuilder
  .defineMessage(0)
  .readUIntBE('rpm', 0, 2)
  .readUIntBE('speed', 2, 2)
  .readUIntBE('temperature', 4, 4)

const schema = schemaBuilder.create()

const connector = new SocketcanConnector({ channel: 'can0' })
const display = new SSD1306Display({
  address: 0x3c,
  width: 128,
  height: 64,
})

const storage = new Map<string, unknown>()

connector.onMessage(({ id, data }) => {
  schema.parse(id, data).map(({ type, value }) => storage.set(type, value))
})

let rendered = ''
setInterval(() => {
  console.log('Updating display')

  const rpm = storage.get('rpm')
  const text = (typeof rpm === 'number' ? rpm : 'XXXX').toString()

  if (rendered !== text) {
    display.draw.clear()
    display.draw.text([10, 10], 28, text.toString())
  }

  rendered = text.toString()
}, 200)

console.log('Connector started')
connector.start()
