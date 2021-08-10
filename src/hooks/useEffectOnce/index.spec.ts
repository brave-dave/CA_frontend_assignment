import React from "react";
import useEffectOnce from ".";
import { testHook } from "../../testsUtils";

describe("hooks/useEffectOnce", () => {
  it("should call `React.useEffect` with the callback provided", () => {
    const callback = jest.fn();
    const useEffectSpy = jest.spyOn(React, "useEffect");
    testHook(useEffectOnce, callback);

    expect(useEffectSpy.mock.calls[0][0]).toEqual(callback);
  });

  it("should call `React.useEffect` with an empty dependency array", () => {
    const callback = jest.fn();
    const useEffectSpy = jest.spyOn(React, "useEffect");
    testHook(useEffectOnce, callback);

    expect(useEffectSpy.mock.calls[0][1]).toEqual([]);
  });
});
