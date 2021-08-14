import {
  Avatar,
  Box,
  Chip,
  createStyles,
  SvgIconTypeMap,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

import LoadingCircle from "../../components/LoadingCircle";
import useLocationData from "../../hooks/useLocationData";
import { Location } from "../../redux/locations";
import CharacterContentCard from "../CharacterContentCard";

const useStyles = makeStyles((theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0.5),
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

interface DetailChipProps {
  value?: string;
  initial: string;
}

function DetailChip({ value, initial }: DetailChipProps) {
  const classes = useStyles();

  if (!value) return null;

  return (
    <Chip
      className={classes.chip}
      size={"small"}
      label={value}
      avatar={<Avatar>{initial}</Avatar>}
    />
  );
}

function LocationContent({
  isFetching,
  isNotFound,
  dimension,
  type,
}: Location) {
  if (isFetching) return <LoadingCircle />;
  if (isNotFound) return <Typography>Not Found</Typography>;

  return (
    <Box display="flex" justifyContent="flex-end" flexWrap="wrap">
      <DetailChip value={dimension} initial="D" />
      <DetailChip value={type} initial="T" />
    </Box>
  );
}

interface LocationCardProps {
  id: number;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export default function LocationCard({ id, title, icon }: LocationCardProps) {
  const location = useLocationData({ id });

  return (
    <CharacterContentCard title={title} subheader={location.name} icon={icon}>
      <LocationContent {...location} />
    </CharacterContentCard>
  );
}
