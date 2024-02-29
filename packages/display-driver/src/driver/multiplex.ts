import { I2CBus } from 'i2c-bus'
import { Canvas, Color, Coordinate, Display, Pixel, Size } from '../display'

export interface Multiplexer {
  switchTo(channel: number): void
}

export class TCA9548AMultiplexer implements Multiplexer {
  private selected = -1

  constructor(private readonly bus: I2CBus, private readonly address: number) {}

  switchTo(channel: number) {
    if (this.selected !== channel) {
      console.log(`Switching to channel ${channel}, was ${this.selected}`)
      this.bus.writeByteSync(this.address, 0x04, 1 << channel)
      this.selected = channel
    }
  }
}

export class MultiplexedCanvas implements Canvas {
  constructor(
    private readonly multiplexer: Multiplexer,
    private readonly channel: number,
    private readonly canvas: Canvas,
  ) {}

  clear(): void {
    this.setChannel()
    this.canvas.clear()
  }

  pixel(pixels: Pixel[]): void {
    this.setChannel()
    this.canvas.pixel(pixels)
  }

  line(from: Coordinate, to: Coordinate, color?: Color | undefined): void {
    this.setChannel()
    this.canvas.line(from, to, color)
  }

  rect(coord: Coordinate, size: Size, color?: Color | undefined): void {
    this.setChannel()
    this.canvas.rect(coord, size, color)
  }

  text(
    coord: Coordinate,
    height: number,
    text: string,
    color?: Color | undefined,
  ): void {
    this.setChannel()
    this.canvas.text(coord, height, text, color)
  }

  private setChannel() {
    this.multiplexer.switchTo(this.channel)
  }
}

export class MultiplexedDisplay implements Display {
  private readonly display: Display
  constructor(
    private readonly multiplexer: Multiplexer,
    private readonly channel: number,
    display: () => Display,
  ) {
    this.setChannel()

    this.display = display()
  }

  get width(): number {
    return this.display.width
  }

  get height(): number {
    return this.display.height
  }

  dim(dimmed: boolean): void {
    this.setChannel()

    return this.display.dim(dimmed)
  }

  invert(invert: boolean): void {
    this.setChannel()

    return this.display.invert(invert)
  }

  turnOn(): void {
    this.setChannel()

    return this.display.turnOn()
  }

  turnOff(): void {
    this.setChannel()

    return this.display.turnOff()
  }

  get draw(): Canvas {
    this.setChannel()

    return this.display.draw
  }

  private setChannel() {
    this.multiplexer.switchTo(this.channel)
  }
}
