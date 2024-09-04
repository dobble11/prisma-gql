import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { applyOnlyMethodsMixins, sleep, tryit } from '../src/shared/utils';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('safe await function', () => {
  const fn = async (flag: boolean) => {
    if (flag) {
      return { price: 10 };
    } else {
      throw Error('ooooops.');
    }
  };

  test('success', async () => {
    const [err, value] = await tryit(fn(true));
    expect(value).toEqual({ price: 10 });
    expect(err).toBeUndefined();
  });

  test('error', async () => {
    const [err, value] = await tryit(fn(false));
    expect(value).toBeUndefined();
    expect(err).not.toBeUndefined();
  });
});

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });
  const mockedFn = vi.fn();

  test('should not call beforce sleep finish', async () => {
    sleep(3000).then(() => mockedFn());
    vi.advanceTimersByTime(2000);
    await Promise.resolve();
    expect(mockedFn).not.toHaveBeenCalled();
  });

  test('should call after sleep finish', async () => {
    sleep(3000).then(() => mockedFn());
    vi.advanceTimersByTime(3200);
    await Promise.resolve();
    expect(mockedFn).toHaveBeenCalledOnce();
  });
});

describe('applyMixin', () => {
  test('succeed to merge class with property and methods', async () => {
    class A {
      ap = 'ap';
      public a() {
        return 1;
      }
    }

    class B {
      bp = 'bp';
      public b() {
        return 2;
      }
    }

    class C {
      cp = 'cp';
    }
    interface C extends A, B {}
    applyOnlyMethodsMixins(C, [A, B]);

    const client = new C();

    expect(client.a()).toBe(1);
    expect(client.b()).toBe(2);
    expect(client.ap).toBe(undefined);
    expect(client.bp).toBe(undefined);
    expect(client.cp).toBe('cp');
  });
});
