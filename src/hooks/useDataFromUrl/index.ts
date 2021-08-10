import React from "react";

export default function useDataFromUrl<DATA>(url?: string): DATA | undefined {
  const [data, setData] = React.useState<DATA>();
  React.useEffect(() => {
    if (url)
      fetch(url)
        .then((res) => res.json())
        .then((newData) => setData(newData));
  }, [url]);

  return data;
}
