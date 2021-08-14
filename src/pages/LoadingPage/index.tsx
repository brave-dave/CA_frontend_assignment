import { createStyles, makeStyles } from "@material-ui/core";
import LoadingCircle from "../../components/LoadingCircle";

const useStyles = makeStyles((theme) =>
  createStyles({
    loadingCircle: {
      margin: `${theme.spacing(2)}px auto`,
      display: "flex",
    },
  })
);

export default function LoadingPage() {
  const classes = useStyles();
  return <LoadingCircle className={classes.loadingCircle} />;
}
