import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { CreateProductDto, EditProductDto } from '../src/product/dto';
import { inspect } from 'util';
import { CreateShopDto, EditShopDto } from '../src/shop/dto';
import { CreateOfferDto, EditOfferDto } from '../src/offer/dto';

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
      const dto: EditProductDto = {
        url: 'https://chillout.no/products/jetboil-zip',
        pricespyId: 865244
      };
      it('Should edit a product', () => {
        return pactum
          .spec()
          .patch('/products/{productUrl}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withPathParams('productUrl', encodedUri)
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.pricespyId)
          .expectBodyContains(dto.url);
      });
    });

    describe('Delete product', () => {
      const updatedEncodedUri = encodeURIComponent(
        'https://chillout.no/products/jetboil-zip'
      );

      it('Should delete a product', () => {
        return pactum
          .spec()
          .delete('/products/{productUrl}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withPathParams('productUrl', updatedEncodedUri)
          .expectStatus(204);
      });
      it('Should get empty product', () => {
        return pactum
          .spec()
          .get('/products')
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });

  describe('Shop', () => {
    const rootDomain = 'testshop.no';

    describe('Get empty shops', () => {
      it('Should get empty shops array', () => {
        return pactum.spec().get('/shops').expectStatus(200).expectBody([]);
      });
    });

    describe('Create shop', () => {
      const dto: CreateShopDto = {
        pricespyId: 12345678,
        name: 'Test Shop',
        companyName: 'Test Shop AS',
        rootDomain: 'testshop.no',
        logo176: 'testshop.no/image176',
        logo88: 'testshop.no/image88',
        favicon: 'testshop.no/favicon',
        externalUri: 'prisjakt.no/externalUri',
        information: 'Denne butikken er super til å teste med.',
        countryCode: 'no',
        market: 'no',
        currency: 'NOK',
        importance: 1,
        storeLocationCount: 123
      };
      it('should create shop', () => {
        return pactum
          .spec()
          .post('/shops')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(201)
          .stores('rootDomain', 'rootDomain');
      });
      it('Should throw if same root domain is added', () => {
        return pactum
          .spec()
          .post('/shops')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(403);
      });
      it('Should throw if same root domain is added', () => {
        return pactum
          .spec()
          .post('/shops')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody({ name: 'New Shop', rootDomain: 'newshop.no' })
          .expectStatus(201);
      });

      describe('Get shops', () => {
        it('Should get shops array with length of one', () => {
          return pactum
            .spec()
            .get('/shops')
            .expectStatus(200)
            .expectJsonLength(2);
        });
      });
    });

    describe('Get shop by root domain', () => {
      it('Should get shops array', () => {
        return pactum
          .spec()
          .get('/shops/{rootDomain}')
          .withPathParams('rootDomain', rootDomain)
          .expectStatus(200)
          .expectBodyContains('testshop.no');
      });
    });

    describe('Edit shop by root domain', () => {
      const dto: EditShopDto = {
        name: 'Test Shop Better',
        pricespyId: 865244
      };
      it('Should edit a shop', () => {
        return pactum
          .spec()
          .patch('/shops/{shopRootDomain}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withPathParams('shopRootDomain', rootDomain)
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.name)
          .expectBodyContains(dto.pricespyId);
      });
    });

    describe('Delete shop', () => {
      const updatedEncodedUri = encodeURIComponent('testshop.no');

      it('Should delete a product', () => {
        return pactum
          .spec()
          .delete('/shops/{shopRootDomain}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withPathParams('shopRootDomain', updatedEncodedUri)
          .expectStatus(204);
      });
      it('Should get empty shops', () => {
        return pactum
          .spec()
          .get('/shops')
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });
  });

  describe('Offer', () => {
    const rootDomain = 'newshop.no';

    describe('Get empty offers', () => {
      it('Should get empty offers array', () => {
        return pactum.spec().get('/offers').expectStatus(200).expectBody([]);
      });
    });

    describe('Create offer', () => {
      const dto: CreateOfferDto = {
        rootDomain: 'newshop.no',
        type: 'coupon',
        amount: 100,
        amountType: '%'
      };
      it('should create offer', () => {
        return pactum
          .spec()
          .post('/offers')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .stores('offerId', 'id')
          .expectStatus(201);
      });
      it('Should throw if not correct data is provided', () => {
        return pactum
          .spec()
          .post('/offers')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody({})
          .expectStatus(400);
      });
      it('Should create new offer', () => {
        return pactum
          .spec()
          .post('/offers')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody({
            rootDomain: 'newshop.no',
            type: 'coupon',
            amount: 50,
            amountType: '%'
          })
          .expectStatus(201);
      });

      describe('Get offers', () => {
        it('Should get offers array with length of two', () => {
          return pactum
            .spec()
            .get('/offers')
            .expectStatus(200)
            .expectJsonLength(2);
        });
      });
    });

    describe('Get offers by root domain', () => {
      it('Should get offers array', () => {
        return pactum
          .spec()
          .get('/offers/{rootDomain}')
          .withPathParams('rootDomain', rootDomain)
          .expectStatus(200)
          .expectBodyContains('newshop.no')
          .expectJsonLength(2);
      });
    });

    describe('Edit offer by id', () => {
      const dto: EditOfferDto = {
        page: 'newshop.no/super-offer',
        terms: 'Only for today',
        amount: 59,
        feedbackNegative: 2,
        lastVerified: new Date(2022, 6, 20, 13, 42)
      };
      it('Should edit a shop', () => {
        return pactum
          .spec()
          .patch('/offers/{offerId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withPathParams('offerId', '$S{offerId}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.page)
          .expectBodyContains(dto.feedbackNegative)
          .inspect();
      });
    });

    describe('Delete offer', () => {
      it('Should delete an offer by id', () => {
        return pactum
          .spec()
          .delete('/offers/{offerId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withPathParams('offerId', '$S{offerId}')
          .expectStatus(204);
      });
      it('Should get offers with one element', () => {
        return pactum
          .spec()
          .get('/offers')
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });
  });
});
