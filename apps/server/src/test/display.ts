import { SSD1306Display } from '@nusje2000/display-driver'

console.log('Creating display...')
const display = new SSD1306Display({
  address: 0x3c,
  width: 128,
  height: 64,
})
console.log('Created display!')

display.draw.clear()

console.log('Drawing pixels...')
display.draw.pixel([[[2, 0]], [[0, 0]], [[0, 2]]])
display.draw.pixel([[[127, 63]], [[125, 63]], [[127, 61]]])
console.log('Drawing text...')
display.draw.text([10, 10], 7, 'Hello World')
display.draw.text([17, 17], 14, 'Hello World')
display.draw.text([31, 31], 21, 'Hello World')
console.log('Done!')
