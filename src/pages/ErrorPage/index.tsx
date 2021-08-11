import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import ButtonLink from "../../components/ButtonLink";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  flexItem: {
    padding: `${theme.spacing(1)}px 0`,
  },
  icon: {
    fontSize: 225,
    color: theme.palette.primary.main,
  },
}));

export default function ErrorPage() {
  const classes = useStyles();

  return (
    <Box className={classes.flexContainer}>
      <Box className={classes.flexItem}>
        <SentimentDissatisfiedIcon className={classes.icon} />
      </Box>
      <Box className={classes.flexItem}>
        <Typography variant="h5" component="h1">
          Sorry, but the page you were looking for is not here.
        </Typography>
      </Box>
      <Box className={classes.flexItem}>
        <ButtonLink to={"/"} variant="contained" size="large" color="primary">
          Homepage
        </ButtonLink>
      </Box>
    </Box>
  );
}
