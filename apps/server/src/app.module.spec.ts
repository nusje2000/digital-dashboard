import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from './app.module'

describe(AppModule.name, () => {
  it('should be able to boot', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    const app = moduleFixture.createNestApplication()
    await app.init()
  })
})
