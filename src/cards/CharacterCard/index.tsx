import {
  Box,
  Card,
  CardContent,
  CardMedia,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import CharacterTitle from "../../components/CharacterTitle";
import { Character } from "../../redux/characters";
import LocationCard from "../LocationCard";
import HomeIcon from "@material-ui/icons/Home";
import PlaceIcon from "@material-ui/icons/Place";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      display: "grid",
      gridTemplateColumns: "300px 1fr",
      height: 300,
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "200px 1fr",
      },
    },
    grid: {
      display: "grid",
      gridTemplateRows: "1fr 1fr",
      gridTemplateColumns: "1fr auto",
      gridGap: 3,
    },
    gridItem: {
      height: "50%",
      // marginRight: theme.spacing(2),
      // flex: "1 1 0px",
      // width: 0,
    },
    spannedGridItem: {
      gridRow: "1 / 3",
      gridColumn: "2 / 3",
      backgroundColor: "green",
    },
  })
);

export default function CharacterCard({
  image,
  origin,
  location,
  ...restOfProps
}: Character) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia component="img" image={image} />
      <CardContent>
        <CharacterTitle {...restOfProps} />
        <Box className={classes.grid}>
          <Box className={classes.gridItem}>
            <LocationCard id={origin} title="Origin" icon={HomeIcon} />
          </Box>
          <Box className={classes.gridItem}>
            <LocationCard id={location} title="Location" icon={PlaceIcon} />
          </Box>
          <Box className={classes.spannedGridItem}>spanned</Box>
        </Box>
      </CardContent>
    </Card>
  );
}
