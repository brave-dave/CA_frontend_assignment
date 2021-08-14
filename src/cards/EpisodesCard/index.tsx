import { createStyles, ListItem, makeStyles } from "@material-ui/core";
import CharacterContentCard from "../CharacterContentCard";
import VideocamIcon from "@material-ui/icons/Videocam";
import React from "react";
import useEpisodeData from "../../hooks/useEpisodeData";
import { FixedSizeList, ListChildComponentProps } from "react-window";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      flexDirection: "column",
      justifyContent: "start",
      padding: 0,
      width: "100%",
    },
    episodeName: {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    list: {
      padding: 0,
    },
  })
);

interface EpisodeNameProps {
  id: number;
}

function EpisodeName({ id }: EpisodeNameProps) {
  const classes = useStyles();
  const { isFetching, isNotFound, name } = useEpisodeData({ id });

  if (isFetching || isNotFound) return null;

  return <div className={classes.episodeName}>{name}</div>;
}

interface EpisodesCardProps {
  episodes: ReadonlyArray<number>;
}

export default function EpisodesCard({ episodes }: EpisodesCardProps) {
  const classes = useStyles();

  const rowRenderer = React.useCallback<
    React.FunctionComponent<ListChildComponentProps>
  >(
    ({ index, style }) => {
      const id = episodes[index];
      return (
        <ListItem button style={style} key={index}>
          <EpisodeName key={`${index}-${id}`} id={id} />
        </ListItem>
      );
    },
    [episodes]
  );

  return (
    <CharacterContentCard
      className={classes.card}
      title="Episodes"
      icon={VideocamIcon}
    >
      <FixedSizeList
        height={Math.min(150, episodes.length * 36)}
        width="100%"
        itemSize={36}
        itemCount={episodes.length}
        className={classes.list}
      >
        {rowRenderer}
      </FixedSizeList>
    </CharacterContentCard>
  );
}
