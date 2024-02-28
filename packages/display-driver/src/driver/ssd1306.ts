import { I2CBus, openSync } from 'i2c-bus'
import { OledDriver, createDriver, defaultFont } from '../oled-i2c-bus'
import { Canvas, Color, Coordinate, Display, Pixel, Size } from '../display'

export type SSD1306Config = {
  width: number
  height: number
  address: number
  bus?: number
}

export class SSD1306Canvas implements Canvas {
  constructor(private readonly display: OledDriver) {}

  clear(): void {
    this.display.clearDisplay()
  }

  pixel(pixels: Pixel[]): void {
    this.display.drawPixel(
      pixels.map(([coord, color]) => [
        ...this.parseCoord(coord),
        color ?? Color.WHITE,
      ]),
    )
  }

  line(from: Coordinate, to: Coordinate, color: Color = Color.WHITE): void {
    this.display.drawLine(
      ...this.parseCoord(from),
      ...this.parseCoord(to),
      color,
    )
  }

  rect(coord: Coordinate, size: Size, color: Color = Color.WHITE): void {
    const [x, y] = this.parseCoord(coord)
    const [width, height] = this.parseSize(size)

    this.display.fillRect(x, y, x + width, y + height, color)
  }

  text(
    coord: Coordinate,
    height: number,
    text: string,
    color?: Color | undefined,
  ): void {
    this.display.setCursor(...this.parseCoord(coord))
    this.display.writeString(
      defaultFont(),
      Math.ceil(height / 7),
      text,
      color ?? Color.WHITE,
      false,
    )
  }

  private parseCoord(coord: Coordinate): [number, number] {
    if (Array.isArray(coord)) {
      return coord
    }

    return [coord.x, coord.y]
  }

  private parseSize(size: Size): [number, number] {
    if (Array.isArray(size)) {
      return size
    }

    return [size.w, size.h]
  }
}

export class SSD1306Display implements Display {
  public readonly width: number
  public readonly height: number
  private readonly i2c: I2CBus
  private readonly oled: OledDriver
  private readonly canvas: SSD1306Canvas

  constructor({ width, height, address, bus }: SSD1306Config) {
    this.width = width
    this.height = height

    this.i2c = openSync(bus ?? 1)
    this.oled = createDriver(this.i2c, {
      width,
      height,
      address,
      driver: 'SSD1306',
    })

    this.canvas = new SSD1306Canvas(this.oled)
  }

  dim(dimmed: boolean): void {
    this.oled.dimDisplay(dimmed)
  }

  invert(invert: boolean): void {
    this.oled.invertDisplay(invert)
  }

  turnOn(): void {
    this.oled.turnOnDisplay()
  }

  turnOff(): void {
    this.oled.turnOffDisplay()
  }

  get draw(): Canvas {
    return this.canvas
  }
}
