import clsx from "clsx";

import styles from "./Anchor.module.css";

export function Anchor({
	children,
	className,
	...rest
}: React.HTMLProps<HTMLAnchorElement>) {
	return (
		<a {...rest} className={clsx(styles.anchor, className)}>
			{children}
		</a>
	);
}
