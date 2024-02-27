import * as i2c from 'i2c-bus'
import * as oled from 'oled-i2c-bus'

export * from './display/display'
export * from './display/ssd1306'

export function testDisplay() {
  const opts = {
    width: 128,
    height: 64,
    address: 0x3c,
    bus: 1,
    driver: 'SSD1306',
  }

  const i2cbus = i2c.openSync(opts.bus)
  const display = new oled(i2cbus, opts)

  let i = 0

  display.clearDisplay()
  setInterval(() => {
    const cos = Math.cos(i)
    const p1 = [1, 64 / cos]
    const p2 = [128, 64 - 64 / cos]
    display.drawLine(...p1, ...p2, 32, 1)
    i += 0.1
  })
}
