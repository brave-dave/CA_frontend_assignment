import { render } from "@testing-library/react";

type Hook<ARGS extends any[], RETURN> = (...args: ARGS) => RETURN;

export function testHook<ARGS extends any[], RETURN>(
  hook: Hook<ARGS, RETURN>,
  ...hookArgs: ARGS
) {
  let returnValue: RETURN | Error = new Error(
    "Hook has not yet been initialized"
  );

  const Component = () => {
    returnValue = hook(...hookArgs);
    return null;
  };

  return new Promise<() => RETURN>((resolve) => {
    render(<Component />);

    setTimeout(() => {
      resolve(() => {
        if (returnValue instanceof Error) throw returnValue;
        return returnValue;
      });
    });
  });
}
