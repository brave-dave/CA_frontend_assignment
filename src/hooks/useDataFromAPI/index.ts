import React from "react";
import useEffectOnce from "../useEffectOnce";

export default function useDataFromAPI<DATA>(path: string): DATA | undefined {
  const [data, setData] = React.useState<DATA>();
  useEffectOnce(() => {
    fetch(`https://rickandmortyapi.com${path}`)
      .then((res) => res.json())
      .then((newData) => setData(newData));
  });

  return data;
}
