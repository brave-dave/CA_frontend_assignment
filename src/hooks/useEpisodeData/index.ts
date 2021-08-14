import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Episode, fetchEpisode, selectEpisodes } from "../../redux/episodes";
type UseEpisodeDataConfig = { id: number };

export default function useEpisodeData({ id }: UseEpisodeDataConfig): Episode {
  const dispatch = useDispatch();
  const episodes = useSelector(selectEpisodes);

  const episode: Episode = React.useMemo(
    () => episodes[id] || { id, isFetching: true },
    [episodes, id]
  );
  React.useEffect(() => {
    dispatch(fetchEpisode(id));
  }, [id, dispatch]);

  return episode;
}
