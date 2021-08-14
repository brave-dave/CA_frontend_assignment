import {
  Card,
  CardContent,
  CardMedia,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Character } from "../../redux/characters";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      display: "flex",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    image: {
      width: 200,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    list: {
      display: "grid",
      padding: 0,
      gridTemplateColumns: "1fr 1fr 1fr",
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr 1fr",
      },
    },
  })
);

export default function CharacterCard({
  name,
  image,
  species,
  status,
  gender,
}: Character) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia component="img" className={classes.image} image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name} / {species} / {status} / {gender}
        </Typography>
      </CardContent>
    </Card>
  );
}
