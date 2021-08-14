import {
  CircularProgress,
  CircularProgressProps,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import classnames from "classnames";

const useStyles = makeStyles((theme) =>
  createStyles({
    circularProgress: {
      color: theme.palette.text.primary,
      margin: `${theme.spacing(2)}px auto`,
    },
  })
);

interface LoadingCircleProps extends CircularProgressProps {}

export default function LoadingCircle({
  className,
  ...customProps
}: LoadingCircleProps) {
  const classes = useStyles();
  return (
    <CircularProgress
      className={classnames(className, classes.circularProgress)}
      disableShrink
      size={50}
      {...customProps}
    />
  );
}
