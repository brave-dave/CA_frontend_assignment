import { Button, ButtonProps } from "@material-ui/core";
import AnchorLink from "../AnchorLink";

interface ButtonLinkProps extends ButtonProps {
  to: string;
}

export default function ButtonLink({ to, ...buttonProps }: ButtonLinkProps) {
  return (
    <AnchorLink to={to}>
      <Button {...buttonProps} />
    </AnchorLink>
  );
}
