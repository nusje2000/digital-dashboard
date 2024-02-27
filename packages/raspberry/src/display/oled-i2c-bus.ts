import { I2CBus } from 'i2c-bus'
import * as driver from 'oled-i2c-bus'
import * as font from 'oled-font-5x7'

export type DriverConfig = {
  width: number
  height: number
  address: number
  driver: 'SSD1306'
}

export type Color = 0 | 1 | 'WHITE' | 'BLACK'

export interface OledDriver {
  clearDisplay(): void
  dimDisplay(dim: boolean): void
  invertDisplay(invert: boolean): void
  turnOffDisplay(): void
  turnOnDisplay(): void
  drawPixel(pixels: [number, number, Color][]): void
  drawLine(x0: number, y0: number, x1: number, y1: number, color: Color): void
  fillRect(x0: number, y0: number, x1: number, y1: number, color: Color): void
  writeString(
    font: unknown,
    size: number,
    text: string,
    color: Color,
    wrap: boolean,
  ): void
  setCursor(x: number, y: number): void
}

export function defaultFont(): unknown {
  return font
}

export function createDriver(
  bus: I2CBus,
  { width, height, address }: DriverConfig,
): OledDriver {
  return new driver(bus, {
    width,
    height,
    address,
    driver: 'SSD1306',
  })
}
