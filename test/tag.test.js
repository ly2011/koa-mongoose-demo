require('babel-core/register')({
  presets: ['es2015', 'stage-0']
});
require('babel-polyfill');

const request = require('supertest');
const expect = require('chai').expect;
const assert = require('assert');
const app = require('../src/index').default;

describe('#test blog app', () => {
  const server = app.listen(9091);

  describe('#test tag server', () => {
    before(() => {
      console.log('test tag before');
    });
    after(() => {
      console.log('test tag after');
    });
    beforeEach(() => {});
    afterEach(() => {});

    // 测试添加
    it.only('#test POST tag/add', async () => {
      const res = await request(server)
        .post('/api/tag/add')
        .send({
          name: '音乐'
        })
        .set('Content-Type', 'application/json') // 设置header的Content-Type为json
        .expect('Content-Type', /json/)
        .expect(200) // 断言状态码为200
        .expect(res => {
          const body = res.body;
          expect(body).to.be.an('object');
          console.log(body);
        });
    });

    it.only('#test GET tag/list', async () => {
      const res = await request(server)
        .get('/api/tag/list')
        .set('Content-Type', 'application/json') // 设置header的Content-Type为json
        .expect('Content-Type', /json/)
        .expect(200) // 断言状态码为200
        .expect(res => {
          const body = res.body;
          expect(body).to.be.an('object');
          console.log(body);
        });
    });
    it.skip('#test POST tag/delete_by_name', async () => {
      const res = await request(server)
        .post('/api/tag/delete_by_name')
        .send({
          name: '音乐'
        })
        .set('Content-Type', 'application/json') // 设置header的Content-Type为json
        .expect('Content-Type', /json/)
        .expect(200) // 断言状态码为200
        .expect(res => {
          const body = res.body;
          expect(body).to.be.an('object');
        });
    });
  });
});
