import React from "react";
import useEffectOnce from "../useEffectOnce";

export default function useDataFromUrl<DATA>(url: string): DATA | undefined {
  const [data, setData] = React.useState<DATA>();
  useEffectOnce(() => {
    fetch(url)
      .then((res) => res.json())
      .then((newData) => setData(newData));
  });

  return data;
}
