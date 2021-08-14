import { Character } from "../../redux/characters";
import { createStyles, makeStyles } from "@material-ui/core";
import FullCircleIcon from "@material-ui/icons/FiberManualRecord";
import BorderedCircleIcon from "@material-ui/icons/RadioButtonUnchecked";
import { green, grey } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import classnames from "classnames";

const useStyles = makeStyles((theme) =>
  createStyles({
    statusIcon: {
      display: "inline-block",
      verticalAlign: "middle",
      marginLeft: theme.spacing(0.5),
    },
    statusIconAlive: {
      color: green[500],
      fontSize: 15,
    },
    statusIconDead: {
      color: red[500],
      fontSize: 15,
    },
    statusIconUnknown: {
      color: grey[500],
      fontSize: 12,
    },
  })
);

type StatusIconProps = Pick<Character, "status">;

export default function StatusIcon({ status }: StatusIconProps) {
  const classes = useStyles();

  switch (status) {
    case "Alive":
      return (
        <FullCircleIcon
          className={classnames(classes.statusIcon, classes.statusIconAlive)}
        />
      );
    case "Dead":
      return (
        <FullCircleIcon
          className={classnames(classes.statusIcon, classes.statusIconDead)}
        />
      );
    default:
      return (
        <BorderedCircleIcon
          className={classnames(classes.statusIcon, classes.statusIconUnknown)}
        />
      );
  }
}
