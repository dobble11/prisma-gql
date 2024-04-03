type Without<T, U> = { [K in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

type Success<V> = {
  result: V;
};
type Failure = {
  err: Error;
};

export function fa<T>(promise: Promise<T>): Promise<XOR<Success<T>, Failure>> {
  return promise.then(
    (val) => ({ result: val, err: void 0 }),
    (err) => {
      return { result: void 0, err };
    },
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
