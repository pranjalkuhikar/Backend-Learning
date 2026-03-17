# 🚀 Learning Redis with @upstash/redis

Welcome to the Redis learning module! This guide will help you understand how to use Redis in a Node.js environment using the `@upstash/redis` client.

## 📌 What is Redis?

**Redis** (Remote Dictionary Server) is an open-source, in-memory data structure store. It is used as a database, cache, message broker, and streaming engine. Unlike traditional databases that store data on disk, Redis keeps everything in RAM, making it incredibly fast.

### Key Characteristics:
- **In-Memory:** Blazing fast read/write operations.
- **Data Structures:** Supports strings, hashes, lists, sets, sorted sets, etc.
- **Persistence:** Can optionally save data to disk.
- **Atomic Operations:** All operations are atomic, ensuring data consistency.

---

## 🛠 Setup & Configuration

This project uses **Upstash Redis**, which provides a Serverless Redis instance accessible via HTTP.

### 1. Environment Variables
Create a `.env` file in the root of the `028-redis` directory (or ensure these are in your system environment):

```env
UPSTASH_REDIS_REST_URL="your_upstash_url"
UPSTASH_REDIS_REST_TOKEN="your_upstash_token"
```

### 2. Connection Logic
The connection is initialized in [utils/redis.js](file:///Users/pranjalkuhikar/Desktop/Backend-Learning/028-redis/utils/redis.js):

```javascript
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
```

---

## 🚀 Using the Helper Methods

We have implemented convenient helper methods to handle common Redis operations.

### Setting a Value
Use `setRedisValue` to store data. It automatically stringifies objects and sets a default TTL (Time To Live).

```javascript
import { setRedisValue } from './utils/redis.js';

const userData = { id: 1, name: 'John Doe' };
await setRedisValue('user:1', userData, 3600); // Stores for 1 hour (3600s)
```

### Getting a Value
Use `getRedisValue` to retrieve data. It automatically parses the JSON string back into an object.

```javascript
import { getRedisValue } from './utils/redis.js';

const user = await getRedisValue('user:1');
console.log(user.name); // 'John Doe'
```

---

## 💡 Practical Use Cases

1. **Caching:** Store expensive database query results or API responses to speed up subsequent requests.
2. **Session Management:** Store user session data for fast access and automatic expiration.
3. **Rate Limiting:** Track the number of requests a user makes in a specific timeframe.
4. **Real-time Analytics:** Simple counters (e.g., page views) using `redis.incr()`.

---

## 📚 Further Learning

- [Upstash Redis Documentation](https://upstash.com/docs/redis/overall/getstarted)
- [Official Redis Documentation](https://redis.io/documentation)
- [Redis Commands Reference](https://redis.io/commands)

Happy Coding! 🏎💨
