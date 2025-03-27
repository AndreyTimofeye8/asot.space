import { Injectable } from '@nestjs/common';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';

@Injectable()
export class CacheService {
  private keyv: Keyv;
  private keys: Set<string> = new Set();

  constructor() {
    this.keyv = new Keyv({
      store: new KeyvRedis(
        `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      ),
      namespace: '',
    });
  }

  async get<T>(key: string): Promise<T | null> {
    return this.keyv.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.keyv.set(key, value, ttl);
    this.keys.add(key);
    console.log(this.keys);
  }

  async del(key: string): Promise<void> {
    await this.keyv.delete(key);
    this.keys.delete(key);
  }

  async delKeysWithPrefix(prefix: string): Promise<void> {
    const keysToDelete = Array.from(this.keys).filter((key) =>
      key.startsWith(prefix),
    );

    console.log(keysToDelete);

    for (const key of keysToDelete) {
      await this.del(key);
    }
  }
}
