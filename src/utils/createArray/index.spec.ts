import createArray from ".";

describe("utils/createArray", () => {
  const mapFunction = (i: number) => i;

  it("should create an array", () => {
    const value = createArray(1, mapFunction);
    expect(Array.isArray(value)).toBeTruthy();
  });

  it("should create an array of the right length", () => {
    const length = 5;
    const value = createArray(length, mapFunction);
    expect(value.length).toBe(length);
  });

  it("should have the items mapped by the mapFunction", () => {
    const length = 5;
    const value = createArray(length, mapFunction);
    const expectedArray = [0, 1, 2, 3, 4];

    expect(value).toEqual(expectedArray);
  });
});
