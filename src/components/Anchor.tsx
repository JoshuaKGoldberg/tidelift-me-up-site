/* eslint-disable eslint-comments/disable-enable-pair, no-undef, no-redeclare -- TODO: fix JSX/React shenanigans */

import clsx from "clsx";

import styles from "./Anchor.module.css";

export function Anchor({
	className,
	...rest
}: React.HTMLProps<HTMLAnchorElement>) {
	return <a {...rest} className={clsx(styles.anchor, className)} />;
}
