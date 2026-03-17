import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Used

export const setRedisValue = async (key, value, ttl = 3600) => {
  try {
    await redis.set(key, JSON.stringify(value), { ex: ttl });
  } catch (error) {
    console.error(`Redis set error for key ${key}:`, error);
    throw error;
  }
};

export const getRedisValue = async (key) => {
  try {
    const value = await redis.get(key);
    return value ? value : null;
  } catch (error) {
    console.error(`Redis get error for key ${key}:`, error);
    throw error;
  }
};

export default redis;
