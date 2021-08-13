type MapFunction<R> = (index: number) => R;

export default function createArray<R>(
  length: number,
  mapFunction: MapFunction<R>
) {
  return Array.from(new Array(length), (_, index) => mapFunction(index));
}
