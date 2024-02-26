import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from './app.module'

test(AppModule.name, async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication()
  await app.init()
})
