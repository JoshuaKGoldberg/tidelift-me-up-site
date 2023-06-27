/* eslint-disable eslint-comments/disable-enable-pair, no-undef, no-redeclare -- TODO: fix JSX/React shenanigans */

import clsx from "clsx";

import styles from "./MainArea.module.css";

export type MainAreaProps<As extends keyof JSX.IntrinsicElements> = Partial<
	React.HTMLAttributes<As>
> & {
	as: As;
};

export function MainArea<As extends keyof JSX.IntrinsicElements>({
	as: As,
	className,
	...rest
}: MainAreaProps<As>) {
	// @ts-expect-error -- TODO: get this right..
	return <As {...rest} className={clsx(styles.mainArea, className)} />;
}
