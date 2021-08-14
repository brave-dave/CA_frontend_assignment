import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

interface LinkProps extends Omit<ReactRouterLinkProps, "to"> {
  to: string;
}

const useStyles = makeStyles({
  link: {
    color: "inherit",
    textDecoration: "inherit",
  },
});

export default function AnchorLink(props: LinkProps) {
  const classes = useStyles();
  return <ReactRouterLink className={classes.link} {...props} />;
}
