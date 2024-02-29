import { Display, SSD1306Display } from '@nusje2000/display-driver'
import { openSync } from 'i2c-bus'

const bus = openSync(1)

bus.i2cWriteSync(0x70, 1, Buffer.from([0x01]))
const display1 = new SSD1306Display({
  address: 0x3c,
  width: 128,
  height: 64,
  bus,
})

bus.i2cWriteSync(0x70, 1, Buffer.from([0x02]))
const display2 = new SSD1306Display({
  address: 0x3c,
  width: 128,
  height: 64,
  bus,
})

// const multiplexer = new TCA9548AMultiplexer(bus, 0x70)
//
// const display1 = new MultiplexedDisplay(
//   multiplexer,
//   0,
//   () =>
//     new SSD1306Display({
//       address: 0x3c,
//       width: 128,
//       height: 64,
//       bus,
//     }),
// )
// const display2 = new MultiplexedDisplay(
//   multiplexer,
//   1,
//   () =>
//     new SSD1306Display({
//       address: 0x3c,
//       width: 128,
//       height: 64,
//       bus,
//     }),
// )

const draw = (display: Display, text: string) => {
  display.draw.clear()
  console.log('Drawing pixels...')
  display.draw.pixel([[[2, 0]], [[0, 0]], [[0, 2]]])
  display.draw.pixel([[[127, 63]], [[125, 63]], [[127, 61]]])
  console.log('Drawing text...')
  display.draw.text([10, 10], 7, text)
  display.draw.text([17, 17], 14, text)
  display.draw.text([31, 31], 21, text)
  console.log('Done!')
}

bus.i2cWriteSync(0x70, 1, Buffer.from([0x01]))
draw(display1, 'Display 1')
bus.i2cWriteSync(0x70, 1, Buffer.from([0x02]))
draw(display2, 'Display 2')
