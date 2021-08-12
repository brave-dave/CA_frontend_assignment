import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";
import NavBar from "../NavBar";

interface AppLayoutProps {
  children: NonNullable<React.ReactChild>;
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    overflow: "hidden",
  },
}));

export default function AppLayout({ children }: AppLayoutProps) {
  const classes = useStyles();

  return (
    <React.StrictMode>
      <CssBaseline />
      <NavBar />
      <Container className={classes.container} maxWidth="md">
        {children}
      </Container>
    </React.StrictMode>
  );
}
