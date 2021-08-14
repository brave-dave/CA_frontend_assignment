import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocation,
  Location,
  selectLocations,
} from "../../redux/locations";

type UseLocationDataConfig = { id: number };

export default function useLocationData({
  id,
}: UseLocationDataConfig): Location {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);

  const location: Location = React.useMemo(
    () => locations[id] || { id, isFetching: true },
    [locations, id]
  );
  React.useEffect(() => {
    dispatch(fetchLocation(id));
  }, [id, dispatch]);

  return location;
}
