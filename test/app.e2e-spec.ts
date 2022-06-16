import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import {
  ConsoleLogger,
  INestApplication,
  ValidationPipe
} from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    );

    await app.init();
    await app.listen(3333);

    prisma = await app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'pixell@admin.co',
      password: 'veryStrongPassword'
    };

    describe('Signup', () => {
      it('Should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
      it('Should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('Should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('Should throw if body is empty', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('Should throw if email is not an email', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.password })
          .expectStatus(400);
      });
    });

    describe('Signin', () => {
      it('Should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
      it('Should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('Should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('Should throw if body is empty', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('Should throw if email is not an email', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.password })
          .expectStatus(400);
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('Should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {});
  });

  describe('Offer', () => {
    describe('Create offer', () => {});
    describe('Get offers', () => {});
    describe('Get offer by id', () => {});
    describe('Delete offer', () => {});
  });

  describe('Product', () => {
    describe('Create product', () => {});
    describe('Get product', () => {});
    describe('Get product by id', () => {});
    describe('Delete product', () => {});
  });
});
