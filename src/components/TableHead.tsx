import clsx from "clsx";

import styles from "./TableHead.module.css";

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
							styles.sortWidget,
							sort === "name" && styles.isActive,
						)}
						onClick={() => setSortAndOrder("name")}
					>
						Package Name
						<span
							className={clsx(
								styles.caret,
								order === "descending" &&
									sort === "name" &&
									styles.isDescending,
							)}
						>
							▾
						</span>
					</button>
				</th>
				<th className={styles.th}>
					<div className={styles.buttonContainer}>
						<button
							className={clsx(
								styles.sortWidget,
								sort === "estimate" && styles.isActive,
							)}
							onClick={() => setSortAndOrder("estimate")}
						>
							Estimate
							<span
								className={clsx(
									styles.caret,
									order === "descending" &&
										sort === "estimate" &&
										styles.isDescending,
								)}
							>
								▾
							</span>
						</button>
					</div>
				</th>

				<th className={styles.th}>
					<div className={styles.buttonContainer}>
						<button
							className={clsx(
								styles.sortWidget,
								sort === "lifted" && styles.isActive,
							)}
							onClick={() => setSortAndOrder("lifted")}
						>
							Status
							<span
								className={clsx(
									styles.caret,
									order === "descending" &&
										sort === "lifted" &&
										styles.isDescending,
								)}
							>
								▾
							</span>
						</button>
					</div>
				</th>
			</tr>
		</thead>
	);
}
