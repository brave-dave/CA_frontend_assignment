import { SvgIconTypeMap } from "@material-ui/core";
import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import classNames from "classnames";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      display: "flex",
    },
    cardHeader: {
      flex: "1 1 0",
    },
  })
);

type CharacterContentCardProps = React.PropsWithChildren<{
  className?: string;
  title: string;
  subheader?: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}>;

export default function CharacterContentCard({
  className,
  title,
  subheader,
  icon: Icon,
  children,
}: CharacterContentCardProps) {
  const classes = useStyles();

  return (
    <Card className={classNames(className, classes.card)}>
      <CardHeader
        avatar={<Icon />}
        className={classes.cardHeader}
        title={title}
        subheader={subheader}
        titleTypographyProps={{
          variant: "h6",
        }}
        subheaderTypographyProps={{
          noWrap: true,
        }}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
}
