import {
  Card,
  CardContent,
  CardMedia,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import CharacterTitle from "../../components/CharacterTitle";
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

export default function CharacterCard({ image, ...restOfProps }: Character) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia component="img" className={classes.image} image={image} />
      <CardContent>
        <CharacterTitle {...restOfProps} />
      </CardContent>
    </Card>
  );
}
