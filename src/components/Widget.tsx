import clsx from "clsx";

import styles from "./TableHead.module.css";

type TableOrder = "ascending" | "descending" | undefined;

type TableSort = "estimate" | "lifted" | "name" | undefined;

export interface WidgetProps {
	order: TableOrder;
	sort: TableSort;
}
export function Widget({ order, sort }: WidgetProps) {
	return (
		<span
			className={clsx(
				styles.sortWidget,
				order === "descending" && sort === sort && styles.isDescending,
			)}
		>
			▾
		</span>
	);
}
