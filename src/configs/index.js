const config = {
  app: {
    port: process.env.PORT || 3000,
    baseApi: '/api'
  },
  mongodb: {
    url: 'mongodb://localhost:27017/blog'
  },
  jwt: {
    secret: 'me' //默认
  },
  mongodbSecret: {
    //mongodb用户和密码
    user: '',
    pass: ''
  }
};

export default config;
