import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { CreateProductDto } from 'src/product/dto';

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
      it('Should throw if invalid bearer token', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer randomnontoken' })
          .expectStatus(401);
      });
      it('Should throw if no bearer token', () => {
        return pactum.spec().get('/users/me').expectStatus(401);
      });
    });

    describe('Edit user', () => {
      const dto: EditUserDto = { firstName: 'Pixell', lastName: 'AS' };

      it('Should edit user', () => {
        return pactum
          .spec()
          .patch('/users')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName);
      });
      it('Should throw if invalid bearer token', () => {
        return pactum
          .spec()
          .patch('/users')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer randomtoken' })
          .expectStatus(401);
      });
      it('Should throw if no bearer token', () => {
        return pactum.spec().patch('/users').withBody(dto).expectStatus(401);
      });
    });
  });

  describe('Product', () => {
    const encodedUri = encodeURIComponent(
      'https://eplehuset.no/iphone-13-128gb-bla'
    );

    describe('Get empty products', () => {
      it('Should get empty products array', () => {
        return pactum.spec().get('/products').expectStatus(200).expectBody([]);
      });
    });

    describe('Create product', () => {
      it('should create product', () => {
        const dto: CreateProductDto = {
          url: 'https://eplehuset.no/iphone-13-128gb-bla',
          pricespyId: 5683804
        };

        return pactum
          .spec()
          .post('/products')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(201)
          .stores('productUrl', 'url');
      });

      describe('Get products', () => {
        it('Should get empty products array', () => {
          return pactum
            .spec()
            .get('/products')
            .expectStatus(200)
            .expectJsonLength(1);
        });
      });
    });

    describe('Get product by url', () => {
      const encodedUri = encodeURIComponent(
        'https://eplehuset.no/iphone-13-128gb-bla'
      );

      it('Should get products array', () => {
        return pactum
          .spec()
          .get('/products/{productUrl}')
          .withPathParams('productUrl', encodedUri)
          .expectStatus(200)
          .expectBodyContains('https://eplehuset.no/iphone-13-128gb-bla');
      });
    });

    describe('Edit product by id', () => {
      it('Should edit a product', () => {
        return pactum
          .spec()
          .patch('/products/{productUrl}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withPathParams('productUrl', encodedUri)
          .expectStatus(200)
          .expectBodyContains('https://eplehuset.no/iphone-13-128gb-bla');
      });
    });

    describe('Delete product', () => {});
  });

  describe('Offer', () => {
    describe('Create offer', () => {});

    describe('Get offers', () => {});

    describe('Get offer by id', () => {});

    describe('Delete offer', () => {});
  });
});
