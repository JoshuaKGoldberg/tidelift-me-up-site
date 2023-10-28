import clsx from "clsx";

import styles from "./TableHead.module.css";

type TableOrder = "ascending" | "descending" | undefined;

type TableSort = "estimate" | "lifted" | "name" | undefined;

export interface CaretProps {
	order: TableOrder;
	sort: TableSort;
}
export function Caret({ order, sort }: CaretProps) {
	return (
		<span
			className={clsx(
				styles.caret,
				order === "descending" && sort === sort && styles.isDescending,
			)}
		>
			▾
		</span>
	);
}
