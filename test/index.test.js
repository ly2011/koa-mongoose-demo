require("babel-core/register")({
  presets: ["es2015", "stage-0"]
});
require("babel-polyfill");

const request = require('supertest')
const app = require('../src/index').default

describe('#test blog app', () => {
  const server = app.listen(9090)

  describe('#test server', () => {
    before(() => {
      console.log('before')
    })
    after(() => {
      console.log('after')
    })
    beforeEach(() => {
      console.log('beforeEach')
    })
    afterEach(() => {
      console.log('afterEach')
    })
    it('#test POST user/login', async()=>{
      const res = await request(server)
      .post('/api/user/login')
      .send({
        username: 'admin',
        password: 'admin'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      const body = JSON.parse(res.text)
      console.log('body: ', body);
    })
  })
})
