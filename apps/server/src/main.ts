import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { testI2C } from '@nusje2000/raspberry-api'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  testI2C()
  await app.listen(3000)
}
bootstrap()
