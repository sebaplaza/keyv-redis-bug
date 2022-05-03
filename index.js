import Redis from "ioredis";
import Keyv from "@keyvhq/core";
import KeyvRedis from "@keyvhq/redis";

(async () => {
  // redisUrl in localhost:6380
  const redisUrl = process.env.REDIS_URL;
  // create redis connection
  const redisConnection = new Redis(redisUrl);

  // passing the connection as parameter for keyv redis store
  // ! FAILS
  const store = new KeyvRedis(redisConnection);

  const cache = new Keyv({
    namespace: "my-namespace",
    store,
  });

  await cache.set("me", "my name");
  const value = await cache.get("me");
  console.log("my name is: ", value);

  await redisConnection.disconnect();
})();
