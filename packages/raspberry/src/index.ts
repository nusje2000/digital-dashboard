import i2c from 'i2c-bus'

export function testI2C() {
  console.log(i2c.openSync(1))
}
