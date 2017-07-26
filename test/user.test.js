require('babel-core/register')({
  presets: ['es2015', 'stage-0']
});
require('babel-polyfill');

const request = require('supertest');
const expect = require('chai').expect;
const assert = require('assert');
const app = require('../src/index').default;

describe('#test blog app', () => {
  const server = app.listen(9090);

  describe('#test server', () => {
    before(() => {
      console.log('test user before');
    });
    after(() => {
      console.log('test user after');
    });
    beforeEach(() => {});
    afterEach(() => {});

    // 测试登录
    it('#test POST user/login', async () => {
      const res = await request(server)
        .post('/api/user/login')
        .send({
          username: 'admin',
          password: 'admin'
        })
        .set('Content-Type', 'application/json') // 设置header的Content-Type为json
        .expect('Content-Type', /json/)
        .expect(200) // 断言状态码为200
        .expect(res => {
          const body = res.body;
          expect(body).to.be.an('object');
          // expect(body.message).to.be.an('string');
          // assert.equal(body.status, 401);
          // console.log(body);
        });
    });

    // 测试添加用户
    it('#test POST /user/add', async () => {
      const res = await request(server)
        .post('/api/user/add')
        .send({
          username: 'admin',
          password: 'admin'
        })
        .set('Content-Type', 'application/json') // 设置header的Content-Type为json
        .expect('Content-Type', /json/)
        .expect(200) // 断言状态码为200
        .expect(res => {
          const body = res.body;
          expect(body).to.be.an('object');
          expect(body.user).to.be.an('array');
          // console.log(body.user);
        });
    });

    // 测试获取所有用户
    it('#test GET /user/list', async () => {
      const res = await request(server)
        .get('/api/user/list')
        .set('Content-Type', 'application/json') // 设置header的Content-Type为json
        .expect('Content-Type', /json/)
        .expect(200) // 断言状态码为200
        .expect(res => {
          const body = res.body;
          expect(body).to.be.an('object');
          expect(body.list).to.be.an('array');
          // console.log(body.user);
        });
    });
  });
});
