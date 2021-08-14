export type MappedList<I> = {
  [K: number]: I | undefined;
};

type RequiredAndVoidProps<A extends {}, B extends {}> = {
  [K in keyof A]: A[K];
} &
  {
    [K in Exclude<keyof B, keyof A>]?: B[K];
  };
export type ConditionalObject<A extends {}, B extends {}> =
  | RequiredAndVoidProps<A, B>
  | RequiredAndVoidProps<B, A>;
