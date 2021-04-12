// define object with dinamic key
export type obj<T = unknown> = Record<string, T>;

// how define call back
export interface ICallback {
  (error: Error, result?: any): void;
}
