import React from "react";

export default async function useEffectOnce(callback: React.EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(callback, []);
}
