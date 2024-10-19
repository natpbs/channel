interface Channel<T = unknown> {
  send(value: T): void;
  receive(): Promise<T>;
  reject(error: unknown): void;
}
export const createChannel: <T>() => Channel<T>;
