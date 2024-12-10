import { Link, LinkProps } from "expo-router";
import { ForwardedButton, LabelProps } from "./LabeledButton";

export default function LinkButton({ href, replace, push, asChild, ...rest }: LabelProps & LinkProps<object | string>) {
  return (
    <Link href={href} push={push} asChild replace={replace}>
      <ForwardedButton {...rest}></ForwardedButton>
    </Link>
  );
}
