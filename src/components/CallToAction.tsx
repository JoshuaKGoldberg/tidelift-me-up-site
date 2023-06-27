import clsx from "clsx";

import styles from "./CallToAction.module.css";

export type CallToActionProps<As extends keyof JSX.IntrinsicElements> =
	React.HTMLProps<As> & {
		as: As;
	};

export function CallToAction<As extends keyof JSX.IntrinsicElements>({
	as: As,
	className,
	...rest
}: CallToActionProps<As>) {
	// @ts-expect-error -- TODO: get this right..
	return <As {...rest} className={clsx(styles.callToAction, className)} />;
}
