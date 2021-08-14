import PaginationButton from "./PaginationButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

interface PaginationArrowProps {
  direction: "back" | "forward";
  path?: string;
}

export default function PaginationArrow({
  direction,
  path,
}: PaginationArrowProps) {
  return (
    <PaginationButton path={path}>
      {direction === "back" ? <ArrowBackIcon /> : <ArrowForwardIcon />}
    </PaginationButton>
  );
}
