import clsx from "clsx";

import styles from "./TableHead.module.css";
import { Widget } from "./Widget";

type TableOrder = "ascending" | "descending" | undefined;

type TableSort = "estimate" | "lifted" | "name" | undefined;

export interface TableHeadProps {
	order: TableOrder;
	setSortAndOrder: (received: TableSort) => void;
	sort: TableSort;
}

export function TableHead({ order, setSortAndOrder, sort }: TableHeadProps) {
	return (
		<thead>
			<tr>
				<th className={styles.th}>
					<button
						className={clsx(
							styles.buttonContainer,
							sort === "name" && styles.isActive,
						)}
						onClick={() => setSortAndOrder("name")}
					>
						Package Name
						<Widget order={order} sort={sort} />
					</button>
				</th>
				<th className={styles.th}>
					Estimate
					<button
						className={clsx(
							styles.sortWidget,
							sort === "estimate" && styles.isActive,
							order === "descending" &&
								sort === "estimate" &&
								styles.isDescending,
						)}
						onClick={() => setSortAndOrder("estimate")}
					>
						▾
					</button>
				</th>
				<th className={styles.th}>
					Status
					<button
						className={clsx(
							styles.sortWidget,
							sort === "lifted" && styles.isActive,
							order === "descending" &&
								sort === "lifted" &&
								styles.isDescending,
						)}
						onClick={() => setSortAndOrder("lifted")}
					>
						▾
					</button>
				</th>
			</tr>
		</thead>
	);
}
