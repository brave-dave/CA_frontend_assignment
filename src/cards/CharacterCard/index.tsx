import {
  Card,
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
} from "@material-ui/core";
import CharacterTitle from "../../components/CharacterTitle";
import { Character } from "../../redux/characters";
import LocationCard from "../LocationCard";
import HomeIcon from "@material-ui/icons/Home";
import PlaceIcon from "@material-ui/icons/Place";
import EpisodesCard from "../EpisodesCard";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      display: "grid",
      gridTemplateColumns: "300px 1fr",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "100%",
      },
    },
  })
);

export default function CharacterCard({
  image,
  origin,
  location,
  episode,
  ...restOfProps
}: Character) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia component="img" image={image} />
      <CardContent>
        <CharacterTitle {...restOfProps} />
        <Grid container direction={"row"} spacing={2}>
          <Grid item xs={12}>
            <LocationCard id={origin} title="Origin" icon={HomeIcon} />
          </Grid>
          <Grid item xs={12}>
            <LocationCard id={location} title="Location" icon={PlaceIcon} />
          </Grid>
          <Grid item xs={12}>
            <EpisodesCard episodes={episode} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
