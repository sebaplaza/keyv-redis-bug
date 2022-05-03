# keyv-redis-bug

This project shows a problem with [@keyvhq/redis](https://github.com/jaredwray/keyv/tree/main/packages/redis) library.

When we are passing a redis instance as a store for keyv, the instance is not recognized if is not exactly the same version included in @keyvhq/redis dependencies.

## Why

The internal code is using `instanceof` to validate the redis connection, but using the local version of `ioredis`.

<https://github.com/jaredwray/keyv/blob/main/packages/redis/src/index.js#L11>

## How to test this

```sh
# start a redis server instance listening in port 6380
docker-compose up
```

```sh
# launch script
npm run start
````

you will see that the @keyvhq/redis library try to connect to default uri (`redis://localhost:6379`)

even if our instance passed in the constructor is using the right uri (`redis://localhost:6380`)

```sh
➜ npm start

> keyv-redis-bug@1.0.0 start
> REDIS_URL=redis://localhost:6380 node index.js

node:events:368
      throw er; // Unhandled 'error' event
      ^

Error: connect ECONNREFUSED 127.0.0.1:6379
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1161:16)
Emitted 'error' event on Keyv instance at:
    at KeyvRedis.<anonymous> (/home/plaza-s/dev/perso/ioredis-poc/node_modules/@keyvhq/core/src/index.js:26:14)
    at KeyvRedis.emit (node:events:390:28)
    at EventEmitter.<anonymous> (/home/plaza-s/dev/perso/ioredis-poc/node_modules/@keyvhq/redis/src/index.js:25:44)
    at EventEmitter.emit (node:events:390:28)
    at EventEmitter.silentEmit (/home/plaza-s/dev/perso/ioredis-poc/node_modules/@keyvhq/redis/node_modules/ioredis/built/Redis.js:447:30)
    at Socket.<anonymous> (/home/plaza-s/dev/perso/ioredis-poc/node_modules/@keyvhq/redis/node_modules/ioredis/built/redis/event_handler.js:189:14)
    at Object.onceWrapper (node:events:510:26)
    at Socket.emit (node:events:402:35)
    at emitErrorNT (node:internal/streams/destroy:157:8)
    at emitErrorCloseNT (node:internal/streams/destroy:122:3) {
  errno: -111,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 6379
}
```
