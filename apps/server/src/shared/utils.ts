type Without<T, U> = { [K in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

type Success<V> = [err: undefined, value: V];
type Failure = [err: Error, value: undefined];

export function tryit<T>(promise: Promise<T>): Promise<XOR<Success<T>, Failure>> {
  return promise.then(
    (value) => [void 0, value],
    (err) => [err, void 0],
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyOnlyMethodsMixins = (derivedCtor: any, constructors: any[]) => {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null),
      );
    });
  });
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
