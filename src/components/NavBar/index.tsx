import AnchorLink from "../AnchorLink";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";

import { ReactComponent as RickAndMortyLogo } from "./rickAndMorty.svg";

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      backgroundColor: theme.palette.background.default,
      position: "sticky",
    },
    toolbar: {
      margin: "auto",
    },
  })
);

export default function NavBar() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <AnchorLink to={"/"}>
          <RickAndMortyLogo fill={theme.palette.text.primary} />
        </AnchorLink>
      </Toolbar>
    </AppBar>
  );
}
