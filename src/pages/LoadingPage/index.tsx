import { CircularProgress, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    circularProgress: {
      color: theme.palette.text.primary,
      margin: `${theme.spacing(2)}px auto`,
    },
  })
);

export default function LoadingPage() {
  const classes = useStyles();
  return (
    <CircularProgress
      className={classes.circularProgress}
      disableShrink
      size={50}
    />
  );
}
