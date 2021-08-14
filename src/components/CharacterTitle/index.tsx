import {
  Box,
  createStyles,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Character } from "../../redux/characters";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import StatusIcon from "./StatusIcon";

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      display: "inline-block",
      verticalAlign: "middle",
    },
    statusIcon: {
      display: "inline-block",
      verticalAlign: "middle",
      fontSize: 15,
      marginLeft: theme.spacing(1),
    },
    statusIconAlive: {
      color: green[500],
    },
    statusIconDead: {
      color: red[500],
    },
  })
);

interface CharacterTitleProps
  extends Pick<Character, "name" | "species" | "status" | "gender"> {}

export default function CharacterTitle({
  name,
  species,
  status,
  gender,
}: CharacterTitleProps) {
  const classes = useStyles();
  return (
    <>
      <Box>
        <Typography variant="h6" component="h2" className={classes.title}>
          {name}
        </Typography>
        <Tooltip title={`Status: ${status}`}>
          <Box component="span">
            <StatusIcon status={status} />
          </Box>
        </Tooltip>
      </Box>
      <Typography gutterBottom variant="caption" component="h2">
        {species} - {gender}
      </Typography>
    </>
  );
}
