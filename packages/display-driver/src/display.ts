export enum Color {
  BLACK = 0,
  WHITE = 1,
}

export interface Display {
  get width(): number
  get height(): number

  dim(dimmed: boolean): void
  invert(invert: boolean): void

  turnOn(): void
  turnOff(): void

  get draw(): Canvas
}

export type Pixel = [Coordinate] | [Coordinate, Color]
export type Coordinate = [number, number] | { x: number; y: number }
export type Size = [number, number] | { w: number; h: number }

export interface Canvas {
  clear(): void
  pixel(pixels: Pixel[]): void
  line(from: Coordinate, to: Coordinate, color?: Color): void
  rect(coord: Coordinate, size: Size, color?: Color): void
  text(coord: Coordinate, height: number, text: string, color?: Color): void
}
