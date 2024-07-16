import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { tryit, getReactQueryFetchParams, sleep } from '../src/shared/utils';

afterEach(() => {
  localStorage.clear();
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

describe('get fetch query params', () => {
  it('get params', () => {
    const target = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: '',
      },
      mode: 'cors',
      credentials: 'include',
    };
    const param = getReactQueryFetchParams();
    expect(param).toEqual(target);
  });
});
