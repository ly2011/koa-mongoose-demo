# demo

## 使用

### 安装

```bash

npm install

```

### 运行

```bash

npm run dev

```

## 访问

```bash

http://localhost:3000/api/user/login

```

## 参考文档：
1. http://blog.csdn.net/hellochenlu/article/details/50467563
2. https://github.com/BUPT-HJM/vue-blog

## 踩坑

- 升级到 mongoose >= 4.11.0 `mongoose.createConnection` 导致数据库插入不成功，读取不成功，数据库被挂起

解决方案：使用 `mongoose.connect` 连接

[https://segmentfault.com/q/1010000010061553?_ea=2156215](https://segmentfault.com/q/1010000010061553?_ea=2156215)

