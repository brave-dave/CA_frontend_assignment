import {
  Button,
  IconButton,
  IconButtonProps,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import AnchorLink from "../AnchorLink";

type LinkWrapperProps = React.PropsWithChildren<{
  path?: string;
}>;

function LinkWrapper({ children, path }: LinkWrapperProps) {
  return path ? <AnchorLink to={path}>{children}</AnchorLink> : <>{children}</>;
}

type ActiveWrapperProps = React.PropsWithChildren<
  {
    active?: boolean;
  } & Pick<IconButtonProps, "className" | "size" | "disabled">
>;

function ActiveWrapper({ active, ...props }: ActiveWrapperProps) {
  return active ? (
    <Button {...props} variant="contained" color="primary" />
  ) : (
    <IconButton {...props} />
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: `0 ${theme.spacing(0.5)}px`,
    fontSize: 18,
    height: 30,
  },
}));

interface PaginationButtonProps extends LinkWrapperProps {
  active?: boolean;
}

export default function PaginationButton({
  children,
  path,
  active,
}: PaginationButtonProps) {
  const classes = useStyles();
  const commonProps = React.useMemo<
    Pick<IconButtonProps, "className" | "size" | "disabled">
  >(
    () => ({
      className: classes.button,
      size: "small",
      disabled: !path,
    }),
    [classes, path]
  );

  return (
    <LinkWrapper path={path}>
      <ActiveWrapper {...commonProps} active={active}>
        {children}
      </ActiveWrapper>
    </LinkWrapper>
  );
}
